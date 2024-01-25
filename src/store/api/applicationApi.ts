import { ApiResponseInterface, } from '../../interfaces';
import { getHeaders } from '../../utils';
import { rtiApi } from './';

export interface ApplicationBody {
    FirstName: string;
    MiddleName: string | null;
    LastName: string;
    NickName: string | null;
    AddressLine1: string;
    AddressLine2: string | null;
    CountryId: number | null;
    StateId: number | null;
    CityId: number | null;
    PostalCode: string | null;
    DateOfBirth: Date;
    PreferredLanguageId: number;
    EmailAddress: string | null;
    PhoneNumber: string;
    AttendingAnySchools: boolean;
    AttendingAnySchoolsExplain: string | null;
    USAVeteran: boolean;
    NYCHAResident: boolean;
    HowDidYourHearAboutUsId: number | null;
    HearABoutUsOther: string | null;
    AdditionalComments: string | null;
    ApplicationDate: Date;
    StatusId: number;
    OrientationTalk: boolean;
    OrientationTalkDate: Date | null;
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
                url: '/application_create_local',
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['applications'],
        }),

        updateApplication: builder.mutation<ApiResponseInterface, ApplicationBody>({
            query: (body) => ({
                url: '/application_get_by_id',
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
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = applicationApi;
