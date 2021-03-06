# Naming conversions

query must be name of model

```ts
export const Query = {
  album: resolver(Album, {})
  albums: resolver(Album, {})
}
```

mutation begin an action

```ts
export const Mutation = {
  createAlbum: rs(Album, {})
  deleteAlbum: rs(Album, {})
}

```

# Pagingation

Put pagination object into after resolver. Note put `{list: true}` into option

```ts
export const Query = {
  //...
  albums: resolver(Album, {
    list: true,
    before: async (findOptions, { where, limit, offset }, context) => {
      // context.currentUser
      findOptions.where = where;
      findOptions.order = [['name', 'ASC']];
      return findOptions;
    },
    after: async (albums, args) => {
      const total = await Album.count(args.where);
      return { rows: albums, count: total };
    },
  }),
};
```

Define schema as below: 
```graphql
type AlbumsPaged {
  rows: [Album]
  count: Int
}
```

