import { Button } from "./Button"
import left from "../assets/left.svg"
import right from "../assets/right.svg"

type Props = {
   current: number
   total: number
   onPrevious: () => void
   onNext: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props){

   console.log(current)
   return (
      <div className="flex flex-1 items-center gap-2 justify-center">
         <Button variant="icon" className="w-8 h-8" onClick={onPrevious} disabled={current === 1}>
            <img src={left} alt="Botão de página anterior" />
         </Button>

         <span className="text-gray-200">{current}/{total}</span>

         <Button variant="icon" className="w-8 h-8" onClick={onNext} disabled={current === total}>
            <img src={right} alt="Botão de próxima página" />
         </Button>
      </div>
   )
}