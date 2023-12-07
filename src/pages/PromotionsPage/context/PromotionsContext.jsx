import { createContext, useReducer } from "react";
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PROMOTIONS":
      return payload;
  }
};

export const PromotionsContext = createContext();

const PromotionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, "");

  return (
    <PromotionsContext.Provider value={{ state, dispatch }}>
      {children}
    </PromotionsContext.Provider>
  );
};

export default PromotionsContextProvider;
