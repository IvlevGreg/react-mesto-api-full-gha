import classNames from 'classnames'
import { useRef } from 'react'

export function InfoTooltip({ isOpen, className, onClose, error = '' }) {
  const popupRef = useRef(null)

  if (!isOpen) return null
  return (
    <div
      className={classNames(
        'popup',
        'popup_card',
        { popup_opened: isOpen },
        className
      )}
      ref={popupRef}
      onMouseDown={(evt) => {
        if (evt.target === popupRef.current) onClose()
      }}
    >
      <div className="popup__container popup__container_status">
        <button
          type="button"
          className="close-button popup__close-button"
          onClick={onClose}
        />
        <div
          className={classNames(
            'popup__result-img',

            { 'popup__result-img_success': !error },
            { 'popup__result-img_error': error },
            className
          )}
        />
        <h2 className="popup__subtitle">
          {!error
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  )
}
