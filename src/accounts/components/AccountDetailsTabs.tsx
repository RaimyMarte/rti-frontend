import dayjs from "dayjs"
import { useRef, useState } from 'react'

interface fileDataInterface {
  name: string
  type: string
  size: string
  date: string
}

const filesData: fileDataInterface[] = [
  {
    name: 'Artboard-documents.zip',
    type: 'ZIP',
    size: '4.57 MB',
    date: '12 Dec 2021',
  },
  {
    name: 'Bank Management System.pdf',
    type: 'PDF',
    size: '8.89 MB',
    date: '	24 Nov 2021',
  },
  {
    name: 'Tour-video.mp4',
    type: 'MP4',
    size: '14.62 MB',
    date: '	19 Nov 20211',
  },
  {
    name: 'Account-statement.xsl',
    type: 'XSL',
    size: '2.38 KB',
    date: '14 Nov 2021',
  },
  {
    name: 'Velzon-logo.png',
    type: 'PNG',
    size: '879 KB',
    date: '02 Nov 2021',
  }
]

interface IconMapping {
  [key: string]: string;
}

const iconMapping: IconMapping = {
  PDF: 'ri-file-pdf-fill',
  ZIP: 'ri-file-zip-fill',
  XSL: 'ri-file-excel-fill',
  PNG: 'ri-image-2-fill',
  JPG: 'ri-image-2-fill',
  JPEG: 'ri-image-2-fill',
  MP4: 'ri-video-line',
};

