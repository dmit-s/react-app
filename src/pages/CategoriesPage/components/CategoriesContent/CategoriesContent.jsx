import styles from "./CategoriesContent.module.scss";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import Table from "../../../../components/Table/Table";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import CategoriesService from "../../../../services/CategoriesService";

const CategoriesContent = () => {
    const {state: {categoriesData, subcategoriesData}, dispatch} = useContext(CategoriesContext);

    useEffect(() => {
        CategoriesService.getCategories().then(data => dispatch({type: "SET_CATEGORIES", payload: data}));
    }, [])

  return (
    <div className={styles.wrapper}>
      {/* <Table data={categoriesData}/>
      <SvgIcon iconName="two-chevron-right" />
      <Table data={subcategoriesData}/> */}
    </div>
  );
};

export default CategoriesContent;
