import { ApiResponseInterface, } from '../../interfaces';
import { getHeaders } from '../../utils';
import { rtiApi } from './';

export interface ApplicationBody {
    FirstName: string;
    MiddleName: string | null;
    LastName: string;
    NickName: string | null;
    Gender: string | null;
    AddressLine1: string;
    AddressLine2: string | null;
    CountryId?: string | null;
    StateId?: string | null;
    CityId?: string | null;
    NationalityId?: string | null;
    PostalCode: string | null;
    DateOfBirth: Date;
    PreferredLanguageId: string;
    EmailAddress: string | null;
    PhoneNumber: string;
    AttendingAnySchools: boolean;
    AttendingAnySchoolsId: string | null;
    AttendingAnySchoolsExplain: string | null;
    USAVeteran: boolean;
    NYCHAResident: boolean;
    HowDidYouHearAboutUsId: string | null;
    HearABoutUsOther: string | null;
    AdditionalComments: string | null;
    ApplicationDate: Date;
    StatusId: string;
    OrientationTalk?: boolean;
    OrientationTalkDate?: Date | null;
}
export interface ApplicationUpdate {
    body: ApplicationBody
    id: string
}

export interface GetApplicationsQueries {
    page: number
    pageSize: number
    search: string
}

export const applicationApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({

        getApplications: builder.query<ApiResponseInterface, GetApplicationsQueries>({
            query: ({ page, pageSize, search }) => ({
                url: `/application_get_all?page=${page}&pageSize=${pageSize}&search=${search}`,
                headers: getHeaders(),
            }),
            providesTags: ['applications'],
        }),

        getApplicationById: builder.query<ApiResponseInterface, string>({
            query: (id: string) => ({
                url: `/application_get_by_id/${id}`,
                headers: getHeaders(),
            }),
            providesTags: ['applications'],
        }),

        createApplication: builder.mutation<ApiResponseInterface, ApplicationBody>({
            query: (body) => ({
                url: '/application_create',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['applications'],
        }),

        userCreateApplication: builder.mutation<ApiResponseInterface, ApplicationBody>({
            query: (body) => ({
                url: '/application_user_create',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['applications'],
        }),

        updateApplication: builder.mutation<ApiResponseInterface, ApplicationUpdate>({
            query: ({ body, id }) => ({
                url: `/application_update/${id}`,
                method: 'PATCH',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['applications'],
        }),

        deleteApplication: builder.mutation<ApiResponseInterface, string>({
            query: (id) => ({
                url: `/application_delete/${id}`,
                method: 'DELETE',
                headers: getHeaders(),
            }),
            invalidatesTags: ['applications'],
        }),
    }),
});

export const {
    useGetApplicationByIdQuery,
    useGetApplicationsQuery,
    useCreateApplicationMutation,
    useUserCreateApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = applicationApi;
