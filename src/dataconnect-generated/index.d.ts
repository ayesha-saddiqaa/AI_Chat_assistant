import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewMovieData {
  movie_insert: Movie_Key;
}

export interface ListEntry_Key {
  listId: UUIDString;
  movieId: UUIDString;
  __typename?: 'ListEntry_Key';
}

export interface ListPublicMoviesData {
  movies: ({
    id: UUIDString;
    title: string;
    year: number;
    genres?: string[] | null;
  } & Movie_Key)[];
}

export interface ListUserListsData {
  lists: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic: boolean;
  } & List_Key)[];
}

export interface List_Key {
  id: UUIDString;
  __typename?: 'List_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface UpdateReviewData {
  review_update?: Review_Key | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Watch_Key {
  id: UUIDString;
  __typename?: 'Watch_Key';
}

interface AddNewMovieRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<AddNewMovieData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<AddNewMovieData, undefined>;
  operationName: string;
}
export const addNewMovieRef: AddNewMovieRef;

export function addNewMovie(): MutationPromise<AddNewMovieData, undefined>;
export function addNewMovie(dc: DataConnect): MutationPromise<AddNewMovieData, undefined>;

interface ListPublicMoviesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicMoviesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicMoviesData, undefined>;
  operationName: string;
}
export const listPublicMoviesRef: ListPublicMoviesRef;

export function listPublicMovies(): QueryPromise<ListPublicMoviesData, undefined>;
export function listPublicMovies(dc: DataConnect): QueryPromise<ListPublicMoviesData, undefined>;

interface UpdateReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<UpdateReviewData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<UpdateReviewData, undefined>;
  operationName: string;
}
export const updateReviewRef: UpdateReviewRef;

export function updateReview(): MutationPromise<UpdateReviewData, undefined>;
export function updateReview(dc: DataConnect): MutationPromise<UpdateReviewData, undefined>;

interface ListUserListsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserListsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserListsData, undefined>;
  operationName: string;
}
export const listUserListsRef: ListUserListsRef;

export function listUserLists(): QueryPromise<ListUserListsData, undefined>;
export function listUserLists(dc: DataConnect): QueryPromise<ListUserListsData, undefined>;

