import { initializeApp } from "firebase/app";
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
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
                ...additionalData
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

export const signOutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log("Error signing out user", error.message);
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        console.log("Email and password are required");
        return;
    }

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        return user;
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("Cannot create user, email already in use!");
        }
        console.log("Error creating user", error.message);
    }
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        console.log("Email and password are required");
        return;
    }

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        return user;
    } catch (error) {
        switch (error.code) {
            case "auth/invalid-credential":
                alert("incorrect password for email");
                break;
            case "auth/user-not-found":
                alert("no user associated with this email");
                break;
            default:
                console.log("Error signing in user", error.message);
        }
    }
}

export const getUserDocumentFromAuth = async (uid) => {
    if (!uid) {
        console.log("A user ID is required to get a user document");
        return null;
    }

    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
        return userSnapShot.data();
    } else {
        console.log("User document does not exist");
    }
}
