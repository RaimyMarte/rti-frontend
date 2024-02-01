import { ApiResponseInterface, } from '../../interfaces';
import { rtiApi } from '.';


export const geoApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({
        getNationalities: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/get_all_nationalities',
            }),
        }),

        getCountries: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/get_all_countries',
            }),
        }),

        getStates: builder.query<ApiResponseInterface, string>({
            query: (countryId: string) => ({
                url: `/get_all_states/${countryId}`,
            }),
        }),

        getCities: builder.query<ApiResponseInterface, { countryId: string; stateId: string }>({
            query: ({ countryId, stateId }) => ({
                url: `/get_all_cities/${countryId}/${stateId}`,
            }),
        }),
    }),
});

export const {
    useGetNationalitiesQuery,
    useGetCountriesQuery,
    useGetStatesQuery,
    useGetCitiesQuery,
} = geoApi;
