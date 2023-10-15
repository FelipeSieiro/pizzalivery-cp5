import { createContext, useContext, useState } from "react"

type PizzaSizeType = {
  id: string
  flavours: number
  size: number
  slices: number
  text: string
}

type PizzaFlavourType = {
  map(arg0: (flavour: any) => any): import("react").SetStateAction<never[]>
  length: number
  id: string
  image: string
  name: string
  description: string
  price: {
    "8": number
    "4": number
    "1": number
  }
}

type PizzaOrderType = {
  item: {
    name: string
    image: string
    size: string
    slices: number
    value: number
  }
  total: number
}
type OrderContextProps = {
  pizzaSize: PizzaSizeType
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType>>
  pizzaFlavour: PizzaFlavourType
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType>>
  pizzaOrder: PizzaOrderType
  setPizzaOrder: React.Dispatch<React.SetStateAction<PizzaOrderType>>
}


const OrderContext = createContext<OrderContextProps>({})


const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState(null); // Inicialize com null ou um valor padrão apropriado
  const [pizzaFlavour, setPizzaFlavour] = useState(null); // Inicialize com null ou um valor padrão apropriado
  const [pizzaOrder, setPizzaOrder] = useState([0]); // Inicialize com um array vazio

  const addPizzaToOrder = (pizza) => {
    setPizzaOrder((prevOrder) => [...prevOrder, pizza]);
  };

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaOrder,
        setPizzaOrder,
        addPizzaToOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}


export { OrderContextProvider }
export default OrderContext

export const useOrder = () => {
  return useContext(OrderContext);
};
