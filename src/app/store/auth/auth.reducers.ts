import { LoginResponse } from 'src/app/models/loginresponse.model';
import { createReducer, on } from '@ngrx/store';
import { setLoginData } from './auth.actions';

export const intialState: LoginResponse  = {
  jwtToken:"",
  user:
};

export const authReducer = createReducer(
  intialState,
  on(setLoginData, (oldState, payload) => {
    console.log('set login data action with reducer');
    console.log(oldState);
    return payload;
  })
);
