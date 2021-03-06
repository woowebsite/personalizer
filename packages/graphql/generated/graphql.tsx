import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type Mutation = {
  __typename?: 'Mutation';
  createAlbum?: Maybe<Album>;
  uploadFile: File;
  createRole?: Maybe<Role>;
  createUser?: Maybe<User>;
  upsertUser?: Maybe<User>;
};


export type MutationCreateAlbumArgs = {
  data?: Maybe<AlbumInput>;
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
  getAlbums?: Maybe<Array<Maybe<Album>>>;
  getPagination?: Maybe<PaginationInfo>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Maybe<Role>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  loginUser?: Maybe<User>;
};


export type QueryAlbumArgs = {
  where?: Maybe<AlbumWhere>;
};


export type QueryGetAlbumsArgs = {
  where?: Maybe<AlbumWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetPaginationArgs = {
  where?: Maybe<AlbumWhere>;
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
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
};

export type UserWhere = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  roleId?: Maybe<Scalars['Int']>;
};

export type CreateAlbumMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
}>;


export type CreateAlbumMutation = (
  { __typename?: 'Mutation' }
  & { createAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'id'>
  )> }
);

export type GetAlbumsQueryVariables = Exact<{
  where?: Maybe<AlbumWhere>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetAlbumsQuery = (
  { __typename?: 'Query' }
  & { getAlbums?: Maybe<Array<Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name' | 'description' | 'image'>
  )>>>, getPagination?: Maybe<(
    { __typename?: 'PaginationInfo' }
    & Pick<PaginationInfo, 'total'>
  )> }
);


export const CreateAlbumDocument = gql`
    mutation CreateAlbum($name: String, $description: String, $image: String) {
  createAlbum(data: {name: $name, description: $description, image: $image}) {
    id
  }
}
    `;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: Apollo.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, baseOptions);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const GetAlbumsDocument = gql`
    query GetAlbums($where: AlbumWhere, $limit: Int, $offset: Int) {
  getAlbums(where: $where, limit: $limit, offset: $offset) {
    id
    name
    description
    image
  }
  getPagination(where: $where) {
    total
  }
}
    `;

/**
 * __useGetAlbumsQuery__
 *
 * To run a query within a React component, call `useGetAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
        return Apollo.useQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, baseOptions);
      }
export function useGetAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAlbumsQuery, GetAlbumsQueryVariables>) {
          return Apollo.useLazyQuery<GetAlbumsQuery, GetAlbumsQueryVariables>(GetAlbumsDocument, baseOptions);
        }
export type GetAlbumsQueryHookResult = ReturnType<typeof useGetAlbumsQuery>;
export type GetAlbumsLazyQueryHookResult = ReturnType<typeof useGetAlbumsLazyQuery>;
export type GetAlbumsQueryResult = Apollo.QueryResult<GetAlbumsQuery, GetAlbumsQueryVariables>;