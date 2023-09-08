import UserStore from './UserStore';

export class RootStore {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();

export const stores = {
  userStore: rootStore.userStore,
};
