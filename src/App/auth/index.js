import { typeIs, createReducer } from 'utils';


export const LOGIN = '@@auth/LOGIN';
export const LOGOUT = '@@auth/LOGOUT';


const initialState = {
  user: { authenticated: true },
};

export const authReducer = createReducer(initialState, [
  [typeIs(LOGIN), state => state],
]);
