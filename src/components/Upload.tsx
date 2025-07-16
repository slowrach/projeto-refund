import upload from "../assets/upload.svg"

type Props = React.ComponentProps<"input"> & {
   filename?: string | null
}

export function Upload({ filename = null, ...rest }: Props){
   return (
      <div>
         <legend className="uppercase text-sm text-gray-200 mb-2">Comprovante</legend>

         <div className="w-full h-12 border border-gray-300 rounded-lg flex items-center text-gray-100 text-sm outline-none">
            <input type="file" id="upload" className="hidden" {...rest} />

            <span className="text-sm text-gray-100 flex-1 pl-4">{filename ?? "Selecione o arquivo"}</span>

            <label htmlFor="upload" className="flex items-center px-3 h-12 bg-green-100 rounded-br-lg rounded-tr-lg hover:bg-green-900 transition ease-linear cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
               <img src={upload} alt="Ícone de upload" className="w-6" />
            </label>
         </div>
      </div>
   )
}