export function NotFound(){
   return (
      <div className="w-screen h-screen grid place-content-center">
         <h1 className="text-green-100 font-bold text-3xl mb-5">Esta página não existe 🚧</h1>

         <a href="/" className="text-sm text-center text-gray-200 font-semibold mt-5 hover:text-green-100 transition ease-linear">Página Inicial</a>
      </div>
   )
}