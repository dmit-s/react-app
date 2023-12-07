import { createContext, useReducer } from "react";

const initialState = {
  promotionsData: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pagesCount: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PROMOTIONS":
      return {
        ...state,
        promotionsData: payload,
        status: "received",
        error: null
      };
    case "SET_LOADING":
      return {
        ...state,
        status: 'loading',
      };
    case "SET_ERROR":
      return {
        ...state,
        status: 'error',
        error: payload,
      };
    case "SET_PAGES_COUNT":
      return {
        ...state,
        pagesCount: payload
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: payload
      }
    }
};

export const PromotionsContext = createContext();

const PromotionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PromotionsContext.Provider value={{ state, dispatch }}>
      {children}
    </PromotionsContext.Provider>
  );
};

export default PromotionsContextProvider;
