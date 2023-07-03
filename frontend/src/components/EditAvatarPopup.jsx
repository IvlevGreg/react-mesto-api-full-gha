import { useEffect, useState } from 'react'
import { PopupWithForm } from './PopupWithForm'

export function EditAvatarPopup({ isOpen, onClose, onUpdateUser }) {
  const [avatar, setAvatar] = useState('')

  const onChangeAvatar = (e) => {
    setAvatar(e.target.value)
  }

  useEffect(() => {
    setAvatar('')
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      avatar,
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
      isOpen={isOpen}
      btnText="Сохранить"
      isDisabled={false}
      onSubmit={handleSubmit}
    >
      <label className="popup-form__label">
        <input
          type="url"
          className="popup-form__input popup-form__input_link"
          name="avatar"
          value={avatar}
          onChange={onChangeAvatar}
          placeholder="Ссылка на автар"
          required
        />
        <span className="popup-form__input-error"></span>
      </label>
    </PopupWithForm>
  )
}
