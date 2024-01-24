import { useAppDispatch, useAppSelector } from "."
import { onToggleMenu } from "../store/ui"

export const useUiStore = () => {
    const {
        accountsMenu,
        adminMenu,
        lettersMenu,
        maintenanceMenu,
        managmentMenu,
    } = useAppSelector(state => state.ui)

    const dispatch = useAppDispatch()

    const toggleMenu = (menuName: string) => dispatch(onToggleMenu(menuName))

    return {
        //Properties
        accountsMenu,
        adminMenu,
        lettersMenu,
        maintenanceMenu,
        managmentMenu,

        //Methods
        toggleMenu,
    }
}