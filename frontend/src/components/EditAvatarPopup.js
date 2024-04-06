import React, { useRef, useContext }from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const currentUser = useContext(CurrentUserContext);
    const avatar = useRef(currentUser.avatar)

    function handleSubmit(evt){
        evt.preventDefault();
        onUpdateAvatar(avatar.current);
    }
  return (
    <PopupWithForm title="Actualizar foto de perfil" name="avatar" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
    <input type="url" name="src" id="src"  className="popup__text" minLength="2" maxLength="40" required onChange={(evt)=> { avatar.current = evt.target.value;}}/>
    <span className="popup__input-error about-me-error" id="src-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup