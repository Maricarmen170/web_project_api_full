import React from 'react'
import { useState ,useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
          name,
          about: description,
        });
      }

    function onUserNameChange(evt) {
        evt.preventDefault();
        setName(evt.target.value);
    }

    function onUserDescriptionChange(evt) {
        evt.preventDefault();
        setDescription(evt.target.value);
    }


  return (
    <PopupWithForm title="Editar perfil" name="editar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
    <input type="text" name="name" id="name"  className="popup__text" minLength="2" maxLength="40" required value={name || ''}
    onChange={onUserNameChange} />
    <span className="popup__input-error name-error" id="name-error"></span>
    <input type="text" name="about" id="about"  className="popup__text" minLength="2" maxLength="200" required value={description || ''} 
    onChange={onUserDescriptionChange} />
    <span className="popup__input-error about-me-error" id="about-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup