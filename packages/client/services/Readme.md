# Structures

Load definition from 'definitions/'
Inherit create, upsert, update, delete, get, getAll from baseService
Define name and plural

```ts
import { gql } from '@apollo/client';
import baseService from './baseService';
import { query } from 'definitions/user-definitions';

const definitions = {
  method: () => {
    return withMutation(queries.ACTION);
  },
};

const userService = baseService({
  name: 'User',
  plural: 'Users',
  definitions,
});
export default userService;
```

# Authorized

## Page authorized

Define in menu.ts. As example allow for use have

- Role is `admin`
- Permission in `User` page is Read(1) . This is bitfield authorized

```ts
{
  title: key,
  roles: [RoleType.SysAdmin],
  permission: { featureName: 'User', code: PermissionActions.Read },
}
```

## Element authorized
