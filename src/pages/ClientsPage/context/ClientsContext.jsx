import { createContext, useReducer } from "react";

export const ClientsContext = createContext();

const initialState = {
  clientsData: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pagesCount: 1,
  showItems: 10,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PAGES_COUNT":
      return {
        ...state,
        pagesCount: payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: payload,
      };
    case "SET_SHOW_ITEMS":
      return {
        ...state,
        showItems: payload,
      };
  }
};

export const ClientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ClientsContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientsContext.Provider>
  );
};
