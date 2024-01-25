import { MainLayout } from "../../layout"

import { Loading } from "../../ui/components"
import { AccountProfileTabs } from "../components"
export const ApplicationDetailsPage = () => {
  // const { id } = useParams()
  const loading = false
  return (
    <MainLayout>
      {
        loading
          ? <Loading />
          : <>
            <div className="profile-foreground position-relative mx-n4 mt-n4">
              <div className="profile-wid-bg">
                <img src="/assets/images/profile-bg.jpg" className="profile-wid-img" />
              </div>
            </div>
            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
              <div className="row g-4">
                <div className="col-auto">
                  <div className="avatar-lg">
                    <img src="/assets/images/users/avatar-1.jpg" alt="user-img" className="img-thumbnail rounded-circle" />
                  </div>
                </div>
                {/*end col*/}
                <div className="col">
                  <div className="p-2">
                    <h3 className="text-white mb-1">Daisy Martinez</h3>
                    <p className="text-white-75">Owner &amp; Founder</p>
                    <div className="hstack text-white-50 gap-1">
                      <div className="me-2"><i className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle" />Miami Lakes,
                        United States</div>
                      <div><i className="ri-building-line me-1 text-white-75 fs-16 align-middle" />RTI
                      </div>
                    </div>
                  </div>
                </div>
                {/*end col*/}
                <div className="col-12 col-lg-auto order-last order-lg-0">
                  <div className="row text text-white-50 text-center">
                    <div className="col-lg-6 col-4">
                      <div className="p-2">
                        <h4 className="text-white mb-1">24.3K</h4>
                        <p className="fs-14 mb-0">Followers</p>
                      </div>
                    </div>
                    <div className="col-lg-6 col-4">
                      <div className="p-2">
                        <h4 className="text-white mb-1">1.3K</h4>
                        <p className="fs-14 mb-0">Following</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <AccountProfileTabs />
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </>
      }

    </MainLayout >
  )
}
