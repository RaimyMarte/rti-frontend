import { rtiApi } from '.';
import { getHeaders } from '../../utils';
import { ApiResponseInterface, } from '../../interfaces';


export const geoApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({

        getCountries: builder.query<ApiResponseInterface, void>({
            query: () => ({
                url: '/get_all_countries',
                headers: getHeaders(),
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
    useGetCountriesQuery,
    useGetStatesQuery,
    useGetCitiesQuery,
} = geoApi;
