import { useEffect, useState } from 'react'
import { PopupWithForm } from './PopupWithForm'

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('')
    setLink('')
  }, [])

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeLink = (e) => {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name,
      link,
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="create-form"
      onClose={onClose}
      isOpen={isOpen}
      btnText="Создать"
      isDisabled={false}
      onSubmit={handleSubmit}
    >
      <label className="popup-form__label">
        <input
          type="text"
          className="popup-form__input popup-form__input_img-name"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={onChangeName}
        />
        <span className="popup-form__input-error"></span>
      </label>

      <label className="popup-form__label">
        <input
          type="url"
          className="popup-form__input popup-form__input_link"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={onChangeLink}
        />
        <span className="popup-form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}
