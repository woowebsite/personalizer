import {
  IsAuthUserDirective,
  IsAuthDirective,
  isSysAdmin,
} from './auth.directive';

export const schemaDirectives = {
  isAuth: IsAuthDirective,
  isAuthUser: IsAuthUserDirective,
  isSysAdmin: isSysAdmin,
};
