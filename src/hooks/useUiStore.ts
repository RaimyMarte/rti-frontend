import { useAppDispatch, useAppSelector } from "."
import { onToggleSidebar } from "../store/ui"

export const useUiStore = () => {
    const { isSidebarOpen, } = useAppSelector(state => state.ui)
    const dispatch = useAppDispatch()

    const handleToggleSidebar = () => dispatch(onToggleSidebar())

    return {
        //Properties
        isSidebarOpen,

        //Methods
        handleToggleSidebar,
    }
}