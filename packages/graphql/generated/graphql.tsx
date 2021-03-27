import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};





export type Album = {
  __typename?: 'Album';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type AlbumInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type AlbumsPaged = {
  __typename?: 'AlbumsPaged';
  rows?: Maybe<Array<Maybe<Album>>>;
  count?: Maybe<Scalars['Int']>;
};

export type AlbumWhere = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type File = {
  __typename?: 'File';
  id: Scalars['String'];
  path: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Filter = {
  __typename?: 'Filter';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  consitions?: Maybe<Scalars['String']>;
  model_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type FilterInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  consitions?: Maybe<Scalars['String']>;
  model_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type FilterWhere = {
  model_name?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum?: Maybe<Album>;
  upsertFilter?: Maybe<Filter>;
  deleteFilter?: Maybe<Scalars['Int']>;
  uploadFile: File;
  createRole?: Maybe<Role>;
  createUser?: Maybe<User>;
  upsertUser?: Maybe<User>;
};


export type MutationCreateAlbumArgs = {
  data?: Maybe<AlbumInput>;
};


export type MutationUpsertFilterArgs = {
  data?: Maybe<FilterInput>;
};


export type MutationDeleteFilterArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateRoleArgs = {
  data?: Maybe<RoleInput>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserInput>;
};


export type MutationUpsertUserArgs = {
  data?: Maybe<UserInput>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  total?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums?: Maybe<AlbumsPaged>;
  pagination?: Maybe<PaginationInfo>;
  filters?: Maybe<Array<Maybe<Filter>>>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  user?: Maybe<User>;
  users?: Maybe<UsersPaged>;
  loginUser?: Maybe<User>;
};


export type QueryAlbumArgs = {
  where?: Maybe<AlbumWhere>;
};


export type QueryAlbumsArgs = {
  where?: Maybe<AlbumWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryPaginationArgs = {
  where?: Maybe<AlbumWhere>;
};


export type QueryFiltersArgs = {
  where?: Maybe<FilterWhere>;
};


export type QueryRoleArgs = {
  where?: Maybe<RoleWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryRolesArgs = {
  where?: Maybe<RoleWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  where?: Maybe<UserWhere>;
};


export type QueryUsersArgs = {
  where?: Maybe<UserWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type RoleInput = {
  name?: Maybe<Scalars['String']>;
};

export type RoleWhere = {
  id?: Maybe<Scalars['Int']>;
};


export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Date']>;
  updated_at?: Maybe<Scalars['Date']>;
  email_verified?: Maybe<Scalars['Date']>;
  role_id?: Maybe<Scalars['Int']>;
  role?: Maybe<Role>;
};

export type UserInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Int']>;
};

export type UsersPaged = {
  __typename?: 'UsersPaged';
  rows?: Maybe<Array<Maybe<User>>>;
  count?: Maybe<Scalars['Int']>;
};

export type UserWhere = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
};
