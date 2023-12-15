import { Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("JWT", "");

  return jwt ? children : <Navigate to="/" />;
};

export default PrivateRoute;
