import React from 'react';
import UIStore from './UIStore';
import AuthStore from './AuthStore';

export default React.createContext({
  authStore: new AuthStore(),
  uiStore: new UIStore(),
});
