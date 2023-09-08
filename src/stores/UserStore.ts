import { action, observable, computed } from 'mobx';

class UserStore {
  id: number = Math.random();

  @observable fullname = 'Sun Asterisk';

  @observable age = 9;

  @computed get info(): string {
    return `Name: ${this.fullname} and Age: ${this.age}`;
  }

  @action
  changeName(fullname: string): void {
    this.fullname = fullname;
  }
}

export default UserStore;
