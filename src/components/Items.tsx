export type ItemProps = {
   id: string
   name: string
   category: string
   amount: string
   categoryImg: string
}

type Props = React.ComponentProps<"a"> & {
   data: ItemProps
}

export function Items({ data, ...rest }: Props){
   return (
      <a {...rest} className="flex items-center cursor-pointer hover:bg-green-100/20 p-2 rounded-lg">
         <img src={data.categoryImg} alt="Ícone da categoria" />

         <div className="flex flex-col flex-1 ml-3">
            <strong>{data.name}</strong>

            <small className="text-gray-200">{data.category}</small>
         </div>

         <span className="flex items-center">
            <small className="text-gray-200">R$</small>

            <strong>{data.amount}</strong>
         </span>
      </a>
   )
}