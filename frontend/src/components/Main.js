import React from 'react';
import editIcon from '../images/__Vector (2).png';
import addIcon from '../images/Vector (3).png';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);


    return(
        <section className="body">
            <div className="page">
            <main className="content">
        <section className="profile">
        <img className="profile__image-avatar" src={currentUser.avatar} alt="avatar profile" />
            <div className="profile__image-overlay" >
            <img className="profile__image-button" src={editIcon} alt="icono editar foto" onClick={props.onEditAvatarClick}/>
            </div>
            <div className="profile__info">
                <div className="profile__text">
                <h2 className="profile__name">{currentUser.name} </h2>
                <p className="profile__ocupation">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__edit" onClick={props.onEditProfileClick}>
                <img src={editIcon} alt="icono de lapiz para editar" />
                </button>
            </div>
                <button className="profile__add-button" onClick={props.onAddPlaceClick}>
                <img src={addIcon} alt="icono de agregar" />
                </button>
                
        </section>


        <section className="elements">
            {props.cards.map((card)=>{
                return(
                    <Card
                    owner={card.owner}
                    key={card._id}
                    card={card}
                    name={card.name}
                    link={card.link}
                    likes={card.likes}
                    onCardClick={props.onCardClick}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    />
                );
            })}
        </section>
        </main>
            </div>
        </section>
    );
}

export default Main;