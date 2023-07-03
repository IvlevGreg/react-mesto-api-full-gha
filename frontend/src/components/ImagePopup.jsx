import classNames from 'classnames'
import { useRef } from 'react'

export function ImagePopup({ card, className, onClose }) {
  const popupRef = useRef(null)
  if (!card) return null

  return (
    <div
      className={classNames(
        'popup',
        'popup_card',
        { popup_opened: card },
        className
      )}
      ref={popupRef}
      onMouseDown={(evt) => {
        if (evt.target === popupRef.current) onClose()
      }}
    >
      <div className="popup__container popup__container_card">
        <button
          type="button"
          className="close-button popup__close-button popup__close-button_card"
          onClick={onClose}
        ></button>
        <img src={card?.link} alt={card?.name} className="popup__img" />
        <h2 className="popup__name">{card?.name}</h2>
      </div>
    </div>
  )
}
