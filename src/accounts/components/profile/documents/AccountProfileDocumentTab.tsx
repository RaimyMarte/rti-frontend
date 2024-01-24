import dayjs from "dayjs"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

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

export const AccountProfileDocumentTab = () => {
  const { t } = useTranslation()
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
    <div className="tab-pane fade" id="documents" role="tabpanel">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <h5 className="card-title flex-grow-1 mb-0">{t("Documents")}</h5>
            <div className="flex-shrink-0">
              <input className="form-control d-none" type="file" id="formFile" ref={docFileInputRef} onChange={onDocFileChange} />
              <label htmlFor="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom" />{t("UploadFile")}</label>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">{t("DocumentName")}</th>
                      <th scope="col">{t("DocumentType")}</th>
                      <th scope="col">{t("Size")}</th>
                      <th scope="col">{t("UploadDate")}</th>
                      <th scope="col">{t("Actions")}</th>
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
                          <td>{type} {t("File")}</td>
                          <td>{size}</td>
                          <td>{date}</td>
                          <td>
                            <div className="dropdown">
                              <a href="" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                <i className="ri-equalizer-fill" />
                              </a>
                              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                <li><a className="dropdown-item" href=""><i className="ri-eye-fill me-2 align-middle text-muted" />{t("View")}</a>
                                </li>
                                <li><a className="dropdown-item" href=""><i className="ri-edit-fill me-2 align-middle text-muted" />{t("Edit")}</a>
                                </li>
                                <li><a className="dropdown-item" href=""><i className="ri-download-2-fill me-2 align-middle text-muted" />{t("Download")}</a>
                                </li>
                                <li className="dropdown-divider" />
                                <li><a className="dropdown-item" href=""><i className="ri-delete-bin-5-line me-2 align-middle text-muted" />{t("Delete")}</a>
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
  )
}
