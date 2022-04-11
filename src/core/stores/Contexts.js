import React from 'react';
import UIStore from './UIStore';
import AuthStore from './AuthStore';
import AdminUIStore from './AdminUIStore';

export default React.createContext({
  authStore: new AuthStore(),
  adminUIStore: new AdminUIStore(),
  uiStore: new UIStore(),
});
