import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/config.firebase";
import useAxiosPublic from "../Hook/useAxiosPublic";
// import axios from "axios";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const handleUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribes = onAuthStateChanged(auth, currUser => {
            // const userEmail = currUser?.email || users?.email;
            // const loggedUser = { email: userEmail };
            setUsers(currUser);
            setLoading(false);

            if(currUser)
                {
                    const userInfo = {email: currUser.email}
                    axiosPublic.post('/jwt', userInfo)
                    .then(res=>{
                        if(res.data.token)
                            {
                                localStorage.setItem('access-token',res.data.token);
                            }
                    })
                }
                else{
                    localStorage.removeItem('access-token');
                }
        })

        return () => {
            unSubscribes();
        }
    }, [])

    const authInfo = {
        users,
        createUser,
        signIn,
        handleUpdateProfile,
        logOut,
        googleLogin,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;