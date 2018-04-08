import { T, isNil, compose, equals, prop, cond, ifElse, always, identity } from 'ramda';

export const isDev = () => process.env.NODE_ENV === 'development';
export const isProd = () => process.env.NODE_ENV === 'production';

export const typeIs = type => compose(equals(type), prop('type'));

export const createReducer = (initialState = {}, conditions = []) => cond([
  ...conditions,
  [T, ifElse(isNil, always(initialState), identity)],
]);
