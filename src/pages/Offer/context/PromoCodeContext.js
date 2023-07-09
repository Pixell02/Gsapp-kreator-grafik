import { useState } from "react";
import { createContext } from "react";
import {useAuthContext} from "../../../hooks/useAuthContext"
import { useCollection } from "../../../hooks/useCollection";
export const PromoCodeContext = createContext(null)

export const PromoCodeProvider = ({ children }) => {
  
  const { user } = useAuthContext();
  const [code, setCode] = useState(null);
  const [promoCode, setPromoCode] = useState(null);
  const {documents: promoDocs} = useCollection("promoCode", ["uid", "==", user.uid])

  console.log(user)

  return (
    <PromoCodeContext.Provider value={{}}>
      {children}
    </PromoCodeContext.Provider>
  )
}