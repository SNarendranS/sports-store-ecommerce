import { useSelector, useDispatch } from 'react-redux';
import { setSearchText } from '../redux/searchSlice';
import { setCategoryValue } from '../redux/categorySlice';

export const useRedux = () => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);
  const categoryValue = useSelector((state) => state.category.value);

  const updateSearchText = (text) => {
    dispatch(setSearchText(text));
  };
  const updateCategoryValue = (text) => {
    dispatch(setCategoryValue(text));
  };
  return { searchText, updateSearchText, categoryValue, updateCategoryValue };
};