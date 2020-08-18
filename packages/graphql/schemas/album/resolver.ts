import { Query } from "./album.query";
import { AlbumMap } from "./album.map";
import { Mutation } from "./album.mutation";

export const resolver = {
  Query: Query,
  Album: AlbumMap,
  Mutation: Mutation,
};
