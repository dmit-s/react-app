import { useContext, useEffect, useState } from "react";
import ClientsTop from "../ClientsTop/ClientsTop";
import { ClientsContext } from "../../context/ClientsContext";
import Table from "../../../../components/Table/Table";
import UserService from "../../../../services/ClientsService";

const ClientsContent = () => {
  const {
    state: { clientsData, currentPage, showItems },
    dispatch,
  } = useContext(ClientsContext);

  const [filteredArr, setFilteredArr] = useState([]);
  const [searchValue, setSearchValue] = useState([]);

  useEffect(() => {
    UserService.getClients().then((data) =>
      dispatch({ type: "SET_CLIENTS", payload: data })
    );
  }, []);

  const handleChange = (value) => {
    setSearchValue(value);

    const filtered = clientsData.filter((item) => {
      const { name, email, tel } = item;
      const searchTern = value.trim().toLowerCase();
      for (let i of [name, email, tel]) {
        const str = i.toLowerCase();
        const strWords = str.split(" ");

        if (str.startsWith(searchTern)) {
          return true;
        } else if (strWords.some((word) => word.startsWith(searchTern))) {
          return true;
        } else if (
          str.replaceAll(/\W/gm, " ").startsWith(searchTern) ||
          str.replaceAll(/\W/gm, "").startsWith(searchTern) ||
          str
            .replaceAll(/\s/gm, "")
            .replaceAll(/\)|\(|-/gm, "")
            .startsWith(searchTern)
        ) {
          return true;
        }
      }
    });
    setFilteredArr(() => filtered);
  };

  return (
    <>
      <ClientsTop filteredArr={filteredArr} searchValue={searchValue} handleChange={handleChange} />
      <Table
        data={searchValue.length > 0 ? filteredArr : clientsData}
        showItems={showItems}
        currentPage={currentPage}
        headers={{
          name: "ФИ",
          email: "Почта",
          tel: "Телефон",
        }}
      />
    </>
  );
};

export default ClientsContent;
