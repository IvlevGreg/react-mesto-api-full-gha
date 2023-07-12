import { Card } from './Card'
import { CardsLoader } from './CardsLoader'

export function CardsList({
  cards,
  status,
  userStatus,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  if (userStatus === 'error') {
    return <h2>Упс... Не удалось получить данные вашего профиля</h2>
  }

  if (status === 'loading') {
    return (
      <ul className="place__list">
        {[...Array(8)].map((_, i) => (
          <li className="place__item" key={i}>
            <CardsLoader />
          </li>
        ))}
      </ul>
    )
  }

  if (!cards) {
    return <h2>Добавьте карточку!</h2>

  }

  if (status === 'error' || !Array.isArray(cards)) {
    return <h2>Упс... Что-то пошло не так</h2>
  }

  return (
    <ul className="place__list">
      {cards.map((card) => (
        <Card
          key={card._id}
          card={card}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))}
    </ul>
  )
}
