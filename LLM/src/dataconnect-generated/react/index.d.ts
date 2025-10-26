import { AddNewMovieData, ListPublicMoviesData, UpdateReviewData, ListUserListsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewMovie(options?: useDataConnectMutationOptions<AddNewMovieData, FirebaseError, void>): UseDataConnectMutationResult<AddNewMovieData, undefined>;
export function useAddNewMovie(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewMovieData, FirebaseError, void>): UseDataConnectMutationResult<AddNewMovieData, undefined>;

export function useListPublicMovies(options?: useDataConnectQueryOptions<ListPublicMoviesData>): UseDataConnectQueryResult<ListPublicMoviesData, undefined>;
export function useListPublicMovies(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicMoviesData>): UseDataConnectQueryResult<ListPublicMoviesData, undefined>;

export function useUpdateReview(options?: useDataConnectMutationOptions<UpdateReviewData, FirebaseError, void>): UseDataConnectMutationResult<UpdateReviewData, undefined>;
export function useUpdateReview(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateReviewData, FirebaseError, void>): UseDataConnectMutationResult<UpdateReviewData, undefined>;

export function useListUserLists(options?: useDataConnectQueryOptions<ListUserListsData>): UseDataConnectQueryResult<ListUserListsData, undefined>;
export function useListUserLists(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserListsData>): UseDataConnectQueryResult<ListUserListsData, undefined>;
