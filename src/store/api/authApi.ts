import { rtiApi } from './';
import { getHeaders } from '../../utils';
import { ApiResponseInterface, UserApiResponseInterface, } from '../../interfaces';
import Cookies from 'js-cookie';

export interface LoginBody {
    IpAddress?: string;
    UserNameOrEmail: string;
    Password: string;
}

export interface RequestResetPasswordBody {
    IpAddress?: string;
    UserNameOrEmail: string;
}

interface ConfirmResetPasswordBody {
    IpAddress?: string;
    UrlValidation: string;
    Password: string;
    ConfirmPassword: string;
}


export const authApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<UserApiResponseInterface, LoginBody>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response: UserApiResponseInterface) => {
                if (response.data?.token) {
                    const newToken: string = response.data?.token;
                    Cookies.set('token', newToken, { expires: 6 });
                }

                return response;
            },
            invalidatesTags: ['users'],
        }),

        logout: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                headers: getHeaders(),
            }),
            invalidatesTags: ['users'],
        }),

        checkAuth: builder.query<UserApiResponseInterface, void>({
            query: () => ({
                url: '/auth/check_auth',
                headers: getHeaders(),
            }),
            providesTags: ['users'],
        }),

        requestResetPassword: builder.mutation<ApiResponseInterface, RequestResetPasswordBody>({
            query: (body) => ({
                url: '/auth/request_reset_password',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
        }),

        confirmResetPassword: builder.mutation<ApiResponseInterface, ConfirmResetPasswordBody>({
            query: (body) => ({
                url: '/auth/confirm_reset_password',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useCheckAuthQuery,
    useRequestResetPasswordMutation,
    useConfirmResetPasswordMutation,
} = authApi;
