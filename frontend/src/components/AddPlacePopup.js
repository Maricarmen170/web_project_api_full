import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [placeName, setPlaceName] = useState("");
    const [placeLink, setPlaceLink] = useState("");

    useEffect(() => {
      setPlaceName("");
      setPlaceLink("")
  }, [isOpen]);

    function handleSubmit(evt){
        evt.preventDefault()
        if (placeName)
        onAddPlace(placeName, placeLink);
    }
    function onNameChange(evt){
        setPlaceName(evt.target.value)
    }
    function onLinkChange(evt){
        setPlaceLink(evt.target.value)
    }
  return (
    <PopupWithForm title="Nuevo lugar" name="place" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
    <input type="text" name="title" id="title"  className="popup__text" placeholder="Título" minLength="2" maxLength="40" required onChange={onNameChange} value={placeName}/>
    <span className="popup__input-error name-error" id="name-error"></span>
    <input type="url" name="src" id="link"  className="popup__text" placeholder="Enlace a la imagen" minLength="2" maxLength="200" required onChange={onLinkChange} value={placeLink} />
    <span className="popup__input-error about-me-error" id="link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup