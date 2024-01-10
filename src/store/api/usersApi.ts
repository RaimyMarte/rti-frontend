import { UploadData, excelHrApi } from './';
import { getHeaders, getHeadersWithoutContentType } from '../../helpers';
import { ApiResponseInterface, } from '../../interfaces';

export interface CreateUserBody {
    Authorized: boolean
    AutomaticPassword: boolean
    ChangePwdNextLogin: boolean
    ConfirmPassword: string
    Email: string
    FirstName: string
    LastName: string
    Password: string
    Phone: string
    UserRoleId: string
}

export interface UpdateUserBody {
    Authorized: boolean
    Email: string
    FirstName: string
    LastName: string
    NickName: string
    UserName: string
    Locked:boolean
    Gender: string
    Phone: string
    UserRoleId: string
    UserId: string
}

export interface ChangePasswordNextLoginBody {
    Password: string;
    ConfirmPassword: string;
}

export const usersApi = excelHrApi.injectEndpoints({
    endpoints: (builder) => ({

        getUsers: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/get_users',
                headers: getHeaders(),
            }),
            providesTags: ['users'],
        }),

        getUserById: builder.query<ApiResponseInterface, string>({
            query: (id: string) => ({
                url: `/get_user/${id}`,
            }),
            providesTags: ['users'],
        }),

        createUser: builder.mutation<ApiResponseInterface, CreateUserBody>({
            query: (body) => ({
                url: '/create_user',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['users'],
        }),

        updateUser: builder.mutation<ApiResponseInterface, UpdateUserBody>({
            query: (body) => ({
                url: '/update_user',
                method: 'PATCH',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['users'],
        }),

        deleteUser: builder.mutation<ApiResponseInterface, string>({
            query: (id) => ({
                url: `/delete_user/${id}`,
                method: 'DELETE',
                headers: getHeaders(),
            }),
            invalidatesTags: ['users'],
        }),

        changePasswordNextLogin: builder.mutation<ApiResponseInterface, ChangePasswordNextLoginBody>({
            query: (body) => ({
                url: '/change_password_next_login',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['logUser'],
        }),

        uploadUserPicture: builder.mutation<ApiResponseInterface, UploadData>({
            query: ({ formData, id }) => ({
                url: `/upload_user_picture/${id}`,
                method: "POST",
                body: formData,
                headers: getHeadersWithoutContentType(),
            }),
            invalidatesTags: ['logUser', 'users'],
        }),
    }),
});

export const {
    useGetUserByIdQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useChangePasswordNextLoginMutation,
    useUploadUserPictureMutation,
} = usersApi;
