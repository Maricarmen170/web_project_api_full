import React , { useContext } from 'react'
import trash from '../images/__trash(1).png'
import icon from '../images/__iconlike.png'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  
const isOwn = props.owner === currentUser._id;

const cardDeleteButtonClassName = `icon-remove ${
  isOwn ? 'icon-remove_active' : ''
}`;

const isLiked = props.card.likes.some(item => item._id === currentUser._id);

const cardLikeButtonClassName = `icon-like ${
  isLiked ? 'icon-like_active': ''
}`;



function handleCardLike(){
  props.onCardLike(props.card)
}

function handleClick() {
  props.onCardClick(props)
}

function handleCardDelete() {
  props.onCardDelete(props.card)
}
  return (
    <div className="element">
    <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
    <div className="remove">
        <img className={cardDeleteButtonClassName} id="trashButton" src={trash} onClick={handleCardDelete} alt="icono de bote de basura" />
    </div>
    <div className="element__footer-photo">
        <p className="element__footer-text">{props.name}</p>
        <img className={cardLikeButtonClassName}  id="likeButton" src={icon} alt="iconolike" onClick={handleCardLike}/>
        <p className="icon-like_number">{props.likes.length}</p>
    </div>
    </div>
  )
}

export default Card