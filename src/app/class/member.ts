export class Member {
  id: number;
  name: string;
  selected: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.selected = false;
  }

  toString(): string {
    let propertyList: string[] = [];
    propertyList.push('id[' + this.id + ']');
    propertyList.push('name[' + this.name + ']');
    propertyList.push('selected[' + this.selected + ']');
    return propertyList.join(',');
  }
}
