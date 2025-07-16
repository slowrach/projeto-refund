type Props = React.ComponentProps<"select"> & {
   legend?: string
}

export function Select({ legend, children, ...rest }: Props){
   return (
      <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-green-100">
         {legend && <legend className="uppercase mb-2 text-sm text-inherit">{ legend }</legend>}

         <select {...rest}className="w-full border border-gray-300 rounded-md h-12 px-4 text-gray-100 text-sm outline-none focus:border-green-200">
            <option value="" disabled hidden >Selecione</option>

            {children}
         </select>
      </fieldset>
   )
}