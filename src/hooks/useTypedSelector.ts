import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../modules/redux/reducers/rootReducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
