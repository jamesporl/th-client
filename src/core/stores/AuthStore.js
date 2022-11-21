import Cookies from 'js-cookie';
import { observable, action, makeObservable } from 'mobx';
import { AUTH_TOKEN_KEY, VERIFICATION_TOKEN_KEY } from '../utils/storageKeys';

export default class AuthStore {
  constructor() {
    makeObservable(this);
  }

  @observable authToken = '';

  @observable verificationToken = '';

  @observable myProfile = null;

  @action setVerificationToken = (token) => {
    this.verificationToken = token;
    localStorage.setItem(VERIFICATION_TOKEN_KEY, token);
  };

  @action setMyProfile = (profile) => {
    this.myProfile = profile;
  };

  @action removeVerificationToken = () => {
    this.verificationToken = '';
    localStorage.removeItem(VERIFICATION_TOKEN_KEY);
  };

  @action login = (authToken) => {
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    Cookies.set(AUTH_TOKEN_KEY, authToken);
    this.authToken = authToken;
  };

  @action logout = () => {
    Cookies.remove(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.authToken = '';
  };
}
