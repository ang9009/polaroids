import { Album } from "./../../db-api/node_modules/.prisma/client/index.d";

export interface GetAlbumsResponse {
  albums: Album[];
}
