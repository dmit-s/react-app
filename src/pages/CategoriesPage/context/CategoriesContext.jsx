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
        categoriesData: state.categoriesData.filter((c) => c.id !== payload),
      };
    case "REMOVE_SUBCATEGORY":
      return {
        ...state,
        categoriesData: [...state.categoriesData].map((c) => {
          if (c.id === payload.categoryId) {
            c.subcategories = c.subcategories.filter(
              (subc) => subc.id !== payload.subcategoryId
            );
          }
          return c;
        }),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categoriesData: [...state.categoriesData, payload],
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        categoriesData: state.categoriesData.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case "ADD_SUBCATEGORY":
      return {
        ...state,
        categoriesData: state.categoriesData.map((item) =>
          item.id === payload.categoryId
            ? { ...item, subcategories: [...item.subcategories, payload.item] }
            : item
        ),
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
