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





export type Account = {
  __typename?: 'Account';
  id?: Maybe<Scalars['Int']>;
  compound_id?: Maybe<Scalars['String']>;
  provider_type?: Maybe<Scalars['String']>;
  provider_id?: Maybe<Scalars['String']>;
  provider_account_id?: Maybe<Scalars['String']>;
  refresh_token?: Maybe<Scalars['String']>;
  access_token?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Date']>;
  updated_at?: Maybe<Scalars['Date']>;
  user_id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type AccountsPaged = {
  __typename?: 'AccountsPaged';
  rows?: Maybe<Array<Maybe<Account>>>;
  count?: Maybe<Scalars['Int']>;
};

export type AccountWhere = {
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
  provide_account_id?: Maybe<Scalars['String']>;
  provide_id?: Maybe<Scalars['String']>;
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

export type BooleanResponse = {
  __typename?: 'BooleanResponse';
  result?: Maybe<Scalars['Boolean']>;
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
  conditions?: Maybe<Scalars['String']>;
  model_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
};

export type FilterInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  conditions?: Maybe<Scalars['String']>;
  model_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type FiltersPaged = {
  __typename?: 'FiltersPaged';
  rows?: Maybe<Array<Maybe<Filter>>>;
  count?: Maybe<Scalars['Int']>;
};

export type FilterWhere = {
  model_name?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type Job = {
  __typename?: 'Job';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  publishDate?: Maybe<Scalars['Date']>;
  user?: Maybe<User>;
  metadata?: Maybe<Array<Maybe<JobMeta>>>;
  jobTerms?: Maybe<Array<Maybe<JobTerm>>>;
  link?: Maybe<Scalars['String']>;
  employee_id?: Maybe<Scalars['String']>;
  leader_id?: Maybe<Scalars['String']>;
  job_priority?: Maybe<NameValue>;
  job_status?: Maybe<NameValue>;
};

export type JobInput = {
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  publishDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['Date']>;
  user_id?: Maybe<Scalars['Int']>;
};

export type JobMeta = {
  __typename?: 'JobMeta';
  id?: Maybe<Scalars['Int']>;
  job_id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  job?: Maybe<Job>;
};

export type JobMetaInput = {
  job_id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type JobsPaged = {
  __typename?: 'JobsPaged';
  rows?: Maybe<Array<Maybe<Job>>>;
  count?: Maybe<Scalars['Int']>;
};

export type JobTerm = {
  __typename?: 'JobTerm';
  term_taxonomy_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Job>;
  termTaxonomies?: Maybe<TermTaxonomy>;
};

export type JobWhere = {
  user_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum?: Maybe<Album>;
  upsertFilter?: Maybe<Filter>;
  deleteFilter?: Maybe<Scalars['Int']>;
  uploadFile: File;
  upsertJob?: Maybe<Job>;
  deleteJob?: Maybe<Scalars['Int']>;
  createRole?: Maybe<Role>;
  upsertTermTaxonomy?: Maybe<TermTaxonomy>;
  deleteTermTaxonomy?: Maybe<Scalars['Int']>;
  createUser?: Maybe<User>;
  upsertUser?: Maybe<User>;
  changePassword?: Maybe<BooleanResponse>;
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


export type MutationUpsertJobArgs = {
  data?: Maybe<JobInput>;
  metadata?: Maybe<Array<Maybe<JobMetaInput>>>;
  taxonomies?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type MutationDeleteJobArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateRoleArgs = {
  data?: Maybe<RoleInput>;
};


export type MutationUpsertTermTaxonomyArgs = {
  data?: Maybe<TermTaxonomyInput>;
};


export type MutationDeleteTermTaxonomyArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserInput>;
};


export type MutationUpsertUserArgs = {
  data?: Maybe<UserInput>;
  metadata?: Maybe<Array<Maybe<UserMetaInput>>>;
  taxonomies?: Maybe<Array<Maybe<Scalars['Int']>>>;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String'];
  password: Scalars['String'];
};

export type NameValue = {
  __typename?: 'NameValue';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  total?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts?: Maybe<AccountsPaged>;
  album?: Maybe<Album>;
  albums?: Maybe<AlbumsPaged>;
  pagination?: Maybe<PaginationInfo>;
  filters?: Maybe<FiltersPaged>;
  job?: Maybe<Job>;
  jobs?: Maybe<JobsPaged>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  termTaxonomy?: Maybe<TermTaxonomy>;
  termTaxonomies?: Maybe<TermTaxonomiesPaged>;
  user?: Maybe<User>;
  users?: Maybe<UsersPaged>;
  loginUser?: Maybe<User>;
};


export type QueryAccountArgs = {
  where?: Maybe<AccountWhere>;
};


export type QueryAccountsArgs = {
  where?: Maybe<AccountWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryJobArgs = {
  where?: Maybe<JobWhere>;
};


export type QueryJobsArgs = {
  where?: Maybe<JobWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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


export type QueryTermTaxonomyArgs = {
  where?: Maybe<TermTaxonomyWhere>;
};


export type QueryTermTaxonomiesArgs = {
  where?: Maybe<TermTaxonomyWhere>;
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

export type Term = {
  __typename?: 'Term';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  term_group?: Maybe<Scalars['Int']>;
};

export type TermRelationship = {
  __typename?: 'TermRelationship';
  id?: Maybe<Scalars['Int']>;
  term_taxonomy_id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  ref_id?: Maybe<Scalars['Int']>;
};

export type TermTaxonomiesPaged = {
  __typename?: 'TermTaxonomiesPaged';
  rows?: Maybe<Array<Maybe<TermTaxonomy>>>;
  count?: Maybe<Scalars['Int']>;
};

export type TermTaxonomy = {
  __typename?: 'TermTaxonomy';
  id?: Maybe<Scalars['Int']>;
  taxonomy?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  termName?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  term?: Maybe<Term>;
};

export type TermTaxonomyInput = {
  id?: Maybe<Scalars['Int']>;
  taxonomy?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  parent?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
};

export type TermTaxonomyWhere = {
  id?: Maybe<Scalars['Int']>;
  taxonomy?: Maybe<Scalars['String']>;
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
  status?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
  havePassword?: Maybe<Scalars['Boolean']>;
  userMeta?: Maybe<Array<Maybe<UserMeta>>>;
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  customerType?: Maybe<Scalars['String']>;
  facebookUrl?: Maybe<Scalars['String']>;
};

export type UserInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Int']>;
};

export type UserMeta = {
  __typename?: 'UserMeta';
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserMetaInput = {
  user_id?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type UsersPaged = {
  __typename?: 'UsersPaged';
  rows?: Maybe<Array<Maybe<User>>>;
  count?: Maybe<Scalars['Int']>;
};

export type UserWhere = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};
