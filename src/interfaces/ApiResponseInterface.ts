import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ApiResponseInterface {
    code: number;
    data: any;
    exceptionMessage: string;
    isSuccess: boolean;
    message: string;
    stackTrace: string;
    statusCode: number;
    title: string;
    total: number | null;
}

export type ApiMutationResponse = {
    data: ApiResponseInterface;
} | {
    error: FetchBaseQueryError | SerializedError;
}