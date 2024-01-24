import { rtiApi } from './';
import { getHeaders } from '../../utils';
import { ApiResponseInterface, UserApiResponseInterface, } from '../../interfaces';
import Cookies from 'js-cookie';

export interface ValidateTFABody {
    IpAddress?: string;
    token: string;
    userId: string | undefined;
}


export const tfaApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({
        validateTFA: builder.mutation<UserApiResponseInterface, ValidateTFABody>({
            query: (body) => ({
                url: '/auth/validate_tfa',
                method: 'POST',
                body,
            }),
            transformResponse: (response: UserApiResponseInterface) => {
                if (response.data?.token) {
                    const newToken: string = response.data?.token;
                    Cookies.set('token', newToken, { expires: 6 });
                }

                return response;
            },
            invalidatesTags: ['logUser'],
        }),

        generateTFAKey: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/generate_tfa_key',
                method: 'POST',
                headers: getHeaders(),
            }),
        }),


        verifyTFAKey: builder.mutation<ApiResponseInterface, string>({
            query: (token) => ({
                url: '/auth/verify_tfa_key',
                method: 'POST',
                body: { token },
                headers: getHeaders(),
            }),
            invalidatesTags: ['logUser'],
        }),

        disableTFA: builder.mutation<ApiResponseInterface, void>({
            query: () => ({
                url: '/auth/disable_tfa',
                method: 'POST',
                headers: getHeaders(),
            }),
            invalidatesTags: ['logUser'],
        }),
    }),
})

export const {
    useValidateTFAMutation,
    useGenerateTFAKeyQuery,
    useVerifyTFAKeyMutation,
    useDisableTFAMutation,
} = tfaApi;
