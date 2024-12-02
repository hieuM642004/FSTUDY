import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
