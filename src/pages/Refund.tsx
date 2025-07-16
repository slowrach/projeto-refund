import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../services/api";
import { format } from "../utils/format";
import { z, ZodError } from "zod";
import { AxiosError } from "axios";
import { CATEGORIES, KEYS } from "../utils/categories";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import fileSvg from "../assets/file.svg"
import { Info } from "../components/Info";

const refundSchema = z.object({
   name: z.string().min(1, { message: "Informe seu nome" }),
   category: z.string().min(1, { message: "Informe a categoria" }),
   amount: z.coerce.number({ message: "Informe um valor" }).positive({ message: "Informe um valor válido" })
})

export function Refund(){
   const [name, setName] = useState("")
   const [category, setCategory] = useState("")
   const [amount, setAmount] = useState("")
   const [loading, setLoading] = useState(false)
   const [file, setFile] = useState<File | null>(null)
   const [fileURL, setFileURL] = useState<string | null>(null)

   const navigate = useNavigate()
   const params = useParams<{id: string}>()
   
   async function info(){
      try {
         const { data } = await api.get<RefundAPIResponse>(`/refunds/${params.id}`)

         setName(data.name)
         setCategory(CATEGORIES[data.category].name)
         setAmount(format(data.amount))
         setFileURL(data.filename)
      } catch (error) {
         console.log(error)

         if(error instanceof AxiosError){
            return alert(error.response?.data.message)
         }

         alert("Não foi possível carregar")
      }
   }

   async function submit(e: React.FormEvent){
      e.preventDefault()

      if(params.id){
         return navigate(-1)
      }

      try {
         setLoading(true)

         if(!file){
            return alert("Selecione um arquivo de comprovante")
         }

         const uploadForm = new FormData()

         uploadForm.append("file", file)

         const response = await api.post("/uploads", uploadForm)

         const data = refundSchema.parse({
            name,
            category,
            amount: amount.replace(",", ".")
         })

         await api.post("/refunds", {...data, filename: response.data.filename})

         navigate("/confirm", { state: { fromSubmit: true } })
      } catch (error) {
       if(error instanceof ZodError){
         return alert(error.issues[0].message)
       }

       if(error instanceof AxiosError){
         return alert(error.response?.data.message)
       }
       
       alert("Não foi possível realizar a solicitação")
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      info()
   }, [])

   return (
      <form onSubmit={submit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
         <header>
            <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>

            <p className="text-sm text-gray-200 mt-2 mb-4">Dados para solicitação de reembolso</p>
         </header>

         {params.id && fileURL ? (
            <div>
               <Info title="Nome da Solicitação" info={name} />

               <Info title="Categoria" info={category} />

               <Info title="Valor" info={amount} />

               <a href={`http://localhost:3333/uploads/${fileURL}`} target="_blank" className="flex justify-center gap-2 text-sm font-semibold text-green-100 cursor-pointer hover:opacity-70 mt-7 mb-3">
                  <img src={fileSvg} alt="Ícone de comprovante" />
                  Abrir comprovante
               </a>
            </div>
         ) : (
            <div className="flex flex-col gap-4">
               <Input required legend="nome da solicitação" value={name} onChange={(e) => setName(e.target.value)} disabled={!!params.id} />

               <div className="flex gap-4">
                  <Select required legend="categoria" value={category} onChange={(e) => setCategory(e.target.value)} disabled={!!params.id}>
                  {KEYS.map((op) => (
                     <option key={op} value={op}>
                        {CATEGORIES[op].name}
                     </option>
                  ))}
                  </Select>

                  <Input required legend="valor" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={!!params.id} />
               </div>

               <Upload filename={file && file.name} onChange={(e) => e.target.files &&setFile(e.target.files[0])}/>
            </div>
         )}

         <Button type="submit" loading={loading}>
               { params.id ? "Voltar" : "Enviar" }
         </Button> 
      </form>
   )
}