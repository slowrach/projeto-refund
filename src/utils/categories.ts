import food from "../assets/food.svg"
import others from "../assets/others.svg"
import services from "../assets/services.svg"
import transport from "../assets/transport.svg"
import accommodation from "../assets/accommodation.svg"

export const CATEGORIES = {
   food: {
      name: "Alimentação",
      icon: food
   },
   others: {
      name: "Outros",
      icon: others
   },
   services: {
      name: "Serviços",
      icon: services
   },
   transport: {
      name: "Transporte",
      icon: transport
   },
   accommodation: {
      name: "Hospedagem",
      icon: accommodation
   },
}

export const KEYS = Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>