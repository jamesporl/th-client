import { observable, action, makeObservable } from 'mobx';

export default class AdminUIStore {
  constructor() {
    makeObservable(this);
  }

  @observable searchDrawerStates = [];

  @observable searchCompKey = '';

  @observable isSearchDrawerOpen = false;

  @action openSearchDrawer = ({ searchCompKey }) => {
    this.isSearchDrawerOpen = true;
    this.searchCompKey = searchCompKey;
  };

  @action closeSearchDrawer = () => {
    this.isSearchDrawerOpen = false;
  };
}
