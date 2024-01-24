import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TwoFactorAuthConfigStep1, TwoFactorAuthConfigStep2 } from '.';

export const TwoFactorAuthConfigModal = () => {
  const { t } = useTranslation()

  const [tab, setTab] = useState(1)

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleGoToFirstStep = () => setTab(1)
  const handleNextStep = () => setTab(prev => prev + 1)
  const handleBackStep = () => setTab(prev => prev - 1)

  return (
    <div className="modal fade" id="twoFactorAuthConfigModal" tabIndex={-1} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t("ConfigureTFA")}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>

          {
            tab === 1
              ? <TwoFactorAuthConfigStep1 closeButtonRef={closeButtonRef} handleNextStep={handleNextStep} />
              : tab === 2
                ? <TwoFactorAuthConfigStep2 handleGoToFirstStep={handleGoToFirstStep} closeButtonRef={closeButtonRef} handleBackStep={handleBackStep} />
                : null
          }
        </div>
      </div>
    </div >
  )
}