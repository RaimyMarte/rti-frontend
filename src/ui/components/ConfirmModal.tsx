import { RefObject } from "react"
import { Loading } from "."

interface ConfirmModalProps {
    mutationFn: any
    text: string
    confirmButtonText: string
    modalName: string
    mutationLoading: boolean
    closeButtonRef: RefObject<HTMLButtonElement>
}

export const ConfirmModal = ({ mutationFn, mutationLoading, text, confirmButtonText, modalName, closeButtonRef }: ConfirmModalProps) => {
    return (
        <div className="modal fade zoomIn" id={modalName} tabIndex={-1} aria-hidden="true">
            {mutationLoading ? <Loading /> : null}
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="btn-close" id="deleteRecord-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="mt-2 text-center">
                            {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ width: 100, height: 100 }} /> */}
                            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                <h4>Are you sure ?</h4>
                                <p className="text-muted mx-4 mb-0">{text}</p>
                            </div>
                        </div>
                        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal" ref={closeButtonRef}>Close</button>
                            <button type="button" className="btn w-sm btn-danger " onClick={mutationFn}>{confirmButtonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
