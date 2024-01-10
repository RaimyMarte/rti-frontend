import { useEffect, } from "react";
import { useAuthStore } from "./"
import { useCheckAuthQuery } from "../store/api/authApi";

export const useCheckAuth = () => {
    const {
        handleLoginState,
        handleLogoutState,
    } = useAuthStore()

    const { data: userData, isLoading: checkAuthLoading, isUninitialized: checkAuthIsUninitialized } = useCheckAuthQuery()

    useEffect(() => {
        if (!checkAuthLoading && !checkAuthIsUninitialized) {
            if (userData?.isSuccess) {
                // User is authenticated
                handleLoginState(userData?.data?.user);
            } else {
                // User is not authenticated
                handleLogoutState();
            }
        }
    }, [userData, checkAuthLoading, checkAuthIsUninitialized]);
}