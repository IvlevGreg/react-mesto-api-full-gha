import { UserLoader } from './UserLoader'

export function User({
  user,
  status,
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
}) {
  if (status === 'loading') {
    return <UserLoader className="h-w-100" />
  }

  if (status === 'error' || !user) {
    return <h2>Упс... Что-то пошло не так</h2>
  }

  const { avatar, name, about } = user

  return (
    <section className="profile">
      <button className="profile__img-btn" onClick={handleEditAvatarClick}>
        <img className="profile__img" src={avatar} alt={name} />
      </button>

      <div className="profile__text-container">
        <h1 className="profile__title">{name}</h1>
        <button
          type="button"
          className="profile__edit-button edit-button"
          onClick={handleEditProfileClick}
        ></button>
        <p className="profile__descr">{about}</p>
      </div>

      <button
        type="button"
        className="add-button profile__add-button"
        onClick={handleAddPlaceClick}
      ></button>
    </section>
  )
}
