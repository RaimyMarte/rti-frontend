import { UserProfilePageLayout } from '../layout/UserProfilePageLayout'
import { Navigate, useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../../store/api'
import { Loading } from '../../ui/components'
import { MainLayout } from '../../layout'

export const AdminUserDetailsPage = () => {
    const { id } = useParams()
    const { data: user, isLoading: userLoading } = useGetUserByIdQuery(id || '')

    return (
        <MainLayout>
            {
                userLoading
                    ? <Loading />
                    : user?.data
                        ? <UserProfilePageLayout user={user?.data} />
                        : <Navigate to="/home" />
            }
        </MainLayout>
    )
}
