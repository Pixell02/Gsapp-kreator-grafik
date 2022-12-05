import { createContext, useReducer, useEffect, useContext } from 'react'
import { auth } from '../firebase/config'
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return{...state, user: action.payload}
      case 'LOGOUT':
        return{...state, user: null}
      case 'AUTH_IS_READY':
        return{user: action.payload, authIsReady: true}
    default:
        return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    })

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
    
}


export const UserAuth = () => {
    return useContext(AuthContext)
}