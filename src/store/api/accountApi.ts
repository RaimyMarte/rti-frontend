import { excelHrApi } from './';
import { getHeaders } from '../../helpers';
import { ApiResponseInterface, } from '../../interfaces';

export interface CreateAccountBody {
    AddressLine1: string
    AddressLine2: string
    CityId: string
    CountryId: string
    DOB?: Date | string
    FirstName: string
    LastName: string
    Name: string
    Phone: string
    SSN: string
    StateId: string
    TypeId: string
}


export const accountApi = excelHrApi.injectEndpoints({
    endpoints: (builder) => ({

        getAccounts: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/get_all_accounts',
                headers: getHeaders(),
            }),
            providesTags: ['accounts'],
        }),

        getAccountById: builder.query<ApiResponseInterface, string>({
            query: (id: string) => ({
                url: `/get_account_by_id/${id}`,
            }),
            providesTags: ['accounts'],
        }),

        createAccount: builder.mutation<ApiResponseInterface, CreateAccountBody>({
            query: (body) => ({
                url: '/create_account',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['accounts'],
        }),
    }),
});

export const {
    useGetAccountByIdQuery,
    useGetAccountsQuery,
    useCreateAccountMutation,
} = accountApi;
