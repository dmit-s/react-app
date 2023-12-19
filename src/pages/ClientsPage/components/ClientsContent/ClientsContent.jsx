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
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    UserService.getClients().then((data) =>
      dispatch({ type: "SET_CLIENTS", payload: data })
    );
  }, []);

  useEffect(() => {
    setTableData(
      clientsData.map((item) => {
        const obj = {
          id: item.id,
          data: {},
        };

        for (let key in item) {
          if (key === "id") continue;

          obj.data[key] = {
            content: item[key],
          };
        }
        return obj;
      })
    );
  }, [clientsData]);

  const handleChange = (value) => {
    setSearchValue(value);

    const filtered = tableData.filter(({ data }) => {
      const { name, email, tel } = data;
      const searchTern = value.trim().toLowerCase();

      for (let i of [name.content, email.content, tel.content]) {
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
      <ClientsTop
        filteredArr={filteredArr}
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <Table
        data={searchValue.length > 0 ? filteredArr : tableData}
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
