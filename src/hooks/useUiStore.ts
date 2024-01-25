import { useAppDispatch, useAppSelector } from "."
import { onToggleMenu } from "../store/ui"

export const useUiStore = () => {
    const {
        applicationsMenu,
        adminMenu,
        lettersMenu,
        maintenanceMenu,
        managmentMenu,
    } = useAppSelector(state => state.ui)

    const dispatch = useAppDispatch()

    const toggleMenu = (menuName: string) => dispatch(onToggleMenu(menuName))

    return {
        //Properties
        applicationsMenu,
        adminMenu,
        lettersMenu,
        maintenanceMenu,
        managmentMenu,

        //Methods
        toggleMenu,
    }
}