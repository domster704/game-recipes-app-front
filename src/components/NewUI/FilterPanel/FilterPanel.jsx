import React from 'react';
import s from './FilterPanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setCategoryFilter} from "../../../store/filterSlice";

const FilterPanel = () => {
    const dispatch = useDispatch();
    const recipesStore = useSelector(state => state.recipes);
    const [allCategories, setAllCategories] = React.useState([]);

    const getAllCategories = () => {
        let allCategoriesLocal = [];
        for (let key in recipesStore.recipes) {
            allCategoriesLocal.push(recipesStore.recipes[key].category);
        }
        return Array.from(new Set(allCategoriesLocal));
    };

    React.useEffect(() => {
        setAllCategories(getAllCategories());
    }, [recipesStore.recipes]);


    return (
        <div className={s.panel}>
            <h2 onClick={() => {
                dispatch(setCategoryFilter(null));
            }}>Все</h2>
            <div className={s.sub_categories}>
                {
                    allCategories.map((category, index) => {
                        return <p key={index}
                                  onClick={() => {
                                      dispatch(setCategoryFilter(category));
                                  }}>{category}</p>
                    })
                }
            </div>
        </div>
    );
};

export default FilterPanel;