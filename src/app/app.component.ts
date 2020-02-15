import { Component, OnInit } from '@angular/core';

import { Member } from './class/member';
import { MemberService } from './service/member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  memberList: Member[];
  selectedMemberList: Member[];
  allMemberSelected: boolean;

  constructor(
    private memberService: MemberService
  ) {
    this.memberList = [];
    this.selectedMemberList = [];
    this.allMemberSelected = false;
  }

  ngOnInit() {
    this.memberList = this.memberService.getMemberList();
    this.selectedMemberList = [];
    this.allMemberSelected = false;
  }

  /**
   * 全選択のチェックボックス 変更。
   */
  onMemberListHeaderCheckboxChange() {
    console.log('onMemberListHeaderCheckboxChange()');
    console.log('allMemberSelected[' + this.allMemberSelected + ']');

    if (this.allMemberSelected) {
      let newSelectedMemberList: Member[] = [];
      this.memberList.forEach((item) => {
        item.selected = true;
        newSelectedMemberList.push(item);
      });
      this.selectedMemberList = newSelectedMemberList;
    }
    else {
      this.memberList.forEach((item) => item.selected = false);
      this.selectedMemberList = [];
    }
  }

  /**
   * 行選択のチェックボックスのクリックを<p-table>に伝搬させない。
   * 
   * @param event MouseEvent
   */
  onMemberListRowCheckboxClick(event: MouseEvent) {
    console.log('onMemberListRowCheckboxClick()');
    event.stopPropagation();
  }

  /**
   * event.originalEvent: Browser event
   * event.data: Selected data
   * event.type: Type of selection, valid values are "row", "radiobutton" and "checkbox"
   * event.index: Index of the row
   */
  onRowSelect(event: any) {
    console.log('onRowSelect()');
    console.log('event.originalEvent[' + event.originalEvent + ']');
    console.log('event.data[' + event.data + ']');
    console.log('event.type[' + event.type + ']');
    console.log('event.index[' + event.index + ']');

    //行選択のチェックボックスを更新する。
    let member: Member = event.data;
    member.selected = true;

    //全選択のチェックボックスを更新する。
    this.updateAllMemberSelected();
  }

  /**
   * event.originalEvent: Browser event
   * event.data: Unselected data
   * event.type: Type of unselection, valid values are "row" and "checkbox"
   */
  onRowUnselect(event: any) {
    console.log('onRowUnselect()');
    console.log('event.originalEvent[' + event.originalEvent + ']');
    console.log('event.data[' + event.data + ']');
    console.log('event.type[' + event.type + ']');

    //行選択のチェックボックスを更新する。
    let member: Member = event.data;
    member.selected = false;

    //全選択のチェックボックスを更新する。
    this.allMemberSelected = false;
  }

  /**
   * 行選択のチェックボックス 変更。
   * 
   * @param member 選択行のメンバー
   */
  onMemberListRowCheckboxChange(member: Member) {
    console.log('onMemberListRowCheckboxChange()');
    console.log('name[' + member.name + ']');
    console.log('selected[' + member.selected + ']');

    //<p-table>の行選択を更新する。
    if (member.selected) {
      let newSelectedMemberList: Member[] = this.selectedMemberList.filter((item) => {
        return (item.id !== member.id);
      });
      newSelectedMemberList.push(member);
      this.selectedMemberList = newSelectedMemberList;
    }
    else {
      let newSelectedMemberList: Member[] = this.selectedMemberList.filter((item) => {
        return (item.id !== member.id);
      });
      this.selectedMemberList = newSelectedMemberList;
    }

    //全選択のチェックボックスを更新する。
    this.updateAllMemberSelected();
  }

  /**
   * 全選択のチェックボックスを更新する。
   */
  updateAllMemberSelected() {
    let allSelected: boolean = true;
    this.memberList.forEach((item) => allSelected = allSelected && item.selected);
    this.allMemberSelected = allSelected;
  }

}
