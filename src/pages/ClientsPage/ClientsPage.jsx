
import Header from "../../components/Header/Header";
import ClientsContent from "./components/ClientsContent/ClientsContent";
import { ClientsContextProvider } from "./context/ClientsContext";

const ClientsPage = () => {



  return (
    <ClientsContextProvider>
      <Header/>
      <ClientsContent />
    </ClientsContextProvider>
  );
};

export default ClientsPage;
