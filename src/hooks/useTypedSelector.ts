import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../core/store/rootReducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
