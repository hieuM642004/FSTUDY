import { nestApiInstance } from '@/constant/api';
import withTokenRefresh from '@/decorator/withAuth';
import type { CreatedUSer, UpdateUser } from '@/types/user/User';

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
    @withTokenRefresh
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
    // role admin
    @withTokenRefresh
    static async getAllUser({page = 1 , limit = 0 } : string| any[] |any): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.get(
                `/users?page=${page}&limit=${limit}` );
            if(response.status === 200){                 
                return response.data.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }   
    @withTokenRefresh
    static async createUser(dataUser : CreatedUSer): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.post(
                `/users/create-user`, dataUser);
                
            if(response.status === 201){                 
                return response.data.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }
    @withTokenRefresh
    static async deleteUser(id : string | null): Promise<string | undefined> {
        try {
            const response = await nestApiInstance.delete(
                `/users/${id}`);
                
            if(response.status === 200){                 
                return response.data;
            }
        } catch (error) {
            console.error('Error fetching register:', error);
        }
    }
}

export default UserService;
