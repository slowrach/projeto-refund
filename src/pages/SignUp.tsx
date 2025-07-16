import { useState } from "react";
import { z, ZodError } from "zod"
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const signUpSchema = z.object({
   name: z.string().trim().min(1, { message: "Informe seu nome" }),
   email: z.string().email({ message: "E-mail inválido" }),
   password: z.string().trim().min(1, { message: "Informe uma senha" }),
   confirmPassword: z.string({ message: "Confirme a senha" }),
}).refine((data) => data.password === data.confirmPassword, {
   message: "As senhas não são iguais",
   path: ["confirmPassword"]
})

export function SignUp(){
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   async function submit(e: React.FormEvent){
      e.preventDefault()

      try {
         setLoading(true)

         const data = signUpSchema.parse({
            name,
            email,
            password,
            confirmPassword,
         })

         await api.post("/users", data)

         if(confirm("Cadastrado com sucesso!")){
            navigate("/")
         }
      } catch (error) {
         if (error instanceof ZodError){
            return alert(error.issues[0].message)
         }

         if (error instanceof AxiosError){
            return alert(error.response?.data.message)
         }

         alert("Não foi possível cadastrar sua conta")
      } finally {
         setLoading(false)
      }
   }

   return (
      <form onSubmit={submit} className="w-full flex flex-col gap-4">
         <Input required legend="nome" onChange={(e) => setName(e.target.value)} />

         <Input required legend="e-mail" type="email" onChange={(e) => setEmail(e.target.value)} />

         <Input required legend="senha" type="password" onChange={(e) => setPassword(e.target.value)} />

         <Input required legend="confirme a senha" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />

         <Button type="submit" loading={loading}>Cadastrar</Button>

         <a href="/" className="text-sm text-center text-gray-200 font-semibold mt-5 hover:text-green-100 transition ease-linear">Já tenho uma conta</a>
      </form>
   )
}