import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD0nKL32nZmcvAv6S86E4n771_nBs5iilE",
    authDomain: "nimcurry-ecommerce.firebaseapp.com",
    projectId: "nimcurry-ecommerce",
    storageBucket: "nimcurry-ecommerce.appspot.com",
    messagingSenderId: "271322890548",
    appId: "1:271322890548:web:b96e052f0ff96a1c2ea561"
};

export const createUserProfileDocument = async (userAuth,additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    //console.log(firestore.doc('users/182fadu'))
    console.log(snapshot);

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;