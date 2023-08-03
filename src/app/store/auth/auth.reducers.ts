import { LoginResponse } from 'src/app/models/loginresponse.model';
import { createReducer, on } from '@ngrx/store';
import { removeLoginData, setLoginData } from './auth.actions';

export const intialState: LoginResponse = {
  jwtToken: '',
  user: null,
  login: false,
};

export const authReducer = createReducer(
  intialState,
  on(setLoginData, (oldState, payload) => {
    // console.log('set login data action with reducer');
    // console.log(oldState);
    return { ...payload, login: true };
  }),
  on(removeLoginData, (state) => {
    return {
      jwtToken: '',
      user: null,
      login: false,
    };
  })
);
