export function format(value: number) {
   const currencyFormat = Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
   })

   return currencyFormat.format(value).replace("R$", "")
}