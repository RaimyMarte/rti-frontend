import { excelHrApi } from ".";
import { getHeaders } from '../../helpers';
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

export const maintenanceApi = excelHrApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaintenance: builder.query<ApiResponseInterface, string>({
            query: (maintenanceName) => `/maintenance_get_all/${maintenanceName}`,
            providesTags: ['maintenances'],
        }),

        getMaintenanceById: builder.query<ApiResponseInterface, MaintenanceById>({
            query: ({ maintenanceName, maintenanceId }) => `/maintenance_get_by_id/${maintenanceName}/${maintenanceId}`,
            providesTags: ['maintenances'],
        }),

        createMaintenance: builder.mutation<ApiResponseInterface, CreateMaintenance>({
            query: ({ maintenanceName, body }) => ({
                url: `/maintenance_create/${maintenanceName}`,
                method: 'POST',
                body: body,
                headers: getHeaders(),
            }),
            invalidatesTags: ['maintenances'],
        }),

        updateMaintenance: builder.mutation<ApiResponseInterface, UpdateMaintenance>({
            query: ({ maintenanceName, maintenanceId, body }) => ({
                url: `/maintenance_update/${maintenanceName}/${maintenanceId}`,
                method: 'PATCH',
                body: body,
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
    useGetMaintenanceByIdQuery,
    useUpdateMaintenanceMutation,
    useCreateMaintenanceMutation,
    useDeleteMaintenanceMutation,
} = maintenanceApi;

