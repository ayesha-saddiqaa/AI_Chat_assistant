import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'reactjs',
  location: 'us-central1'
};

export const addNewMovieRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMovie');
}
addNewMovieRef.operationName = 'AddNewMovie';

export function addNewMovie(dc) {
  return executeMutation(addNewMovieRef(dc));
}

export const listPublicMoviesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicMovies');
}
listPublicMoviesRef.operationName = 'ListPublicMovies';

export function listPublicMovies(dc) {
  return executeQuery(listPublicMoviesRef(dc));
}

export const updateReviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateReview');
}
updateReviewRef.operationName = 'UpdateReview';

export function updateReview(dc) {
  return executeMutation(updateReviewRef(dc));
}

export const listUserListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserLists');
}
listUserListsRef.operationName = 'ListUserLists';

export function listUserLists(dc) {
  return executeQuery(listUserListsRef(dc));
}

