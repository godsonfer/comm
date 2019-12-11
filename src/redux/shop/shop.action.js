import shopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionSnapshotToMap
} from "./../../firebase/firebase.utils";

export const fetchcollectionStart = collectionsMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
  payload: collectionsMap
});
export const fetchcollectionSuccess = collectionsMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

const fetchcollectionFails = errorMessage => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAIL,
  payload: errorMessage
});
export const fetchcollectionStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchcollectionStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot);
        dispatch(fetchcollectionSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchcollectionFails(error.message)));
  };
};