export const AccountDetailsTabs = () => {

    const docFileInputRef = useRef(null)

    const [files, setFiles] = useState<fileDataInterface[]>(filesData);

    const onDocFileChange = ({ target }: { target: HTMLInputElement }) => {
        if (target.files && target.files.length > 0) {
            const file: File = target.files[0];

            const { name, size } = file

            const sizeInMB: string = `${(size / (1024 * 1024)).toFixed(2)} MB`;
            const fileExtension: string = name.slice((name.lastIndexOf(".") - 1 >>> 0) + 2);

            const newFile = {
                name,
                type: fileExtension.toUpperCase(),
                size: sizeInMB,
                date: dayjs().format('DD MMM YYYY'),
            };

            setFiles((prevFiles: fileDataInterface[]) => [newFile, ...prevFiles]);
        }
    }

    return (
        <div>
            <div className="d-flex">
                {/* Nav tabs */}
                <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link fs-14 active" data-bs-toggle="tab" href="#overview-tab" role="tab">
                            <i className="ri-airplay-fill d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Details</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#summary" role="tab">
                            <i className="ri-list-unordered d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Summary</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#audit" role="tab">
                            <i className="ri-price-tag-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Audit</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#followUp" role="tab">
                            <i className="ri-folder-4-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Follow-Up</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link fs-14" data-bs-toggle="tab" href="#documents" role="tab">
                            <i className="ri-folder-4-line d-inline-block d-md-none" /> <span className="d-none d-md-inline-block">Documents</span>
                        </a>
                    </li>
                </ul>
                <div className="flex-shrink-0">
                    <a href="pages-profile-settings.html" className="btn btn-success"><i className="ri-edit-box-line align-bottom" /> Edit Account</a>
                </div>
            </div>
            {/* Tab panes */}
            <div className="tab-content pt-4 text-muted">
                <div className="tab-pane active" id="overview-tab" role="tabpanel">
                    <div className="row">
                        <div className="col-xxl-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-5">Profile Account</h5>
                                    <div className="progress animated-progress custom-progress progress-label">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '45%' }} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="label">45%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Account Information</h5>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="ps-0" scope="row">Facility:</th>
                                                    <td className="text-muted">Anna Adame</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Excel ID:</th>
                                                    <td className="text-muted">+(1) 987 6543</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Account #:</th>
                                                    <td className="text-muted">000000000</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Status :</th>
                                                    <td className="text-muted">Started</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">SSN #</th>
                                                    <td className="text-muted">000-00-0000</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Patien Name:</th>
                                                    <td className="text-muted">Anna Adame</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Date of Birth:</th>
                                                    <td className="text-muted">Nov 17, 1985 (37 years)</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Admition Type:</th>
                                                    <td className="text-muted">Regular</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Error Code:</th>
                                                    <td className="text-muted">Anna Adame</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Workflow Status:</th>
                                                    <td className="text-muted">Normal</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Assigned User:</th>
                                                    <td className="text-muted">Daisy Martinez</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Date of Service:</th>
                                                    <td className="text-muted">Oct 30, 2020 | 3 years 1 month 16 days</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Placement Date:</th>
                                                    <td className="text-muted">Oct 30, 2020 | 3 years 1 month 16 days</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Facility Status:</th>
                                                    <td className="text-muted">In Progress</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Excel Contract:</th>
                                                    <td className="text-muted">000-000-000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>{/* end card body */}
                            </div>{/* end card */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Active Carrier</h5>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="ps-0" scope="row">Carrer:</th>
                                                    <td className="text-muted">Anna Adame</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Plan Name:</th>
                                                    <td className="text-muted">Basic</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Policy Number:</th>
                                                    <td className="text-muted">000000000</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Group Number:</th>
                                                    <td className="text-muted">GN000-0000</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Claim Number</th>
                                                    <td className="text-muted">CN000-0000</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Authrization Code:</th>
                                                    <td className="text-muted">134679</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Plan Contract:</th>
                                                    <td className="text-muted">987-654-321</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>{/* end card body */}
                            </div>{/* end card */}
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">Financial Summary</h5>
                                    <div className="table-responsive">
                                        <table className="table table-borderless mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="ps-0" scope="row">Total Changes:</th>
                                                    <td className="text-muted">US$ 1,589.32</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Medical Services:</th>
                                                    <td className="text-muted">US$ 5,475.99</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Total Received:</th>
                                                    <td className="text-muted">US$ 6,900.00</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Adjustments:</th>
                                                    <td className="text-muted">US$ 1,175.48</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Insurance Balance</th>
                                                    <td className="text-muted">US$ 2,300.00</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Patient Balance:</th>
                                                    <td className="text-muted">US$ 3,475.99</td>
                                                </tr>
                                                <tr>
                                                    <th className="ps-0" scope="row">Account Balance:</th>
                                                    <td className="text-muted">US$ 1,475.99</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>{/* end card body */}
                            </div>{/* end card */}
                        </div>
                        {/*end col*/}
                        <div className="col-xxl-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <h5 className="card-title mb-3">Patient Information</h5>
                                            <form action="javascript:void(0);">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Account #</label>
                                                            <input type="text" className="form-control" id="firstnameInput" placeholder="Enter your firstname" defaultValue="Dave" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Status</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Patient Class</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Social Security</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="123-45-6789" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Date of Birth</label>
                                                            <input type="date" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="11/18/1985" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">First Name</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="Daisy" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="Martinez" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Address #</label>
                                                            <input type="text" className="form-control" id="firstnameInput" placeholder="Ex. 10810 NW 107av" />
                                                            <input type="text" className="form-control" id="firstnameInput" placeholder="Apt 10, Suite 6" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="cityInput" className="form-label">City</label>
                                                            <input type="text" className="form-control" id="cityInput" placeholder="City" defaultValue="California" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="countryInput" className="form-label">Country</label>
                                                            <input type="text" className="form-control" id="countryInput" placeholder="Country" defaultValue="United States" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="zipcodeInput" className="form-label">Zip
                                                                Code</label>
                                                            <input type="text" className="form-control" minLength={5} maxLength={6} id="zipcodeInput" placeholder="Enter zipcode" defaultValue={90011} />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Home Phone</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="+(1) 987 6543" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Mobile Phone</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="+(1) 987 6543" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Work Phone</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="+(1) 987 6543" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Other Phone</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="+(1) 987 6543" />
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Admition type</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">ICD</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">&nbsp;</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Procedure</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">&nbsp;</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" disabled />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">DRG</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-9">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">&nbsp;</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" disabled />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Workflow</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">User Assigned</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
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
                                        <div className="col-lg-6">
                                            <h5 className="card-title mb-3">Contract &amp; Carrier Information</h5>
                                            <form action="javascript:void(0);">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Facility</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-12">
                                                        <div className="table-responsive">
                                                            <table className="table table-borderless align-middle mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col">COB</th>
                                                                        <th scope="col">Carrier</th>
                                                                        <th scope="col">Address</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="avatar-sm">
                                                                                    <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                                                                        <i className="ri-file-zip-fill" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ms-3 flex-grow-1">
                                                                                    <h6 className="fs-15 mb-0"><a href="javascript:void(0)">Artboard-documents.zip</a>
                                                                                    </h6>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>Zip File</td>
                                                                        <td>4.57 MB</td>
                                                                        <td>
                                                                            <div className="dropdown">
                                                                                <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                                    <i className="ri-equalizer-fill" />
                                                                                </a>
                                                                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                                    <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                                    </li>
                                                                                    <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                                    </li>
                                                                                    <li className="dropdown-divider" />
                                                                                    <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Plan Name</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="Basic" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Policy Number</label>
                                                            <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" defaultValue="000-000-0000" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="lastnameInput" className="form-label">Group Number</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="GN000-0000" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Claim Number</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="CN000-0000" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="phonenumberInput" className="form-label">Autorization Code</label>
                                                            <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="000-000-000" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <hr />
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Active Carrier</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Plan Contract</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Thereshold</label>
                                                            <input type="text" className="form-control" id="firstnameInput" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Percentage</label>
                                                            <input type="text" className="form-control" id="firstnameInput" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-4">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Max Reimbursement</label>
                                                            <input type="text" className="form-control" id="firstnameInput" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="cityInput" className="form-label">Admission Date</label>
                                                            <input type="date" className="form-control" id="cityInput" defaultValue="10/30/2023" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="countryInput" className="form-label">Discharge</label>
                                                            <input type="date" className="form-control" id="countryInput" defaultValue="10/30/2024" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="countryInput" className="form-label">Total Changes</label>
                                                            <input type="text" className="form-control" id="countryInput" defaultValue="1,500.65" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="cityInput" className="form-label">Placement Date</label>
                                                            <input type="date" className="form-control" id="cityInput" defaultValue="10/30/2023" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="countryInput" className="form-label">A/R Aging from DOS</label>
                                                            <input type="date" className="form-control" id="countryInput" />
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Facility Status</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                    {/*end col*/}
                                                    <div className="col-lg-6">
                                                        <div className="mb-3">
                                                            <label htmlFor="firstnameInput" className="form-label">Excel Contract Carrier</label>
                                                            <select className="form-control"><option>--Select--</option></select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*end row*/}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                {/*end card-body*/}
                            </div>{/* end card */}
                            <div className="row" style={{ display: 'none' }}>
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-header align-items-center d-flex">
                                            <h4 className="card-title mb-0  me-2">Recent Activity</h4>
                                            <div className="flex-shrink-0 ms-auto">
                                                <ul className="nav justify-content-end nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-bs-toggle="tab" href="#today" role="tab">
                                                            Today
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-bs-toggle="tab" href="#weekly" role="tab">
                                                            Weekly
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-bs-toggle="tab" href="#monthly" role="tab">
                                                            Monthly
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content text-muted">
                                                <div className="tab-pane active" id="today" role="tabpanel">
                                                    <div className="profile-timeline">
                                                        <div className="accordion accordion-flush" id="todayExample">
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="headingOne">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-2.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Jacqueline Steve
                                                                                </h6>
                                                                                <small className="text-muted">We
                                                                                    has changed 2
                                                                                    attributes on
                                                                                    05:16PM</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        In an awareness campaign, it
                                                                        is vital for people to begin
                                                                        put 2 and 2 together and
                                                                        begin to recognize your
                                                                        cause. Too much or too
                                                                        little spacing, as in the
                                                                        example below, can make
                                                                        things unpleasant for the
                                                                        reader. The goal is to make
                                                                        your text as comfortable to
                                                                        read as possible. A
                                                                        wonderful serenity has taken
                                                                        possession of my entire
                                                                        soul, like these sweet
                                                                        mornings of spring which I
                                                                        enjoy with my whole heart.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="headingTwo">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                    M
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Megan Elmore
                                                                                </h6>
                                                                                <small className="text-muted">Adding
                                                                                    a new event with
                                                                                    attachments -
                                                                                    04:45PM</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        <div className="row g-2">
                                                                            <div className="col-auto">
                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-image-2-line fs-17 text-danger" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-2">
                                                                                        <h6><a href="javascript:void(0);" className="stretched-link">Business
                                                                                            Template
                                                                                            -
                                                                                            UI/UX
                                                                                            design</a>
                                                                                        </h6>
                                                                                        <small>685
                                                                                            KB</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-file-zip-line fs-17 text-info" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-2">
                                                                                        <h6><a href="javascript:void(0);" className="stretched-link">Bank
                                                                                            Management
                                                                                            System
                                                                                            -
                                                                                            PSD</a>
                                                                                        </h6>
                                                                                        <small>8.78
                                                                                            MB</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="headingThree">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapsethree" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    New ticket
                                                                                    received</h6>
                                                                                <small className="text-muted mb-2">User
                                                                                    <span className="text-secondary">Erica245</span>
                                                                                    submitted a
                                                                                    ticket -
                                                                                    02:33PM</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="headingFour">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFour" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                    <i className="ri-user-3-fill" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Nancy Martino
                                                                                </h6>
                                                                                <small className="text-muted">Commented
                                                                                    on
                                                                                    12:57PM</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseFour" className="accordion-collapse collapse show" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                        " A wonderful serenity has
                                                                        taken possession of my
                                                                        entire soul, like these
                                                                        sweet mornings of spring
                                                                        which I enjoy with my whole
                                                                        heart. Each design is a new,
                                                                        unique piece of art birthed
                                                                        into this world, and while
                                                                        you have the opportunity to
                                                                        be creative and make your
                                                                        own style choices. "
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="headingFive">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapseFive" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Lewis Arnold
                                                                                </h6>
                                                                                <small className="text-muted">Create
                                                                                    new project
                                                                                    buildng product
                                                                                    -
                                                                                    10:05AM</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseFive" className="accordion-collapse collapse show" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        <p className="text-muted mb-2">
                                                                            Every team project can
                                                                            have a velzon. Use the
                                                                            velzon to share
                                                                            information with your
                                                                            team to understand and
                                                                            contribute to your
                                                                            project.</p>
                                                                        <div className="avatar-group">
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Christi">
                                                                                <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Frank Hook">
                                                                                <img src="/assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title=" Ruby">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                        R
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="more">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle">
                                                                                        2+
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*end accordion*/}
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="weekly" role="tabpanel">
                                                    <div className="profile-timeline">
                                                        <div className="accordion accordion-flush" id="weeklyExample">
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading6">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse6" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-3.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Joseph Parker
                                                                                </h6>
                                                                                <small className="text-muted">New
                                                                                    people joined
                                                                                    with our company
                                                                                    -
                                                                                    Yesterday</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse6" className="accordion-collapse collapse show" aria-labelledby="heading6" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        It makes a statement, it’s
                                                                        impressive graphic design.
                                                                        Increase or decrease the
                                                                        letter spacing depending on
                                                                        the situation and try, try
                                                                        again until it looks right,
                                                                        and each letter has the
                                                                        perfect spot of its own.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading7">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse7" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-danger">
                                                                                    <i className="ri-shopping-bag-line" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Your order is
                                                                                    placed <span className="badge bg-soft-success text-success align-middle">Completed</span>
                                                                                </h6>
                                                                                <small className="text-muted">These
                                                                                    customers can
                                                                                    rest assured
                                                                                    their order has
                                                                                    been placed - 1
                                                                                    week Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading8">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse8" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                    <i className="ri-home-3-line" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Velzon admin
                                                                                    dashboard
                                                                                    templates layout
                                                                                    upload</h6>
                                                                                <small className="text-muted">We
                                                                                    talked about a
                                                                                    project on
                                                                                    linkedin - 1
                                                                                    week Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse8" className="accordion-collapse collapse show" aria-labelledby="heading8" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                        Powerful, clean &amp; modern
                                                                        responsive bootstrap 5 admin
                                                                        template. The maximum file
                                                                        size for uploads in this
                                                                        demo :
                                                                        <div className="row mt-2">
                                                                            <div className="col-xxl-6">
                                                                                <div className="row border border-dashed gx-2 p-2">
                                                                                    <div className="col-3">
                                                                                        <img src="/assets/images/small/img-3.jpg" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    {/*end col*/}
                                                                                    <div className="col-3">
                                                                                        <img src="/assets/images/small/img-5.jpg" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    {/*end col*/}
                                                                                    <div className="col-3">
                                                                                        <img src="/assets/images/small/img-7.jpg" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    {/*end col*/}
                                                                                    <div className="col-3">
                                                                                        <img src="/assets/images/small/img-9.jpg" className="img-fluid rounded" />
                                                                                    </div>
                                                                                    {/*end col*/}
                                                                                </div>
                                                                                {/*end row*/}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading9">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse9" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-6.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    New ticket
                                                                                    created <span className="badge bg-soft-info text-info align-middle">Inprogress</span>
                                                                                </h6>
                                                                                <small className="text-muted mb-2">User
                                                                                    <span className="text-secondary">Jack365</span>
                                                                                    submitted a
                                                                                    ticket - 2 week
                                                                                    Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading10">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse10" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Jennifer Carter
                                                                                </h6>
                                                                                <small className="text-muted">Commented
                                                                                    - 4 week
                                                                                    Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse10" className="accordion-collapse collapse show" aria-labelledby="heading10" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        <p className="text-muted fst-italic mb-2">
                                                                            " This is an awesome
                                                                            admin dashboard
                                                                            template. It is
                                                                            extremely well
                                                                            structured and uses
                                                                            state of the art
                                                                            components (e.g. one of
                                                                            the only templates using
                                                                            boostrap 5.1.3 so far).
                                                                            I integrated it into a
                                                                            Rails 6 project. Needs
                                                                            manual integration work
                                                                            of course but the
                                                                            template structure made
                                                                            it easy. "</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*end accordion*/}
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="monthly" role="tabpanel">
                                                    <div className="profile-timeline">
                                                        <div className="accordion accordion-flush" id="monthlyExample">
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading11">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse11" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                <div className="avatar-title bg-light text-success rounded-circle">
                                                                                    M
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Megan Elmore
                                                                                </h6>
                                                                                <small className="text-muted">Adding
                                                                                    a new event with
                                                                                    attachments - 1
                                                                                    month
                                                                                    Ago.</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse11" className="accordion-collapse collapse show" aria-labelledby="heading11" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        <div className="row g-2">
                                                                            <div className="col-auto">
                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-image-2-line fs-17 text-danger" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-2">
                                                                                        <h6><a href="javascript:void(0);" className="stretched-link">Business
                                                                                            Template
                                                                                            -
                                                                                            UI/UX
                                                                                            design</a>
                                                                                        </h6>
                                                                                        <small>685
                                                                                            KB</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-file-zip-line fs-17 text-info" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-2">
                                                                                        <h6><a href="javascript:void(0);" className="stretched-link">Bank
                                                                                            Management
                                                                                            System
                                                                                            -
                                                                                            PSD</a>
                                                                                        </h6>
                                                                                        <small>8.78
                                                                                            MB</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <div className="d-flex border border-dashed p-2 rounded position-relative">
                                                                                    <div className="flex-shrink-0">
                                                                                        <i className="ri-file-zip-line fs-17 text-info" />
                                                                                    </div>
                                                                                    <div className="flex-grow-1 ms-2">
                                                                                        <h6><a href="javascript:void(0);" className="stretched-link">Bank
                                                                                            Management
                                                                                            System
                                                                                            -
                                                                                            PSD</a>
                                                                                        </h6>
                                                                                        <small>8.78
                                                                                            MB</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading12">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse12" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-2.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Jacqueline Steve
                                                                                </h6>
                                                                                <small className="text-muted">We
                                                                                    has changed 2
                                                                                    attributes on 3
                                                                                    month
                                                                                    Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse12" className="accordion-collapse collapse show" aria-labelledby="heading12" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        In an awareness campaign, it
                                                                        is vital for people to begin
                                                                        put 2 and 2 together and
                                                                        begin to recognize your
                                                                        cause. Too much or too
                                                                        little spacing, as in the
                                                                        example below, can make
                                                                        things unpleasant for the
                                                                        reader. The goal is to make
                                                                        your text as comfortable to
                                                                        read as possible. A
                                                                        wonderful serenity has taken
                                                                        possession of my entire
                                                                        soul, like these sweet
                                                                        mornings of spring which I
                                                                        enjoy with my whole heart.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading13">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse13" aria-expanded="false">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    New ticket
                                                                                    received</h6>
                                                                                <small className="text-muted mb-2">User
                                                                                    <span className="text-secondary">Erica245</span>
                                                                                    submitted a
                                                                                    ticket - 5 month
                                                                                    Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading14">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse14" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0 avatar-xs">
                                                                                <div className="avatar-title bg-light text-muted rounded-circle">
                                                                                    <i className="ri-user-3-fill" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Nancy Martino
                                                                                </h6>
                                                                                <small className="text-muted">Commented
                                                                                    on 24 Nov,
                                                                                    2021.</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse14" className="accordion-collapse collapse show" aria-labelledby="heading14" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5 fst-italic">
                                                                        " A wonderful serenity has
                                                                        taken possession of my
                                                                        entire soul, like these
                                                                        sweet mornings of spring
                                                                        which I enjoy with my whole
                                                                        heart. Each design is a new,
                                                                        unique piece of art birthed
                                                                        into this world, and while
                                                                        you have the opportunity to
                                                                        be creative and make your
                                                                        own style choices. "
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="accordion-item border-0">
                                                                <div className="accordion-header" id="heading15">
                                                                    <a className="accordion-button p-2 shadow-none" data-bs-toggle="collapse" href="#collapse15" aria-expanded="true">
                                                                        <div className="d-flex">
                                                                            <div className="flex-shrink-0">
                                                                                <img src="/assets/images/users/avatar-7.jpg" className="avatar-xs rounded-circle" />
                                                                            </div>
                                                                            <div className="flex-grow-1 ms-3">
                                                                                <h6 className="fs-14 mb-1">
                                                                                    Lewis Arnold
                                                                                </h6>
                                                                                <small className="text-muted">Create
                                                                                    new project
                                                                                    buildng product
                                                                                    - 8 month
                                                                                    Ago</small>
                                                                            </div>
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div id="collapse15" className="accordion-collapse collapse show" aria-labelledby="heading15" data-bs-parent="#accordionExample">
                                                                    <div className="accordion-body ms-2 ps-5">
                                                                        <p className="text-muted mb-2">
                                                                            Every team project can
                                                                            have a velzon. Use the
                                                                            velzon to share
                                                                            information with your
                                                                            team to understand and
                                                                            contribute to your
                                                                            project.</p>
                                                                        <div className="avatar-group">
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Christi">
                                                                                <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="Frank Hook">
                                                                                <img src="/assets/images/users/avatar-3.jpg" className="rounded-circle avatar-xs" />
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title=" Ruby">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                        R
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a href="javascript: void(0);" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" data-bs-original-title="more">
                                                                                <div className="avatar-xs">
                                                                                    <div className="avatar-title rounded-circle">
                                                                                        2+
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*end accordion*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{/* end card body */}
                                    </div>{/* end card */}
                                </div>{/* end col */}
                            </div>{/* end row */}
                            <div className="card" style={{ display: 'none' }}>
                                <div className="card-body">
                                    <h5 className="card-title">audit</h5>
                                    {/* Swiper */}
                                    <div className="swiper project-swiper mt-n4">
                                        <div className="d-flex justify-content-end gap-2 mb-2">
                                            <div className="slider-button-prev">
                                                <div className="avatar-title fs-18 rounded px-1">
                                                    <i className="ri-arrow-left-s-line" />
                                                </div>
                                            </div>
                                            <div className="slider-button-next">
                                                <div className="avatar-title fs-18 rounded px-1">
                                                    <i className="ri-arrow-right-s-line" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <div className="card profile-project-card shadow-none profile-project-success mb-0">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-15 text-truncate mb-1">
                                                                    <a href="#" className="text-dark">ABC
                                                                        Project Customization</a>
                                                                </h5>
                                                                <p className="text-muted text-truncate mb-0">
                                                                    Last Update : <span className="fw-semibold text-dark">4
                                                                        hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge badge-soft-warning fs-11">
                                                                    Inprogress</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-13 text-muted mb-0">
                                                                            Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    A
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-2.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end card body */}
                                                </div>
                                                {/* end card */}
                                            </div>
                                            {/* end slide item */}
                                            <div className="swiper-slide">
                                                <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-15 text-truncate mb-1">
                                                                    <a href="#" className="text-dark">Client -
                                                                        John</a>
                                                                </h5>
                                                                <p className="text-muted text-truncate mb-0">
                                                                    Last Update : <span className="fw-semibold text-dark">1
                                                                        hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge badge-soft-success fs-11">
                                                                    Completed</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-13 text-muted mb-0">
                                                                            Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-2.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    C
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* end card body */}
                                                </div>{/* end card */}
                                            </div>{/* end slide item */}
                                            <div className="swiper-slide">
                                                <div className="card profile-project-card shadow-none profile-project-info mb-0">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-15 text-truncate mb-1">
                                                                    <a href="#" className="text-dark">Brand logo
                                                                        Design</a>
                                                                </h5>
                                                                <p className="text-muted text-truncate mb-0">
                                                                    Last Update : <span className="fw-semibold text-dark">2
                                                                        hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge badge-soft-warning fs-11">
                                                                    Inprogress</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-13 text-muted mb-0">
                                                                            Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* end card body */}
                                                </div>{/* end card */}
                                            </div>{/* end slide item */}
                                            <div className="swiper-slide">
                                                <div className="card profile-project-card shadow-none profile-project-danger mb-0">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-15 text-truncate mb-1">
                                                                    <a href="#" className="text-dark">Project
                                                                        update</a>
                                                                </h5>
                                                                <p className="text-muted text-truncate mb-0">
                                                                    Last Update : <span className="fw-semibold text-dark">4
                                                                        hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge badge-soft-success fs-11">
                                                                    Completed</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-13 text-muted mb-0">
                                                                            Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end card body */}
                                                </div>
                                                {/* end card */}
                                            </div>
                                            {/* end slide item */}
                                            <div className="swiper-slide">
                                                <div className="card profile-project-card shadow-none profile-project-warning mb-0">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-15 text-truncate mb-1">
                                                                    <a href="#" className="text-dark">Chat
                                                                        App</a>
                                                                </h5>
                                                                <p className="text-muted text-truncate mb-0">
                                                                    Last Update : <span className="fw-semibold text-dark">1
                                                                        hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge badge-soft-warning fs-11">
                                                                    Inprogress</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-13 text-muted mb-0">
                                                                            Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-4.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="/assets/images/users/avatar-5.jpg" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    A
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end card body */}
                                                </div>
                                                {/* end card */}
                                            </div>
                                            {/* end slide item */}
                                        </div>
                                    </div>
                                </div>
                                {/* end card body */}
                            </div>{/* end card */}
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}
                </div>
                <div className="tab-pane fade" id="summary" role="tabpanel">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="card-title flex-grow-1 mb-0">Medical Services - (01) items</h5>
                                <div className="flex-shrink-0">
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#medicalServicesModalgrid">
                                        <i className="ri-add-fill me-1 align-bottom" /> Add
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">CPT Code</th>
                                                    <th scope="col">CPT Description</th>
                                                    <th scope="col">Medical Service</th>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Claim Number</th>
                                                    <th scope="col">Charge Amount</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>12 Dec 2021</td>
                                                    <td>Zip File</td>
                                                    <td>4.57 MB</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i className="ri-equalizer-fill" />
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-edit-fill me-2 align-middle text-muted" />Edit</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                </li>
                                                                <li className="dropdown-divider" />
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end card-body*/}
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="card-title flex-grow-1 mb-0">Adjustments - (01) items</h5>
                                <div className="flex-shrink-0">
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#adjustmentModalgrid">
                                        <i className="ri-add-fill me-1 align-bottom" /> Add
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">CTP Code</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>12 Dec 2021</td>
                                                    <td>Zip File</td>
                                                    <td>4.57 MB</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i className="ri-equalizer-fill" />
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-edit-fill me-2 align-middle text-muted" />Edit</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                </li>
                                                                <li className="dropdown-divider" />
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end card-body*/}
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="card-title flex-grow-1 mb-0">Payments - (01) items</h5>
                                <div className="flex-shrink-0">
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#paymentsModalgrid">
                                        <i className="ri-add-fill me-1 align-bottom" /> Add
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Location</th>
                                                    <th scope="col">Source</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">Method</th>
                                                    <th scope="col">Payment Date</th>
                                                    <th scope="col">Amount</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>12 Dec 2021</td>
                                                    <td>Zip File</td>
                                                    <td>4.57 MB</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i className="ri-equalizer-fill" />
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-edit-fill me-2 align-middle text-muted" />Edit</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                </li>
                                                                <li className="dropdown-divider" />
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end card-body*/}
                    </div>
                    {/*end card*/}
                </div>
                {/*end tab-pane*/}

                <div className="modal fade" id="medicalServicesModalgrid" tabIndex={-1} aria-labelledby="medicalServicesModalgridLabel" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="medicalServicesModalgridLabel">Medical Service</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="javascript:void(0);">
                                    <div className="row g-3">
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">CPT Code</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Medical Service</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Location</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Implant Type</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Charge Amount</label>
                                                <input type="number" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Days Units</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Percentage </label>
                                                <input type="number" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Reimbursement Number</label>
                                                <input type="number" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Service Charge </label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Claim Number</label>
                                                <input type="number" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>{/*end col*/}
                                    </div>{/*end row*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="adjustmentModalgrid" tabIndex={-1} aria-labelledby="adjustmentModalgridLabel" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="adjustmentModalgridLabel">Adjusment</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="javascript:void(0);">
                                    <div className="row g-3">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Location</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Adjusment</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Category</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">CPT Code</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumberInput" className="form-label">Date</label>
                                                <input type="date" className="form-control" id="phonenumberInput" placeholder="Enter date" defaultValue="11/18/1985" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Amount</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>{/*end col*/}
                                    </div>{/*end row*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="paymentsModalgrid" tabIndex={-1} aria-labelledby="paymentsModalgridLabel" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="paymentsModalgridLabel">Payments</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="javascript:void(0);">
                                    <div className="row g-3">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Location</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Payment Source</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Category</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Method</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumberInput" className="form-label">Payment Date</label>
                                                <input type="date" className="form-control" id="phonenumberInput" placeholder="Payment Date" defaultValue="11/18/1985" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Amount</label>
                                                <input type="number" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Transaction Code</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">CPT Code</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumberInput" className="form-label">Posting Date</label>
                                                <input type="date" className="form-control" id="phonenumberInput" placeholder="Posting Date" defaultValue="11/18/1985" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Collector</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Excel Contract</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>{/*end col*/}
                                    </div>{/*end row*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="tab-pane fade" id="audit" role="tabpanel">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5 className="card-title mb-3">Denial Information</h5>
                                    <form action="javascript:void(0);">
                                        <div className="row">

                                            {/*end col*/}
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label htmlFor="firstnameInput" className="form-label">Denial Type</label>
                                                    <select className="form-control"><option>--Select--</option></select>
                                                </div>
                                            </div>
                                            {/*end col*/}
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label htmlFor="firstnameInput" className="form-label">Denial Sub-Type</label>
                                                    <select className="form-control"><option>--Select--</option></select>
                                                </div>
                                            </div>

                                            {/*end col*/}
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label htmlFor="phonenumberInput" className="form-label">Error Code</label>
                                                    <select className="form-control"><option>--Select--</option></select>
                                                </div>
                                            </div>
                                            {/*end col*/}

                                            <div className="col-lg-12">
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" type="checkbox" />
                                                    <label className="form-check-label" htmlFor="formCheck1">
                                                        Bypass account when printing batch letters (x)
                                                    </label>
                                                </div>
                                            </div>
                                            {/*end col*/}

                                            <div className="col-lg-12 mt-3">
                                                <div className="mb-3">
                                                    <label htmlFor="firstnameInput" className="form-label">Patient Responsability Amount</label>
                                                    <input type="text" className="form-control" id="firstnameInput" placeholder="Enter your firstname" defaultValue="Dave" />
                                                </div>
                                            </div>
                                            {/*end col*/}


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

                            </div>
                            {/*end row*/}
                        </div>
                        {/*end card-body*/}
                    </div>
                    {/*end card*/}
                </div>
                {/*end tab-pane*/}

                <div className="tab-pane fade" id="followUp" role="tabpanel">
                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex align-items-center mb-4">
                                <h5 className="card-title flex-grow-1 mb-0">Follow Ups - (01) items</h5>
                                <div className="flex-shrink-0">
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#followUpModalgrid">
                                        <i className="ri-add-fill me-1 align-bottom" /> Add
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Follow Up</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Interface Comment</th>
                                                    <th scope="col">Notes</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>12 Dec 2021</td>
                                                    <td>Zip File</td>
                                                    <td>4.57 MB</td>
                                                    <td>12 Dec 2021</td>
                                                    <td>
                                                        <div className="dropdown">
                                                            <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                <i className="ri-equalizer-fill" />
                                                            </a>
                                                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-edit-fill me-2 align-middle text-muted" />Edit</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                </li>
                                                                <li className="dropdown-divider" />
                                                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*end card-body*/}
                    </div>
                    {/*end card*/}
                </div>
                {/*end tab-pane*/}

                <div className="modal fade" id="followUpModalgrid" tabIndex={-1} aria-labelledby="followUpModalgridLabel" aria-modal="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="followUpModalgridLabel">Follow Up</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form action="javascript:void(0);">
                                    <div className="row g-3">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Follow Up</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Description </label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Interface Comment</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Notes</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Revised Notes To Facility</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumberInput" className="form-label">Next Follow Up</label>
                                                <input type="date" className="form-control" id="phonenumberInput" placeholder="Next Follow Up" defaultValue="11/18/1985" />
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumberInput" className="form-label">Created On</label>
                                                <input type="date" className="form-control" id="phonenumberInput" placeholder="Created On" defaultValue="11/18/1985" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Status</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                <label htmlFor="firstnameInput" className="form-label">Reason</label>
                                                <select className="form-control"><option>--Select--</option></select>
                                            </div>
                                        </div>
                                        <div className="col-xxl-6">
                                            <div>
                                                <label htmlFor="firstName" className="form-label">Description</label>
                                                <input type="text" className="form-control" id="firstName" placeholder="Enter firstname" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="hstack gap-2 justify-content-end">
                                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>{/*end col*/}
                                    </div>{/*end row*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="documents" role="tabpanel">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                <div className="flex-shrink-0">
                                    <input className="form-control d-none" type="file" id="formFile" ref={docFileInputRef} onChange={onDocFileChange} />
                                    <label htmlFor="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom" /> Upload
                                        File</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="table-responsive">
                                        <table className="table table-borderless align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th scope="col">Document Name</th>
                                                    <th scope="col">Document Type</th>
                                                    <th scope="col">Size</th>
                                                    <th scope="col">Upload Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    files.map(({ name, size, type, date }: fileDataInterface) => (
                                                        <tr key={`${name} - ${date}`}>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm">
                                                                        <div className="avatar-title bg-soft-primary text-primary rounded fs-20">
                                                                            <i className={iconMapping[type] || "ri-file-fill"} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="ms-3 flex-grow-1">
                                                                        <h6 className="fs-15 mb-0"><a href="javascript:void(0)">{name}</a>
                                                                        </h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>{type} File</td>
                                                            <td>{size}</td>
                                                            <td>{date}</td>
                                                            <td>
                                                                <div className="dropdown">
                                                                    <a href="javascript:void(0);" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                        <i className="ri-equalizer-fill" />
                                                                    </a>
                                                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-eye-fill me-2 align-middle text-muted" />View</a>
                                                                        </li>
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-edit-fill me-2 align-middle text-muted" />Edit</a>
                                                                        </li>
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</a>
                                                                        </li>
                                                                        <li className="dropdown-divider" />
                                                                        <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }


                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end tab-pane*/}
            </div>
            {/*end tab-content*/}
        </div>
    )
}
