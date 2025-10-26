const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'reactjs',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const addNewMovieRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewMovie');
}
addNewMovieRef.operationName = 'AddNewMovie';
exports.addNewMovieRef = addNewMovieRef;

exports.addNewMovie = function addNewMovie(dc) {
  return executeMutation(addNewMovieRef(dc));
};

const listPublicMoviesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicMovies');
}
listPublicMoviesRef.operationName = 'ListPublicMovies';
exports.listPublicMoviesRef = listPublicMoviesRef;

exports.listPublicMovies = function listPublicMovies(dc) {
  return executeQuery(listPublicMoviesRef(dc));
};

const updateReviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateReview');
}
updateReviewRef.operationName = 'UpdateReview';
exports.updateReviewRef = updateReviewRef;

exports.updateReview = function updateReview(dc) {
  return executeMutation(updateReviewRef(dc));
};

const listUserListsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUserLists');
}
listUserListsRef.operationName = 'ListUserLists';
exports.listUserListsRef = listUserListsRef;

exports.listUserLists = function listUserLists(dc) {
  return executeQuery(listUserListsRef(dc));
};
