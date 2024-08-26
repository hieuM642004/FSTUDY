import { nestApiInstance } from '@/constant/api';
import { toast } from 'react-toastify';
import { UpdateUser } from '@/types/user/User';

class UserService {
    static async updateUser(
        dataUpdate: UpdateUser, id : string 
    ): Promise<UpdateUser | undefined> {
        try {
            const response = await nestApiInstance.put(
                `/users/update-user/${id}`,
                dataUpdate,
            );
            if(response.status === 200){                
                toast.success('CẬP NHẬT THÀNH CÔNG');
                return response.data.data;
            }
        } catch (error) {
            toast.error('CẬP NHẬT THẤT BẠI');
            console.error('Error fetching register:', error);
        }
    }
    static async changePassword(
        PasswordandFullname: object, id : string 
    ): Promise<UpdateUser | undefined> {
        try {
            const response = await nestApiInstance.put(
                `/users/update-user/${id}`,
                PasswordandFullname
            );
            if(response.status === 200){                
                toast.success('CẬP NHẬT THÀNH CÔNG');
                return response.data.data;
            }
        } catch (error) {
            toast.error('CẬP NHẬT THẤT BẠI');
            console.error('Error fetching register:', error);
        }
    }
    
}

export default UserService;
