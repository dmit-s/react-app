import { createContext, useReducer } from "react";

const initialState = {
  promotionsData: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pagesCount: 1,
  showItems: 10,
  checkedCount: 0,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_PROMOTIONS":
      return {
        ...state,
        promotionsData: payload,
        status: "received",
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        status: "loading",
      };
    case "SET_ERROR":
      return {
        ...state,
        status: "error",
        error: payload,
      };
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
    case "UPDATE_CHECKED_COUNT":
      return {
        ...state,
        checkedCount: state.promotionsData.reduce((acc, x) => {
          if (x.checked) acc++;
          return acc;
        }, 0),
      };
    case "SET_CHECKED":
      return {
        ...state,
        promotionsData: state.promotionsData.map((item) => {
          if (item.id === payload.id) {
            item.checked = payload.value;
          }
          return item;
        }),
      };
    case "SET_ALL_CHECKED":
      const { ids, checked } = payload;

      ids.forEach((id) => {
        const find = state.promotionsData.find((item) => item.id === id);
        if (find) {
          find.checked = checked;
        }
      });

      return {
        ...state,
      };
    case "UPDATE_PROMOTION":
      return {
        ...state,
        promotionsData: state.promotionsData.map(item => item.id === payload.id ? payload : item)
      }
    case "ADD_PROMOTION":
      return {
        ...state,
        promotionsData: [payload, ...state.promotionsData]
      }
    case "REMOVE_PROMOTION":
      return {
        ...state,
        promotionsData: state.promotionsData.filter(item => item.id !== payload)
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
