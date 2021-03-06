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
