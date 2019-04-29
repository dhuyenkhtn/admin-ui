import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { customers } from './customers.reducer';
import { alert } from './alert.reducer';
import { domains } from './domains.reducer';
import { tokens } from './tokens.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  domains,
  customers,
  tokens
});

export default rootReducer;
