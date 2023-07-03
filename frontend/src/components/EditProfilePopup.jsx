import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { PopupWithForm } from './PopupWithForm'

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setName(currentUser?.name)
    setDescription(currentUser?.about)
  }, [currentUser, isOpen])

  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-form"
      onClose={onClose}
      isOpen={isOpen}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup-form__label">
        <input
          type="text"
          className="popup-form__input popup-form__input_name"
          name="name"
          placeholder="Имя"
          required
          value={name}
          onChange={onChangeName}
          minLength="2"
          maxLength="40"
        />
        <span className="popup-form__input-error"></span>
      </label>

      <label className="popup-form__label">
        <input
          type="text"
          className="popup-form__input popup-form__input_descr"
          name="description"
          placeholder="Описание"
          required
          value={description}
          onChange={onChangeDescription}
          minLength="2"
          maxLength="200"
        />
        <span className="popup-form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}
