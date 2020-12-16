import { resolver } from "graphql-sequelize";
import { Album } from "../../models";

export const AlbumMap = {
  user: resolver(Album.associations.user),
};
