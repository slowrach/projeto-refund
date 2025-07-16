import { BrowserRouter } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Auth } from "./auth";
import { Employee } from "./employee";
import { Admin } from "./admin";

export function Routes(){
   const { session } = useAuth()

   function RouteUser(){
      switch (session?.user.role) {
         case "manager":
            return <Admin />
         case "employee":
            return <Employee />
         default:
            return <Auth />
      }
   }

   return (
      <BrowserRouter>
         <RouteUser />
      </BrowserRouter>
   )
}