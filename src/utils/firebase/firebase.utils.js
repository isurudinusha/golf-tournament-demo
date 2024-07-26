import { initializeApp } from "firebase/app";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBJ8AoayDWFfFYhFAIDt2vs65-09XARW8Q",
    authDomain: "golf-tournament-dashboard.firebaseapp.com",
    projectId: "golf-tournament-dashboard",
    storageBucket: "golf-tournament-dashboard.appspot.com",
    messagingSenderId: "1063638309674",
    appId: "1:1063638309674:web:53bcd0828a36fff99c1c53"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;

    const userRef = doc(db, "users", userAuth.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.error("Error creating user", error.message);
        }
    }

    return userRef;
}

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}