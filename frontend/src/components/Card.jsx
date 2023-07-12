import classNames from 'classnames'
import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import IconRemoveCard from '../images/icons/icon-remove-card.svg'

export function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const { likes, link, name, _id } = card

  const isOwn = card.owner === currentUser._id
  const isLiked = card.likes?.some((like) => like === currentUser._id)

    const handleCardClick = () => onCardClick(card)
  const handleLikeClick = () => onCardLike(card, isLiked)
  const handleDeleteClick = () => onCardDelete(_id)
  return (
    <li className="place__item">
      {isOwn && (
        <button type="button" className="remove-button place__remove-button">
          <img
            className="remove-button__img"
            src={IconRemoveCard}
            alt="Удалить карточку"
            onClick={handleDeleteClick}
          />
        </button>
      )}

      <button
        type="button"
        onClick={handleCardClick}
        className="place__open-popup-button"
      >
        <img src={link} alt={name} className="place__img" />
      </button>

      <div className="place__content">
        <h2 className="place__name">{name}</h2>
        <div>
          <button
            type="button"
            className={classNames('like-button', 'place__like-button', {
              'like-button_active': isLiked,
            })}
            onClick={handleLikeClick}
          ></button>
          <p className="place__like-amount">{likes.length}</p>
        </div>
      </div>
    </li>
  )
}
