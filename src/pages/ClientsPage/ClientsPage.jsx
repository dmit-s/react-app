import Header from "../../components/Header/Header";
import ClientsWrapper from "./components/ClientsContent/ClientsContent";
import { ClientsContextProvider } from "./context/ClientsContext";
const ClientsPage = () => {
  return (
    <ClientsContextProvider>
      <Header/>
      <ClientsWrapper />
    </ClientsContextProvider>
  );
};

export default ClientsPage;
