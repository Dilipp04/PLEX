import React, { createContext, useContext, useState, useEffect } from 'react'

export const AuthContext = createContext();
export const AuthState = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState("")

    const settokenInLS = (token) => {
        setToken(token)
        localStorage.setItem("token", token)
    }

    let isLoggedIn = !!token

    const logoutUser = () => {
        setToken('')
        return localStorage.removeItem('token')
    }

    //JWT Authentication : Currently logged in user data
    const userAuthentication = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API}/api/auth/user`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json()
                setUser(data);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        userAuthentication()
    }, [])

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, logoutUser, settokenInLS, user, userAuthentication }}>
            {props.children}
        </AuthContext.Provider>
    )
}
//useAuth Hook
export const useAuth = () => {
    return useContext(AuthContext)
}

