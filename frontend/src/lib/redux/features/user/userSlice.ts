import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/services/auth/AuthService';
import { getCookie, deleteCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode';

interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
    role: string | null;
    slug: string | null;
    birthday?: Date | null;
    phone?: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    isLoading: boolean;
    error: string | null;
    isLoggedIn: boolean; 
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    avatar: null,
    role: null,
    birthday:  null,
    phone:  null,
    slug: null,
    createdAt: null,
    updatedAt: null,
    isLoading: false,
    error: null,
    isLoggedIn: false, 
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const token = getCookie('token');
            if (!token) {
                throw new Error('No token found');
            }

            const decoded: any = jwtDecode(token as string);
            const idUser: string = decoded.id;

            const response = await AuthService.getByIdUser(idUser);

            return response.data;
        } catch (error: any) {
            console.error('Error fetching user data:', error);
            return rejectWithValue(error.message || 'Failed to fetch user data');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<string>) {
            state.id = action.payload;
        },
        clearUser(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.avatar = null;
            state.role = null;
            state.slug = null;
            state.createdAt = null;
            state.updatedAt = null;
            state.isLoading = false;
            state.error = null;
            state.isLoggedIn = false; 

          
        },
        refreshUserData(state) {
            state.isLoading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.name = action.payload.fullname;
                state.email = action.payload.email;
                state.avatar = action.payload.avatar;
                state.role = action.payload.role;
                state.slug = action.payload.slug;
                state.birthday= action.payload.birthday || null;
                state.phone= action.payload.phone || null;
                state.createdAt = action.payload.createdAt;
                state.updatedAt = action.payload.updatedAt;
                state.isLoading = false;
                state.isLoggedIn = true; 
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.isLoggedIn = false; 
            });
    },
});

export const { setUserId, clearUser, refreshUserData } = userSlice.actions;

export default userSlice.reducer;
