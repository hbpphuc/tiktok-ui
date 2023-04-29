import { createContext, useState } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const user = window.localStorage.getItem('USER_LOGIN')
    const [auth, setAuth] = useState(JSON.parse(user))

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
