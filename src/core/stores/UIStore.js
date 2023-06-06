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

  @observable apps = [];

  @action openGlobalModal = (componentKey, title, context = {}, props = {}) => {
    this.globalModalParams = { componentKey, title, context, props };
    this.isGlobalModalOpen = true;
  };

  @action closeGlobalModal = () => {
    this.isGlobalModalOpen = false;
    this.globalModalParams = { componentKey: '', context: {}, props: {} };
  };

  @action setScreenSize = (width, height) => {
    this.screenwidth = width;
    this.screenheight = height;
  };

  @action addApp = (app) => {
    const appExists = this.apps.find((a) => a._id === app._id);
    if (!appExists) {
      this.apps = [...this.apps, app];
    }
  };

  @action updateApp = (appId, isSupported, supportsCount) => {
    this.apps = this.apps.map((a) => {
      if (a._id === appId) {
        return { ...a, isSupported, supportsCount };
      }
      return a;
    });
  };
}
