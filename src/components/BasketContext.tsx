import { createContext, useContext, useState } from "react";
import type { Dairy } from "../types/Dairy";

type BasketItem = Dairy & {
  quantity: number;
};

type BasketContextType = {
   basket: BasketItem[];
  addToBasket: (item: Dairy) => void;
  removeFromBasket: (item: Dairy) => void;
};

 const BasketContext = createContext<BasketContextType | null>(null);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);
 
  function addToBasket(item: Dairy) {
    setBasket(prev =>
      prev.some(d => d.id === item.id)
        ? prev.map(d =>
            d.id === item.id
              ? { ...d, quantity: d.quantity + 1 }
              : d
          )
        : [...prev, { ...item, quantity: 1 }]
    );
  }

  function removeFromBasket(item: Dairy) {
    setBasket(prev =>
      prev
        .map(d =>
          d.id === item.id
            ? { ...d, quantity: d.quantity - 1 }
            : d
        )
        .filter(d => d.quantity > 0)
    );
  }
 

  return (
    <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() { //custom Hook
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used inside BasketProvider");
  return ctx;
}