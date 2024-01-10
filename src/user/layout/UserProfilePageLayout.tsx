import { isMutationSuccessResponse } from "../../helpers"
import { Loading } from "../../ui/components"
import { UpdateUserBody, useGetMaintenanceQuery, useUpdateUserMutation, useUploadUserPictureMutation } from "../../store/api"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { MaintenanceInterface, UserInterface } from "../../interfaces"
import { useSaveImage } from "../../hooks"
import toast from "react-hot-toast"

interface UserProfilePageLayoutProps {
    user: UserInterface
}

const usersPublicUrl: string = `${import.meta.env.VITE_API_PUBLIC_URL}/users`

export const UserProfilePageLayout = ({ user }: UserProfilePageLayoutProps) => {
    const { Id, Picture, UserProfile, Phone, Email, UserName, UserRoleId, Authorized, Locked } = user

    const { data: usersRoles, isLoading: usersRolesLoading, } = useGetMaintenanceQuery('UserRole')
    const [uploadUserPicture, { isLoading: isUploadUserPictureLoading }] = useUploadUserPictureMutation()

    const { onSaveImage, fileInputRef, imagePreview, onFileInputChange, } = useSaveImage({ uploadApiFn: uploadUserPicture, elementId: user?.Id || '' })

    const [updateUser, { isLoading: updateUserLoading, }] = useUpdateUserMutation()

    const {
        handleSubmit,
        register,
        formState: { errors: formErrors },
        setValue,
    } = useForm<UpdateUserBody>();

    useEffect(() => {
        if (user) {
            setValue('FirstName', UserProfile?.FirstName || '');
            setValue('LastName', UserProfile?.LastName || '');
            setValue('NickName', UserProfile?.NickName || '');
            setValue('Gender', UserProfile?.Gender || '');
            setValue('Phone', Phone || '');
            setValue('Email', Email || '');
            setValue('UserName', UserName || '');
            setValue('UserRoleId', UserRoleId || '');
            setValue('Authorized', Authorized || true);
            setValue('Locked', Locked || false);
        }
    }, [user]);

    const onFormSubmit = async (data: UpdateUserBody) => {
        try {
            if (imagePreview) onSaveImage()

            const response = await updateUser({ ...data, UserId: Id || '' });
            if (isMutationSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.error(respData?.message || "");
                    return;
                }

                toast.success(respData?.message)
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    }

    return (
        <div>
            {isUploadUserPictureLoading || updateUserLoading || usersRolesLoading ? <Loading /> : null}
            <div className="position-relative mx-n4 mt-n4">
                <div className="profile-wid-bg profile-setting-img">
                    <img src="/assets/images/profile-bg.jpg" className="profile-wid-img" />
                    <div className="overlay-content">
                        <div className="text-end p-3">
                            <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                                <input id="profile-foreground-img-file-input" type="file" className="profile-foreground-img-file-input" />
                                <label htmlFor="profile-foreground-img-file-input" className="profile-photo-edit btn btn-light">
                                    <i className="ri-image-edit-line align-bottom me-1" /> Change Cover
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xxl-3">
                    <div className="card mt-n5">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                    <img
                                        src={
                                            imagePreview
                                                ? imagePreview
                                                : Picture
                                                    ? `${usersPublicUrl}/${Picture}`
                                                    : '/assets/images/users/user-dummy-img.jpg'
                                        }
                                        className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                        alt="user-profile-image"
                                    />
                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <input id="profile-img-file-input" type="file" className="profile-img-file-input" ref={fileInputRef} onChange={onFileInputChange} />
                                        <label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-camera-fill" />
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <h5 className="fs-17 mb-1">{user?.DisplayName}</h5>
                                <p className="text-muted mb-0">{user?.UserRole?.Name}</p>
                            </div>
                        </div>
                    </div>
                    {/*end card*/}
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-5">
                                <div className="flex-grow-1">
                                    <h5 className="card-title mb-0">Complete Your Profile</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="javascript:void(0);" className="badge bg-light text-primary fs-12"><i className="ri-edit-box-line align-bottom me-1" /> Edit</a>
                                </div>
                            </div>
                            <div className="progress animated-progress custom-progress progress-label">
                                <div className="progress-bar bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
                                    <div className="label">30%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <div className="flex-grow-1">
                                    <h5 className="card-title mb-0">Portfolio</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <a href="javascript:void(0);" className="badge bg-light text-primary fs-12"><i className="ri-add-fill align-bottom me-1" /> Add</a>
                                </div>
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-dark text-light">
                                        <i className="ri-github-fill" />
                                    </span>
                                </div>
                                <input type="email" className="form-control" id="gitUsername" placeholder="Username" defaultValue="@daveadame" />
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-primary">
                                        <i className="ri-global-fill" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="websiteInput" placeholder="www.example.com" defaultValue="www.velzon.com" />
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-success">
                                        <i className="ri-dribbble-fill" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="dribbleName" placeholder="Username" defaultValue="@dave_adame" />
                            </div>
                            <div className="d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-danger">
                                        <i className="ri-pinterest-fill" />
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="pinterestName" placeholder="Username" defaultValue="Advance Dave" />
                            </div>
                        </div>
                    </div>
                    {/*end card*/}
                </div>
                {/*end col*/}
                <div className="col-xxl-9">
                    <div className="card mt-xxl-n5">
                        <div className="card-header">
                            <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab">
                                        <i className="fas fa-home" />
                                        Personal Details
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#userDetails" role="tab">
                                        <i className="fas fa-home" />
                                        User Details
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab">
                                        <i className="far fa-user" />
                                        Change Password
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#experience" role="tab">
                                        <i className="far fa-envelope" />
                                        Experience
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tab" href="#privacy" role="tab">
                                        <i className="far fa-envelope" />
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body p-4">
                            <div className="tab-content">
                                <div className="tab-pane active" id="personalDetails" role="tabpanel">
                                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                                                    <input type="text" {...register("FirstName", { required: 'FirstName is required', })} className="form-control" placeholder="Enter first name" />
                                                    {formErrors?.FirstName && <div className='text-danger invalid-input'>{formErrors?.FirstName.message}</div>}
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                                    <input type="text"  {...register("LastName", { required: 'LastName is required', })} className="form-control" placeholder="Enter last name" />
                                                    {formErrors?.LastName && <div className='text-danger invalid-input'>{formErrors?.LastName.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Nick Name</label>
                                                    <input type="text"  {...register("NickName")} className="form-control" placeholder="Enter nick name number" />
                                                    {formErrors?.NickName && <div className='text-danger invalid-input'>{formErrors?.NickName.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone</label>
                                                    <input type="text"  {...register("Phone")} className="form-control" placeholder="Enter phone number" />
                                                    {formErrors?.Phone && <div className='text-danger invalid-input'>{formErrors?.Phone.message}</div>}
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email <span className="text-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        {...register("Email",
                                                            {
                                                                required: 'Email is required',
                                                                pattern: {
                                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                                    message: 'Invalid email address',
                                                                },
                                                            })}
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                    />
                                                    {formErrors?.Email && <div className='text-danger invalid-input'>{formErrors?.Email.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Gender</label>
                                                    <select className="form-control"  {...register("Gender")} data-choices data-choices-search-false>
                                                        <option value="">Select a gender</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                        <option value="U">Unknown</option>
                                                    </select>
                                                    {formErrors?.Gender && <div className='text-danger invalid-input'>{formErrors?.Gender.message}</div>}
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button type="submit" className="btn btn-primary">Update</button>
                                                    <button type="button" className="btn btn-soft-success">Cancel</button>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                        </div>
                                        {/*end row*/}
                                    </form>
                                </div>

                                <div className="tab-pane" id="userDetails" role="tabpanel">
                                    <form onSubmit={handleSubmit(onFormSubmit)} className="tablelist-form">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">User Name <span className="text-danger">*</span></label>
                                                    <input type="text" {...register("UserName", { required: 'UserName is required', })} className="form-control" placeholder="Enter user name" />
                                                    {formErrors?.UserName && <div className='text-danger invalid-input'>{formErrors?.UserName.message}</div>}
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Role <span className="text-danger">*</span></label>
                                                    <select className="form-control"  {...register("UserRoleId", { required: 'User role is required', })} data-choices data-choices-search-false>
                                                        <option value="">Select a role</option>
                                                        {
                                                            usersRoles?.data.map((role: MaintenanceInterface) => {
                                                                const { Name, Id } = role

                                                                return (
                                                                    <option key={Id} value={Id}>{Name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {formErrors?.UserRoleId && <div className='text-danger invalid-input'>{formErrors?.UserRoleId.message}</div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3 form-check">
                                                    <input className="form-check-input" type="checkbox" role="switch" defaultChecked={true} {...register("Authorized")} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Authorized
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="mb-3 form-check ">
                                                    <input className="form-check-input" type="checkbox" role="switch" defaultChecked={true} {...register("Locked")} />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Locked
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button type="submit" className="btn btn-primary">Update</button>
                                                    <button type="button" className="btn btn-soft-success">Cancel</button>
                                                </div>
                                            </div>
                                            {/*end col*/}

                                            <div className="mt-4 mb-3 border-bottom pb-2">
                                        <div className="float-end">
                                            <a href="javascript:void(0);" className="link-primary">All Logout</a>
                                        </div>
                                        <h5 className="card-title">Login History</h5>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                <i className="ri-smartphone-line" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6>iPhone 12 Pro</h6>
                                            <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                2:47PM</p>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);">Logout</a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                <i className="ri-tablet-line" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6>Apple iPad Pro</h6>
                                            <p className="text-muted mb-0">Washington, United States - November 06
                                                at 10:43AM</p>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);">Logout</a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                <i className="ri-smartphone-line" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6>Galaxy S21 Ultra 5G</h6>
                                            <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                3:24PM</p>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);">Logout</a>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 avatar-sm">
                                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                <i className="ri-macbook-line" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                            <h6>Dell Inspiron 14</h6>
                                            <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                8:10AM</p>
                                        </div>
                                        <div>
                                            <a href="javascript:void(0);">Logout</a>
                                        </div>
                                    </div>
                                        </div>
                                        {/*end row*/}
                                    </form>
                                </div>

                                {/*end tab-pane*/}
                                <div className="tab-pane" id="changePassword" role="tabpanel">
                                    <form action="javascript:void(0);">
                                        <div className="row g-2">
                                            <div className="col-lg-4">
                                                <div>
                                                    <label htmlFor="oldpasswordInput" className="form-label">Old
                                                        Password*</label>
                                                    <input type="password" className="form-control" id="oldpasswordInput" placeholder="Enter current password" />
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-4">
                                                <div>
                                                    <label htmlFor="newpasswordInput" className="form-label">New
                                                        Password*</label>
                                                    <input type="password" className="form-control" id="newpasswordInput" placeholder="Enter new password" />
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-4">
                                                <div>
                                                    <label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                        Password*</label>
                                                    <input type="password" className="form-control" id="confirmpasswordInput" placeholder="Confirm password" />
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <a href="javascript:void(0);" className="link-primary text-decoration-underline">Forgot
                                                        Password ?</a>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-12">
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-success">Change
                                                        Password</button>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                        </div>
                                        {/*end row*/}
                                    </form>

                                </div>
                                {/*end tab-pane*/}
                                <div className="tab-pane" id="experience" role="tabpanel">
                                    <form>
                                        <div id="newlink">
                                            <div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="jobTitle" className="form-label">Job
                                                                Title</label>
                                                            <input type="text" className="form-control" id="jobTitle" placeholder="Job title" defaultValue="Lead Designer / Developer" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="companyName" className="form-label">Company
                                                                Name</label>
                                                            <input type="text" className="form-control" id="companyName" placeholder="Company name" defaultValue="Themesbrand" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="experienceYear" className="form-label">Experience Years</label>
                                                            <div className="row">
                                                                <div className="col-lg-5">
                                                                    <select className="form-control" data-choices data-choices-search-false name="experienceYear" id="experienceYear">
                                                                        <option value="0">Select years</option>
                                                                        <option value="Choice 1">2001</option>
                                                                        <option value="Choice 2">2002</option>
                                                                        <option value="Choice 3">2003</option>
                                                                        <option value="Choice 4">2004</option>
                                                                        <option value="Choice 5">2005</option>
                                                                        <option value="Choice 6">2006</option>
                                                                        <option value="Choice 7">2007</option>
                                                                        <option value="Choice 8">2008</option>
                                                                        <option value="Choice 9">2009</option>
                                                                        <option value="Choice 10">2010</option>
                                                                        <option value="Choice 11">2011</option>
                                                                        <option value="Choice 12">2012</option>
                                                                        <option value="Choice 13">2013</option>
                                                                        <option value="Choice 14">2014</option>
                                                                        <option value="Choice 15">2015</option>
                                                                        <option value="Choice 16">2016</option>
                                                                        <option value="Choice 17" selected>2017
                                                                        </option>
                                                                        <option value="Choice 18">2018</option>
                                                                        <option value="Choice 19">2019</option>
                                                                        <option value="Choice 20">2020</option>
                                                                        <option value="Choice 21">2021</option>
                                                                        <option value="Choice 22">2022</option>
                                                                    </select>
                                                                </div>
                                                                {/*end col*/}
                                                                <div className="col-auto align-self-center">
                                                                    to
                                                                </div>
                                                                {/*end col*/}
                                                                <div className="col-lg-5">
                                                                    <select className="form-control" data-choices data-choices-search-false name="choices-single-default2">
                                                                        <option value="">Select years</option>
                                                                        <option value="Choice 1">2001</option>
                                                                        <option value="Choice 2">2002</option>
                                                                        <option value="Choice 3">2003</option>
                                                                        <option value="Choice 4">2004</option>
                                                                        <option value="Choice 5">2005</option>
                                                                        <option value="Choice 6">2006</option>
                                                                        <option value="Choice 7">2007</option>
                                                                        <option value="Choice 8">2008</option>
                                                                        <option value="Choice 9">2009</option>
                                                                        <option value="Choice 10">2010</option>
                                                                        <option value="Choice 11">2011</option>
                                                                        <option value="Choice 12">2012</option>
                                                                        <option value="Choice 13">2013</option>
                                                                        <option value="Choice 14">2014</option>
                                                                        <option value="Choice 15">2015</option>
                                                                        <option value="Choice 16">2016</option>
                                                                        <option value="Choice 17">2017</option>
                                                                        <option value="Choice 18">2018</option>
                                                                        <option value="Choice 19">2019</option>
                                                                        <option value="Choice 20" selected>2020
                                                                        </option>
                                                                        <option value="Choice 21">2021</option>
                                                                        <option value="Choice 22">2022</option>
                                                                    </select>
                                                                </div>
                                                                {/*end col*/}
                                                            </div>
                                                            {/*end row*/}
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="jobDescription" className="form-label">Job
                                                                Description</label>
                                                            <textarea className="form-control" id="jobDescription" rows={3} placeholder="Enter description" defaultValue={"You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. "} />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="hstack gap-2 justify-content-end">
                                                        <a className="btn btn-success" href="javascript:deleteEl(1)">Delete</a>
                                                    </div>
                                                </div>
                                                {/*end row*/}
                                            </div>
                                        </div>
                                        <div id="newForm" style={{ display: 'none' }}>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="hstack gap-2">
                                                <button type="submit" className="btn btn-success">Update</button>
                                                <a href="javascript:new_link()" className="btn btn-primary">Add
                                                    New</a>
                                            </div>
                                        </div>
                                        {/*end col*/}
                                    </form>
                                </div>
                                {/*end tab-pane*/}
                                <div className="tab-pane" id="privacy" role="tabpanel">
                                    <div className="mb-4 pb-2">
                                        <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                            <div className="flex-grow-1">
                                                <h6 className="fs-15 mb-1">Two-factor Authentication</h6>
                                                <p className="text-muted">Two-factor authentication is an enhanced
                                                    security meansur. Once enabled, you'll be required to give
                                                    two types of identification when you log into Google
                                                    Authentication and SMS are Supported.</p>
                                            </div>
                                            <div className="flex-shrink-0 ms-sm-3">
                                                <a href="javascript:void(0);" className="btn btn-sm btn-primary">Enable Two-facor
                                                    Authentication</a>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                            <div className="flex-grow-1">
                                                <h6 className="fs-15 mb-1">Secondary Verification</h6>
                                                <p className="text-muted">The first factor is a password and the
                                                    second commonly includes a text with a code sent to your
                                                    smartphone, or biometrics using your fingerprint, face, or
                                                    retina.</p>
                                            </div>
                                            <div className="flex-shrink-0 ms-sm-3">
                                                <a href="javascript:void(0);" className="btn btn-sm btn-primary">Set
                                                    up secondary method</a>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                            <div className="flex-grow-1">
                                                <h6 className="fs-15 mb-1">Backup Codes</h6>
                                                <p className="text-muted mb-sm-0">A backup code is automatically
                                                    generated for you when you turn on two-factor authentication
                                                    through your iOS or Android Twitter app. You can also
                                                    generate a backup code on twitter.com.</p>
                                            </div>
                                            <div className="flex-shrink-0 ms-sm-3">
                                                <a href="javascript:void(0);" className="btn btn-sm btn-primary">Generate backup codes</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <h5 className="card-title text-decoration-underline mb-3">Application
                                            Notifications:</h5>
                                        <ul className="list-unstyled mb-0">
                                            <li className="d-flex">
                                                <div className="flex-grow-1">
                                                    <label htmlFor="directMessage" className="form-check-label fs-15">Direct messages</label>
                                                    <p className="text-muted">Messages from people you follow</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="directMessage" defaultChecked />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-flex mt-2">
                                                <div className="flex-grow-1">
                                                    <label className="form-check-label fs-15" htmlFor="desktopNotification">
                                                        Show desktop notifications
                                                    </label>
                                                    <p className="text-muted">Choose the option you want as your
                                                        default setting. Block a site: Next to "Not allowed to
                                                        send notifications," click Add.</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="desktopNotification" defaultChecked />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-flex mt-2">
                                                <div className="flex-grow-1">
                                                    <label className="form-check-label fs-15" htmlFor="emailNotification">
                                                        Show email notifications
                                                    </label>
                                                    <p className="text-muted"> Under Settings, choose Notifications.
                                                        Under Select an account, choose the account to enable
                                                        notifications for. </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="emailNotification" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-flex mt-2">
                                                <div className="flex-grow-1">
                                                    <label className="form-check-label fs-15" htmlFor="chatNotification">
                                                        Show chat notifications
                                                    </label>
                                                    <p className="text-muted">To prevent duplicate mobile
                                                        notifications from the Gmail and Chat apps, in settings,
                                                        turn off Chat notifications.</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="chatNotification" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="d-flex mt-2">
                                                <div className="flex-grow-1">
                                                    <label className="form-check-label fs-15" htmlFor="purchaesNotification">
                                                        Show purchase notifications
                                                    </label>
                                                    <p className="text-muted">Get real-time purchase alerts to
                                                        protect yourself from fraudulent charges.</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="purchaesNotification" />
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="card-title text-decoration-underline mb-3">Delete This
                                            Account:</h5>
                                        <p className="text-muted">Go to the Data &amp; Privacy section of your profile
                                            Account. Scroll to "Your data &amp; privacy options." Delete your
                                            Profile Account. Follow the instructions to delete your account :
                                        </p>
                                        <div>
                                            <input type="password" className="form-control" id="passwordInput" placeholder="Enter your password" defaultValue="make@321654987" style={{ maxWidth: 265 }} />
                                        </div>
                                        <div className="hstack gap-2 mt-3">
                                            <a href="javascript:void(0);" className="btn btn-soft-danger">Close &amp;
                                                Delete This Account</a>
                                            <a href="javascript:void(0);" className="btn btn-light">Cancel</a>
                                        </div>
                                    </div>
                                </div>
                                {/*end tab-pane*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*end col*/}
            </div>
        </div>
    )
}