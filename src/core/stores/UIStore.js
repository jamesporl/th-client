import { observable, action, makeObservable } from 'mobx';

export default class UIStore {
  constructor() {
    makeObservable(this);
  }

  @observable globalModalParams = { context: {}, props: {} };

  @observable isGlobalModalOpen = false;

  // use lower case only because react is confused that it can be a div attribute
  @observable screenheight = 768;

  @observable screenwidth = 1200;

  @action openGlobalModal = (componentKey, title, context = {}, props = {}) => {
    this.globalModalParams = { componentKey, title, context, props };
    this.isGlobalModalOpen = true;
  };

  @action closeGlobalModal = () => {
    this.globalModalParams = { context: {}, props: {} };
    this.isGlobalModalOpen = false;
  };

  @action setScreenSize = (width, height) => {
    this.screenwidth = width;
    this.screenheight = height;
  };
}
