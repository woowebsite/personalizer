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
    return withMutation(queries.ACTION)
  },
};

const userService = baseService({
  name: 'User',
  plural: 'Users',
  definitions,
});
export default userService;
```
