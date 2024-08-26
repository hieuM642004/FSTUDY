import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
