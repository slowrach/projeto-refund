import { useState, useEffect } from "react";
import { api } from "../services/api";
import { createContext, type ReactNode } from "react";

type AuthContext = {
   session: null | UserAPIResponse
   save: (data: UserAPIResponse) => void
   exit: () => void
}

const LOCAL_STORAGE_KEY = "@refund"

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: {children: ReactNode}){
   const [session, setSession] = useState<null | UserAPIResponse>(null)

   function save(data: UserAPIResponse){
      localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
      localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

      setSession(data)
   }

   function exit(){
      setSession(null)

      localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

      window.location.assign("/")
   }

   function load(){
      const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
      const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

      if(token && user){
         api.defaults.headers.common["Authorization"] = `Bearer ${token}`

         setSession({
            token,
            user: JSON.parse(user)
         })
      }
   }

   useEffect(() => {
      load()
   }, [])

   return (
      <AuthContext.Provider value={{ session, save, exit }}>
         {children}
      </AuthContext.Provider>
   )
} 
