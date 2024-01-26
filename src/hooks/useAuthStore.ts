import { TFAState, checkingCredentials, loginState, logoutState, userTFAState, } from "../store/auth"
import { UserInterface, } from "../interfaces"
import { useAppDispatch, useAppSelector } from "."

export const useAuthStore = () => {
    const { status, user, tfaState, isUserAdmin } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleCheckingCredentials = () => dispatch(checkingCredentials())
    const handleLoginState = (payload: UserInterface | null) => dispatch(loginState(payload))
    const handleUserTFAState = (payload: TFAState | null) => dispatch(userTFAState(payload))
    const handleLogoutState = () => dispatch(logoutState())

    return {
        //Properties
        status,
        user,
        tfaState,
        isUserAdmin,

        //Methods
        handleCheckingCredentials,
        handleLoginState,
        handleUserTFAState,
        handleLogoutState,
    }
}