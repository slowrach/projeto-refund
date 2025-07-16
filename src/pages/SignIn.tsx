import { useActionState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const signInSchema = z.object({
   email: z.string().email({ message: "E-mail inválido" }),
   password: z.string().trim().min(1, { message: "Digite a senha" })
})

export function SignIn(){
   const [state, formAction, isLoading] = useActionState(submit, null)

   const auth = useAuth()

   async function submit(prevState: any, formData: FormData){
      try {
         const data = signInSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
         })
      
         const response = await api.post("/sessions", data)

         auth.save(response.data)
      } catch (error) {
         if(error instanceof ZodError){
            return { message: error.issues[0].message }
         }

         if(error instanceof AxiosError){
            return { message: error.response?.data.message }
         }

         return { message: "Não foi possível entrar" }
      }
   }

   return (
      <form action={formAction} className="w-full flex flex-col gap-4">
         <Input required name="email" legend="e-mail" type="email" />

         <Input required name="password" legend="senha" type="password" />

         <p className="text-sm text-red-600 text-center my-4">
            { state?.message }
         </p>

         <Button type="submit" loading={isLoading}>Entrar</Button>

         <a href="/signup" className="text-sm text-center text-gray-200 font-semibold mt-5 hover:text-green-100 transition ease-linear">Criar conta</a>
      </form>
   )
}