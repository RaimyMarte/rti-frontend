import { Toaster } from "react-hot-toast"
import { AppRouter } from "./router/"
import { useTranslation } from "react-i18next"

export const App = () => {
  const { t } = useTranslation()

  return (
    <>
      <AppRouter t={t} />
      <Toaster
        position="top-center"
      />
    </>
  )
}