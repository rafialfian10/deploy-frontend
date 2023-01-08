import { createContext, useReducer } from "react";


//  userContext createContext berfungsi(menyimpan data sebagai global state) 
export const UserContext = createContext();

const initialState = { 
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      console.log(payload)
      localStorage.setItem("token", payload.token);
      localStorage.setItem("role", payload.role);
      localStorage.setItem("name", payload.name)
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name")
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

// function userContextProvider berfungsi akses state secara global
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

