import ClientsWrapper from "./components/ClientsWrapper/ClientsWrapper";
import { ClientsContextProvider } from "./context/ClientsContext";
const ClientsPage = () => {
  return (
    <ClientsContextProvider>
      <ClientsWrapper />
    </ClientsContextProvider>
  );
};

export default ClientsPage;
