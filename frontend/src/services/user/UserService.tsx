import { nestApiInstance } from '@/constant/api';
import withTokenRefresh from '@/decorator/withAuth';
import { UpdateUser } from '@/types/user/User';

class UserService {
    @withTokenRefresh
    static async updateUser(
        dataUpdate: UpdateUser, id : string 
    ): Promise<UpdateUser | undefined> {
        try {
            const response = await nestApiInstance.put(
                `/users/update-user/${id}`,
                dataUpdate,
            );
            if(response.status === 200){                
                return response.data.data;
            }
        } catch (error) {
          
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
              
                return response.data.data;
            }
        } catch (error) {
          
            console.error('Error fetching register:', error);
        }
    }
    
}

export default UserService;
