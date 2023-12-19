import styles from "./ClientsTop.module.scss";
import { useContext, useState } from "react";
import Pagination from "../../../../components/Filters/Filters/components/Pagination/Pagination";
import ShowFilter from "../../../../components/Filters/Filters/components/ShowFilter/ShowFilter";
import Search from "../../../../components/Search/Search";
import { ClientsContext } from "../../context/ClientsContext";
import Filters from "../../../../components/Filters/Filters/Filters";

const ClientsTop = ({ handleChange, searchValue, filteredArr }) => {
  const {
    state: { clientsData, currentPage, pagesCount, showItems },
    dispatch,
  } = useContext(ClientsContext);

  return (
    <div className={styles.wrapper}>
      <Search
        className={styles.searchForm}
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <Filters>
        <ShowFilter
          data={searchValue.length ? filteredArr : clientsData}
          showItems={showItems}
          dispatch={dispatch}
        />
        <Pagination
          data={searchValue.length ? filteredArr : clientsData}
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
