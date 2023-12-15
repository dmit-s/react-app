import styles from "./ClientsTop.module.scss";
import { useContext } from "react";
import Pagination from "../../../../components/Filters/Filters/components/Pagination/Pagination";
import ShowFilter from "../../../../components/Filters/Filters/components/ShowFilter/ShowFilter";
import Search from "../../../../components/Search/Search";
import { ClientsContext } from "../../context/ClientsContext";
import Filters from "../../../../components/Filters/Filters/Filters";

const ClientsTop = () => {
  const {
    state: { clientsData, currentPage, pagesCount, showItems },
    dispatch,
  } = useContext(ClientsContext);

  return (
    <div className={styles.wrapper}>
        <Search />
        <Filters>
          <ShowFilter
            data={clientsData}
            showItems={showItems}
            dispatch={dispatch}
          />
          <Pagination
            data={clientsData}
            currentPage={currentPage}
            pagesCount={pagesCount}
            showItems={showItems}
            dispatch={dispatch}
          />
        </Filters>
    </div>
  );
};

export default ClientsTop;
