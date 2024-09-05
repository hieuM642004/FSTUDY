import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserId } from '@/lib/redux/features/user/userSelectors';

export const useAuth = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userId = useSelector(selectUserId);

    return { isLoggedIn, userId };
};