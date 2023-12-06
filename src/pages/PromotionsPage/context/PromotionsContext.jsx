import { createContext, useReducer } from "react";

const reducer = (state, action) => {
    
}

export const PromotionsContext = createContext();




const PromotionsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer);

    const value = {
        a: '123'
    }

    return ( 
        <PromotionsContext.Provider value={value}>
            {children}
        </PromotionsContext.Provider>
     );
}
 
export default PromotionsContextProvider;