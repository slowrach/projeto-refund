import { Outlet } from "react-router";
import logo from "../assets/logo.svg"

export function AuthLayout(){
   return (
      <div className="w-screen h-screen bg-gray-400 flex flex-col justify-center items-center text-gray-100">
         <main className="bg-gray-500 p-8 rounded-xl flex flex-col items-center md:min-w-[462px]">
            <img src={logo} alt="logo" className="my-3" />

            <Outlet />
         </main>
      </div>
   )
}