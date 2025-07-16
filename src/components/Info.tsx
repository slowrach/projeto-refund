type Props = {
   title: string
   info: string
}

export function Info({ title, info }: Props){
   return (
      <div className="flex flex-col border-b border-b-gray-300 mb-3">
         <h1 className="font-bold">{title.toUpperCase()}</h1>
         <span className=" text-sm text-gray-200 mb-2">{info}</span>
      </div>
   )
}