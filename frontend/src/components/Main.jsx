import { useCallback, useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { CardsList } from './CardsList'
import { User } from './User'

export function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  userStatus,
  cardsStatus,
  cards,
  setSelectedCard,
  onCardLike,
  onCardDelete,
}) {
  const user = useContext(CurrentUserContext)

  const onCardClick = useCallback((card) => {
    setSelectedCard(card)
  }, [setSelectedCard])

  return (
    <main className="main">
      <section className="place">
        <User
          user={user}
          status={userStatus}
          handleEditProfileClick={onEditProfile}
          handleAddPlaceClick={onAddPlace}
          handleEditAvatarClick={onEditAvatar}
        />
        <CardsList
          cards={cards}
          onCardClick={onCardClick}
          status={cardsStatus}
          userStatus={userStatus}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      </section>
    </main>
  )
}
