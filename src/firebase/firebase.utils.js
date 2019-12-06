import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const App = {
  apiKey: "AIzaSyDxhTHB0xYsy8K15f5KQPohox2pG5TnfVE",
  authDomain: "crw-clothing-3314a.firebaseapp.com",
  databaseURL: "https://crw-clothing-3314a.firebaseio.com",
  projectId: "crw-clothing-3314a",
  storageBucket: "",
  messagingSenderId: "315293002253",
  appId: "1:315293002253:web:b9cbf070fae2d8d9080344",
  measurementId: "G-D16EZS1EYB"
};

export const createUserProfileDocument = async (userAuth, additionData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      });
    } catch (error) {
      console.log("error while creating user ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(App);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_accou"
});

// TODO: this is  for entering datas into our firestore database. We do not use it here for now

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = collections => {
  const transformCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;

    return accumulator;
  }, {});
};
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
