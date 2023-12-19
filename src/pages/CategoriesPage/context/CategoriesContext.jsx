import { createContext, useReducer } from "react";

export const CategoriesContext = createContext();

const initialState = {
  categoriesData: [],
  subcategoriesData: [],
  status: "idle",
  error: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CATEGORIES":
      return {
        ...state,
        categoriesData: payload,
      };
    case "SET_SUBCATEGORIES":
      return {
        ...state,
        subcategoriesData: payload,
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categoriesData: state.categoriesData.filter((c) => c !== payload),
      };
    case "REMOVE_SUBCATEGORY":
      return {
        ...state,
        categoriesData: state.subcategoriesData.filter((c) => c !== payload),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categoriesData: [...state.categoriesData, payload],
      };
    case "ADD_SUBCATEGORY":
      return {
        ...state,
        subcategoriesData: [...state.subcategoriesData, payload],
      };
  }
};

export const CategoriesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CategoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
};
