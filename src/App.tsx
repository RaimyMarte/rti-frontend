import { Toaster } from "react-hot-toast"
import { AppRouter } from "./router/"

export const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-center"
      />
    </>
  )
}