type Props = React.ComponentProps<"input"> & {
   legend?: string
}

export function Input({ legend, type = "text", ...rest }: Props){
   return (
      <fieldset className="flex flex-1 max-h-20 text-gray-200 focus-within:text-green-100">
         {legend && <legend className="uppercase mb-2 text-sm text-inherit">{ legend }</legend>}

         <input {...rest} type={type} className="w-full border border-gray-300 rounded-md h-12 px-4 text-gray-100 text-sm outline-none focus:border-green-200" />
      </fieldset>
   )
}