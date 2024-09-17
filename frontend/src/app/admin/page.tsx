
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData, selectIsAdmin } from '@/lib/redux/features/user/userSlice';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const AdminCoursePage = () => {
    // const dispatch = useAppDispatch();
    // const isAdmin = useSelector(selectIsAdmin); // Lấy thông tin từ Redux
    // console.log(isAdmin);
    
    // const router = useRouter();

    // useEffect(() => {
    //     // Dispatch action để fetch dữ liệu người dùng từ Redux
    //     dispatch(fetchUserData());
    // }, [dispatch]);

    // useEffect(() => {
    //     // Kiểm tra nếu người dùng không phải là admin
    //     if (!isAdmin) {
    //         router.push('/auth/login'); // Chuyển hướng nếu không phải admin
    //     }
    // }, [isAdmin, router]);

    // if (!isAdmin) {
    //     return <p>Loading or Unauthorized...</p>;
    // }

    return (
        <div>
            <h1>Admin Course Page</h1>
            <p>Welcome to the course management page!</p>
        </div>
    );
};

export default AdminCoursePage;
