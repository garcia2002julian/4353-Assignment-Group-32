import {useState,createContext, useContext} from "react"

const AuthContext = createContext(null)

export const AuthProvider = ({children})=>{
    const [user, setUser]= useState(null)
    const [newuser, setnewUser]= useState(null)


    const login_=(user)=>{
        setUser(user)
    }
    const newUserLogin = (newuser) => {
        setnewUser(newuser)
      }
    const logout_ = () =>{
        setUser(null)
    }
    return <AuthContext.Provider value={{user,login_,logout_, newUserLogin,newuser}}>{children}</AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext)
}