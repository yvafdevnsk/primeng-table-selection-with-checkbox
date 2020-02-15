import { Injectable } from '@angular/core';

import { Member } from 'src/app/class/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private _id: number;

  constructor() {
    this._id = 1;
  }

  nextId(): number {
    return this._id++;
  }

  getMemberNameList(): string[] {
    let memberNameList: string[] = [];

    memberNameList.push('譜久村聖');
    memberNameList.push('生田衣梨奈');
    memberNameList.push('石田亜佑美');
    memberNameList.push('佐藤優樹');
    memberNameList.push('小田さくら');
    memberNameList.push('野中美希');
    memberNameList.push('牧野真莉愛');
    memberNameList.push('羽賀朱音');
    memberNameList.push('加賀楓');
    memberNameList.push('横山玲奈');
    memberNameList.push('森戸知沙希');
    memberNameList.push('北川莉央');
    memberNameList.push('岡村ほまれ');
    memberNameList.push('山﨑愛生');

    return memberNameList;
  }

  getMemberList(): Member[] {
    let list: Member[] = [];

    this.getMemberNameList().forEach((item) => {
      let member: Member = new Member();
      member.id = this.nextId();
      member.name = item;

      list.push(member);
    });

    return list;
  }
}
