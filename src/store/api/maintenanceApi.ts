import { rtiApi } from ".";
import { getHeaders } from '../../utils';
import { ApiResponseInterface } from "../../interfaces";

interface MaintenanceById {
    maintenanceName: string
    maintenanceId: number
}

export interface MaintenanceBody {
    Name: string,
    Code: string,
    Description: string,
    Enabled: boolean
}

export interface CreateMaintenance {
    maintenanceName: string
    body: MaintenanceBody
}

export interface UpdateMaintenance extends MaintenanceById {
    body: MaintenanceBody
}

interface GetAllMaintenanceWithPaginationQueries {
    page: number
    pageSize: number
    search: string
    maintenanceName: string
}

export const maintenanceApi = rtiApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaintenance: builder.query<ApiResponseInterface, string>({
            query: (maintenanceName) => `/maintenance_get_all/${maintenanceName}`,
            providesTags: ['maintenances'],
        }),

        getMaintenanceWithPagination: builder.query<ApiResponseInterface, GetAllMaintenanceWithPaginationQueries>({
            query: ({ maintenanceName, page, pageSize, search }) => `/maintenance_get_all_with_pagination/${maintenanceName}?page=${page}&pageSize=${pageSize}&search=${search}`,
            providesTags: ['maintenances'],
        }),

        getSelectedMaintenances: builder.query<ApiResponseInterface, string[]>({
            query: (selectedMaintenances) => ({
                url: '/get_all_selected_maintenances',
                method: 'POST',
                body: { selectedMaintenances },
            }),
        }),

        getMaintenanceById: builder.query<ApiResponseInterface, MaintenanceById>({
            query: ({ maintenanceName, maintenanceId }) => `/maintenance_get_by_id/${maintenanceName}/${maintenanceId}`,
            providesTags: ['maintenances'],
        }),

        createMaintenance: builder.mutation<ApiResponseInterface, CreateMaintenance>({
            query: ({ maintenanceName, body }) => ({
                url: `/maintenance_create/${maintenanceName}`,
                method: 'POST',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['maintenances'],
        }),

        updateMaintenance: builder.mutation<ApiResponseInterface, UpdateMaintenance>({
            query: ({ maintenanceName, maintenanceId, body }) => ({
                url: `/maintenance_update/${maintenanceName}/${maintenanceId}`,
                method: 'PATCH',
                body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['maintenances'],
        }),

        deleteMaintenance: builder.mutation<ApiResponseInterface, MaintenanceById>({
            query: ({ maintenanceName, maintenanceId }) => ({
                url: `/maintenance_delete/${maintenanceName}/${maintenanceId}`,
                method: 'DELETE',
                headers: getHeaders(),
            }),
            invalidatesTags: ['maintenances'],
        }),
    }),
});

export const {
    useGetMaintenanceQuery,
    useGetMaintenanceWithPaginationQuery,
    useGetSelectedMaintenancesQuery,
    useGetMaintenanceByIdQuery,
    useUpdateMaintenanceMutation,
    useCreateMaintenanceMutation,
    useDeleteMaintenanceMutation,
} = maintenanceApi;

