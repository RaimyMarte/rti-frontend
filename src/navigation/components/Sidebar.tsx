import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom"
import { useUiStore } from "../../hooks";

export const Sidebar = () => {
    const { t } = useTranslation();
    const {
        // accountsMenu,
        // lettersMenu,
        adminMenu,
        maintenanceMenu,
        // managmentMenu,
        toggleMenu,
    } = useUiStore()

    return (
        <div className="app-menu navbar-menu">
            {/* LOGO */}
            <div className="navbar-brand-box">
                {/* Dark Logo*/}
                <NavLink to="/home" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src="/assets/images/logo-xs.png" height={35} />
                    </span>
                    <span className="logo-lg">
                        <img src="/assets/images/logo.png" height={172} />
                    </span>
                </NavLink>
                {/* Light Logo*/}
                <NavLink to="/home" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="/assets/images/logo-xs.png" height={35} />
                    </span>
                    <span className="logo-lg">
                        <img src="/assets/images/logo.png" height={172} />
                    </span>
                </NavLink>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line" />
                </button>
            </div>

            <div className="scrollbar">
                <div className="container-fluid">
                    <div id="two-column-menu">
                    </div>
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span>{t('Menu')}</span></li>

                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link menu-link">
                                <i className="las la-home" /> <span>{t('Home')}</span>
                            </NavLink>
                        </li>

                        {/* <li className="nav-item">
                            <a className={`nav-link menu-link ${accountsMenu.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('accountsMenu')} data-bs-toggle="collapse" role="button" aria-expanded={accountsMenu.isOpen ? 'true' : 'false'}>
                                <i className="las la-id-card" /> <span>{t('Accounts')}</span>
                            </a>
                            <div className={`collapse menu-dropdown ${accountsMenu.isOpen ? 'show' : ''}`}>
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <NavLink to="/accounts/facilities" className="nav-link">{t('List')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/accounts/physicians" className="nav-link">{t('Reassigns')} </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li> */}

                        {/* <li className="nav-item">
                            <a className={`nav-link menu-link ${managmentMenu.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('managmentMenu')} data-bs-toggle="collapse" role="button" aria-expanded={managmentMenu.isOpen ? 'true' : 'false'}>
                                <i className="lab la-delicious" /> <span>{t('Management')}</span>
                            </a>
                            <div className={`collapse menu-dropdown ${managmentMenu.isOpen ? 'show' : ''}`}>
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <a className={`nav-link menu-link ${managmentMenu?.administrationsMenu?.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('managmentMenu.administrationsMenu')} data-bs-toggle="collapse" role="button" aria-expanded={managmentMenu?.administrationsMenu?.isOpen ? 'true' : 'false'} >
                                            {t('Administration')}
                                        </a>
                                        <div className={`collapse menu-dropdown ${managmentMenu?.administrationsMenu?.isOpen ? 'show' : ''}`}>
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <NavLink to="/accounts/facilities" className="nav-link"> {t('Contracts')}  </NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink to="/accounts/physicians" className="nav-link"> {t('EndMonthClosing')} </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/accounts/facilities" className="nav-link"> {t('Facilities')} / {t('Practices')}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link"> {t('Doctors')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link"> {t('PlanContracts')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link"> {t('Carriers')} </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link menu-link ${lettersMenu.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('lettersMenu')} data-bs-toggle="collapse" role="button" aria-expanded={lettersMenu.isOpen ? 'true' : 'false'}>
                                <i className=" las la-file-invoice" /> <span>{t('Letters')}</span>
                            </a>
                            <div className={`collapse menu-dropdown ${lettersMenu.isOpen ? 'show' : ''}`}>
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <NavLink to="/accounts/list" className="nav-link">{t('Facility')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/home" className="nav-link">{t('Internal')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/accounts/physicians" className="nav-link">{t('Physician')} </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/reports" className="nav-link menu-link">
                                <i className="las la-file-alt" /> <span>{t('Reports')}</span>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/tools" className="nav-link menu-link">
                                <i className="las la-wrench" /> <span>{t('Tools')}</span>
                            </NavLink>
                        </li> */}

                        <li className="menu-title"><i className="ri-more-fill" /> <span>{t('Admin')}</span></li>
                        <li className="nav-item">
                            <a className={`nav-link menu-link ${adminMenu.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('adminMenu')} data-bs-toggle="collapse" role="button" aria-expanded={adminMenu.isOpen ? 'true' : 'false'}>
                                <i className="lar la-user-circle" /> <span>{t('Users')}</span>
                            </a>
                            <div className={`collapse menu-dropdown ${adminMenu.isOpen ? 'show' : ''}`}>
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <NavLink to="/users/list" className="nav-link">{t('Users')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/user_role" className="nav-link">{t('UserRole')} </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link menu-link ${maintenanceMenu.isOpen ? '' : 'collapsed'}`} onClick={() => toggleMenu('maintenanceMenu')} data-bs-toggle="collapse" role="button" aria-expanded={maintenanceMenu.isOpen ? 'true' : 'false'}>
                                <i className="las la-pager" /> <span data-key="t-maintenances">{t('Maintenance')}</span>
                            </a>
                            <div className={`collapse menu-dropdown ${maintenanceMenu.isOpen ? 'show' : ''}`}>
                                <ul className="nav nav-sm flex-column">
                                    {/* <li className="nav-item">
                                        <NavLink to="/account_active_carrier" className="nav-link">{t('AccountActiveCarrier')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_admission_type" className="nav-link">{t('AccountAdmissionType')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_excel_contract_carrier" className="nav-link">{t('AccountExcelContractCarrier')} </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/account_facility_status" className="nav-link">{t('AccountFacilityStatus')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_patient_class" className="nav-link">{t('AccountPatientClass')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_plan_contract" className="nav-link">{t('AccountPlanContract')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_status" className="nav-link">{t('AccountStatus')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_type" className="nav-link">{t('AccountType')} </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/account_workflow" className="nav-link">{t('AccountWorkflow')} </NavLink>
                                    </li> */}
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/setting" className="nav-link menu-link">
                                <i className="las la-cog" /> <span>{t('Settings')}</span>
                            </NavLink>
                        </li>
                    </ul>

                    {/* Sidebar */}
                </div>
            </div>
            <div className="sidebar-background" />
        </div>
    )
}
