import {  useLocation, useNavigate } from "react-router"
import { useEffect } from "react";
import approved from "../assets/approved.svg"

export function Confirm(){
   const location = useLocation()
   const navigate = useNavigate()

   useEffect(() => {
      if (!location.state?.fromSubmit){
         navigate('/')
      } 
   }, []);

   return (
      <div className="bg-gray-500 w-full rounded-xl flex flex-col items-center p-10 gap-6 lg:min-w-[512px]">
         <h1 className="text-xl font-bold text-green-100">Solicitação enviada!</h1>

         <img src={approved} alt="Ícone de aprovado" className="w-60" />

         <p className="text-sm text-gray-200 mt-2 mb-4 text-center">Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.</p>

         <a className="w-full flex items-center justify-center bg-green-100 text-white rounded-md h-12 cursor-pointer hover:bg-green-900 transition ease-linear disabled:opacity-70 disabled:cursor-not-allowed" href="/">Nova solicitação</a> 
      </div>
   )
}