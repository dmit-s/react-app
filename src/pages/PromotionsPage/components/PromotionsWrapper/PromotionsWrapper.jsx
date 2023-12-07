import { useContext, useEffect } from 'react';
import styles from './PromotionsWrapper.module.scss';
import PromotionsService from '../../../../services/PromotionsService';
import { PromotionsContext } from '../../context/PromotionsContext';


const PromotionsWrapper = ({children}) => {
    const {state, dispatch} = useContext(PromotionsContext);

    useEffect(() => {
        PromotionsService.getPromotions().then((data) => {
        dispatch({type: 'SET_PROMOTIONS', payload: data})
      });
    }, []);

    return ( 
        <div className={styles.wrapper}>
            {children}
        </div>
     );
}
 
export default PromotionsWrapper;