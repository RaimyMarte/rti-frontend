import { ApiMutationResponse, ApiResponseInterface } from "../../interfaces";
import { Loading } from "../../ui/components";
import { useAuthStore, } from "../../hooks"
import { useLogoutMutation } from "../../store/api"
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useState } from "react";

const usersPublicUrl: string = `${import.meta.env.VITE_API_PUBLIC_URL}/users`
const isSuccessResponse = (response: ApiMutationResponse): response is { data: ApiResponseInterface } => {
    return (response as { data: ApiResponseInterface }).data !== undefined;
}

export const Navbar = () => {
    const { handleLogoutState, user } = useAuthStore()
    const { Picture, DisplayName, UserRole } = user || {};

    const [logout, { isLoading: logoutLoading, }] = useLogoutMutation()

    const onLogout = async () => {
        try {
            const response = await logout()

            if (isSuccessResponse(response)) {
                const { data: respData } = response

                if (!respData?.isSuccess) {
                    toast.success(respData?.message)
                    return;
                }

                handleLogoutState()
                Cookies.remove('token')
                toast.success(respData?.message)
            }
        } catch (error) {
            toast.error(`An error occurred: ${error}`);
        }
    }

    const [currentSidebarSize, setCurrentSidebarSize] = useState(document.documentElement.getAttribute('data-sidebar-size'))

    const onToggleSidebar = currentSidebarSize === 'lg'
        ? () => {
            document.documentElement.setAttribute('data-sidebar-size', 'sm')
            setCurrentSidebarSize('sm')
        }
        : () => {
            document.documentElement.setAttribute('data-sidebar-size', 'lg')
            setCurrentSidebarSize('lg')
        }


    return (
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                        {logoutLoading ? (<Loading />) : null}

                        <button
                            type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                            onClick={onToggleSidebar}
                        >
                            <span className={`hamburger-icon ${currentSidebarSize === 'sm' ? 'open' : ''}`}>
                                <span />
                                <span />
                                <span />
                            </span>
                        </button>

                    </div>
                    <div className="d-flex align-items-center">
                        <div className="dropdown d-md-none topbar-head-dropdown header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-search fs-22" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="dropdown ms-1 topbar-head-dropdown header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img id="header-lang-img" src="/assets/images/flags/us.svg" alt="Header Language" height={20} className="rounded" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <a href="javascript:void(0);" className="dropdown-item notify-item language py-2" data-lang="en" title="English">
                                    <img src="/assets/images/flags/us.svg" alt="user-image" className="me-2 rounded" height={18} />
                                    <span className="align-middle">English</span>
                                </a>
                                {/* item*/}
                                <a href="javascript:void(0);" className="dropdown-item notify-item language" data-lang="sp" title="Spanish">
                                    <img src="/assets/images/flags/spain.svg" alt="user-image" className="me-2 rounded" height={18} />
                                    <span className="align-middle">Español</span>
                                </a>
                            </div>
                        </div>
                        <div className="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-category-alt fs-22" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                                <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="btn btn-sm btn-soft-info"> View All Apps
                                                <i className="ri-arrow-right-s-line align-middle" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/github.png" alt="Github" />
                                                <span>GitHub</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/bitbucket.png" alt="bitbucket" />
                                                <span>Bitbucket</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/dribbble.png" alt="dribbble" />
                                                <span>Dribbble</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/dropbox.png" alt="dropbox" />
                                                <span>Dropbox</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/mail_chimp.png" alt="mail_chimp" />
                                                <span>Mail Chimp</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="/assets/images/brands/slack.png" alt="slack" />
                                                <span>Slack</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-shopping-bag fs-22" />
                                <span className="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart" aria-labelledby="page-header-cart-dropdown">
                                <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0 fs-16 fw-semibold"> My Cart</h6>
                                        </div>
                                        <div className="col-auto">
                                            <span className="badge badge-soft-warning fs-13"><span className="cartitem-badge">7</span>
                                                items</span>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{ maxHeight: 300 }}>
                                    <div className="p-2">
                                        <div className="text-center empty-cart" id="empty-cart">
                                            <div className="avatar-md mx-auto my-3">
                                                <div className="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                                                    <i className="bx bx-cart" />
                                                </div>
                                            </div>
                                            <h5 className="mb-3">Your Cart is Empty!</h5>
                                            <a href="apps-ecommerce-products.html" className="btn btn-success w-md mb-3">Shop Now</a>
                                        </div>
                                        <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/products/img-1.png" className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="mt-0 mb-1 fs-14">
                                                        <a href="apps-ecommerce-product-details.html" className="text-reset">Branded
                                                            T-Shirts</a>
                                                    </h6>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Quantity: <span>10 x $32</span>
                                                    </p>
                                                </div>
                                                <div className="px-2">
                                                    <h5 className="m-0 fw-normal">$<span className="cart-item-price">320</span></h5>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i className="ri-close-fill fs-16" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/products/img-2.png" className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="mt-0 mb-1 fs-14">
                                                        <a href="apps-ecommerce-product-details.html" className="text-reset">Bentwood Chair</a>
                                                    </h6>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Quantity: <span>5 x $18</span>
                                                    </p>
                                                </div>
                                                <div className="px-2">
                                                    <h5 className="m-0 fw-normal">$<span className="cart-item-price">89</span></h5>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i className="ri-close-fill fs-16" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/products/img-3.png" className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="mt-0 mb-1 fs-14">
                                                        <a href="apps-ecommerce-product-details.html" className="text-reset">
                                                            Borosil Paper Cup</a>
                                                    </h6>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Quantity: <span>3 x $250</span>
                                                    </p>
                                                </div>
                                                <div className="px-2">
                                                    <h5 className="m-0 fw-normal">$<span className="cart-item-price">750</span></h5>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i className="ri-close-fill fs-16" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/products/img-6.png" className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="mt-0 mb-1 fs-14">
                                                        <a href="apps-ecommerce-product-details.html" className="text-reset">Gray
                                                            Styled T-Shirt</a>
                                                    </h6>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Quantity: <span>1 x $1250</span>
                                                    </p>
                                                </div>
                                                <div className="px-2">
                                                    <h5 className="m-0 fw-normal">$ <span className="cart-item-price">1250</span></h5>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i className="ri-close-fill fs-16" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div className="d-flex align-items-center">
                                                <img src="/assets/images/products/img-5.png" className="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic" />
                                                <div className="flex-1">
                                                    <h6 className="mt-0 mb-1 fs-14">
                                                        <a href="apps-ecommerce-product-details.html" className="text-reset">Stillbird Helmet</a>
                                                    </h6>
                                                    <p className="mb-0 fs-12 text-muted">
                                                        Quantity: <span>2 x $495</span>
                                                    </p>
                                                </div>
                                                <div className="px-2">
                                                    <h5 className="m-0 fw-normal">$<span className="cart-item-price">990</span></h5>
                                                </div>
                                                <div className="ps-2">
                                                    <button type="button" className="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i className="ri-close-fill fs-16" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border" id="checkout-elem">
                                    <div className="d-flex justify-content-between align-items-center pb-3">
                                        <h5 className="m-0 text-muted">Total:</h5>
                                        <div className="px-2">
                                            <h5 className="m-0" id="cart-item-total">$1258.58</h5>
                                        </div>
                                    </div>
                                    <a href="apps-ecommerce-checkout.html" className="btn btn-success text-center w-100">
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="ms-1 header-item d-none d-sm-flex">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" data-toggle="fullscreen">
                                <i className="bx bx-fullscreen fs-22" />
                            </button>
                        </div>
                        <div className="ms-1 header-item d-none d-sm-flex">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode">
                                <i className="bx bx-moon fs-22" />
                            </button>
                        </div>
                        <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                            <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-bell fs-22" />
                                <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span className="visually-hidden">unread messages</span></span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                                <div className="dropdown-head bg-primary bg-pattern rounded-top">
                                    <div className="p-3">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                            </div>
                                            <div className="col-auto dropdown-tabs">
                                                <span className="badge badge-soft-light fs-13"> 4 New</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 pt-2">
                                        <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">
                                                    All (4)
                                                </a>
                                            </li>
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="false">
                                                    Messages
                                                </a>
                                            </li>
                                            <li className="nav-item waves-effect waves-light">
                                                <a className="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false">
                                                    Alerts
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content position-relative" id="notificationItemsTabContent">
                                    <div className="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
                                        <div data-simplebar style={{ maxHeight: 300 }} className="pe-2">
                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                            <i className="bx bx-badge-check" />
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                                Optimization <span className="text-secondary">reward</span> is
                                                                ready!
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> Just 30 sec ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="all-notification-check01" />
                                                            <label className="form-check-label" htmlFor="all-notification-check01" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                                graph 🔔.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 48 min ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="all-notification-check02" />
                                                            <label className="form-check-label" htmlFor="all-notification-check02" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <div className="avatar-xs me-3">
                                                        <span className="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                            <i className="bx bx-message-square-dots" />
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation
                                                            </h6>
                                                        </a>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 2 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="all-notification-check03" />
                                                            <label className="form-check-label" htmlFor="all-notification-check03" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">We talked about a project on linkedin.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 4 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="all-notification-check04" />
                                                            <label className="form-check-label" htmlFor="all-notification-check04" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3 text-center view-all">
                                                <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                    All Notifications <i className="ri-arrow-right-line align-middle" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                                        <div data-simplebar style={{ maxHeight: 300 }} className="pe-2">
                                            <div className="text-reset notification-item d-block dropdown-item">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">We talked about a project on linkedin.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 30 min ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="messages-notification-check01" />
                                                            <label className="form-check-label" htmlFor="messages-notification-check01" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                                graph 🔔.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 2 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="messages-notification-check02" />
                                                            <label className="form-check-label" htmlFor="messages-notification-check02" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-6.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.
                                                            </p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 10 hrs ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="messages-notification-check03" />
                                                            <label className="form-check-label" htmlFor="messages-notification-check03" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-reset notification-item d-block dropdown-item">
                                                <div className="d-flex">
                                                    <img src="/assets/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                    <div className="flex-1">
                                                        <a href="#!" className="stretched-link">
                                                            <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                                        </a>
                                                        <div className="fs-13 text-muted">
                                                            <p className="mb-1">We talked about a project on linkedin.</p>
                                                        </div>
                                                        <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                            <span><i className="mdi mdi-clock-outline" /> 3 days ago</span>
                                                        </p>
                                                    </div>
                                                    <div className="px-2 fs-15">
                                                        <div className="form-check notification-check">
                                                            <input className="form-check-input" type="checkbox" id="messages-notification-check04" />
                                                            <label className="form-check-label" htmlFor="messages-notification-check04" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="my-3 text-center view-all">
                                                <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                    All Messages <i className="ri-arrow-right-line align-middle" /></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab" />
                                    <div className="notification-actions" id="notification-actions">
                                        <div className="d-flex text-muted justify-content-center">
                                            Select <div id="select-content" className="text-body fw-semibold px-1">0</div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown ms-sm-3 header-item topbar-user">
                            <button type="button" className="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="d-flex align-items-center">
                                    <img className="rounded-circle header-profile-user" src={Picture ? `${usersPublicUrl}/${Picture}` : '/assets/images/users/user-dummy-img.jpg'} alt="Header Avatar" />
                                    <span className="text-start ms-xl-2">
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{DisplayName}</span>
                                        <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{UserRole?.Name}</span>
                                    </span>
                                </span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                {/* item*/}
                                <h6 className="dropdown-header">Welcome {DisplayName}!</h6>
                                <h6 className="dropdown-header">{UserRole?.Name}!</h6>
                                <Link className="dropdown-item" to="/user/profile"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" /> <span className="align-middle">Profile</span></Link>
                                <a className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Messages</span></a>
                                <a className="dropdown-item" href="apps-tasks-kanban.html"><i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Taskboard</span></a>
                                <a className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" /> <span className="align-middle">Help</span></a>
                                <div className="dropdown-divider" />
                                <a className="dropdown-item" href="pages-profile-settings.html"><span className="badge bg-soft-success text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Settings</span></a>
                                <a className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1" /> <span className="align-middle">Lock screen</span></a>
                                <button onClick={onLogout} className="dropdown-item"><i className="mdi mdi-logout text-muted fs-16 align-middle me-1" /> <span className="align-middle" data-key="t-logout">Logout</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >

    )
}