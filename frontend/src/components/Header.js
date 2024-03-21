import React from 'react';
import logo from '../images/__logoheader.png';
import closeBtn from '../images/__CloseIcon.png';
import menu from '../images/nav-bar.png';
import { Link, useMatch } from 'react-router-dom';

function Header({ handleSignOut, email }) {
    const [open, setOpen] = React.useState(false);

    const handleMenu = () => {
        setOpen(!open);
    }

    const onSignOut = () => {
        handleSignOut();
        setOpen(false);
    };

    return(
        <>
        <header className="header">
            <img className="header__logo" src={logo} alt="Around the U.S." />
            {useMatch("/signin") && (
                <Link to="/signup" className="header__link">
                    Regístrate
                </Link>
            )}

            {useMatch("/signup") && (
                <Link to="/signin" className="header__link">
                    Inicia sesión
                </Link>
            )}
            {useMatch("/") && (
                <>
                <div className={`header__nav-bar ${open && "header__nav-bar_opened"}`}>
                    <span className="header__email">{email}</span>
                    <button className='header__sign-out' onClick={onSignOut}>
                        Cerrar Sesión
                    </button>
                    <div className="header__divider-menu"></div>
                </div>
                {open ? (
                    <img
                    src={closeBtn}
                    alt='Boton cerrar menú'
                    onClick={handleMenu}
                    className='header__close-btn'
                    />
                ) : (
                    <img
                    src={menu}
                    alt='menú deplegable'
                    onClick={handleMenu}
                    className='header__menu'
                    />
                )}
                </>
            )}
        </header>
        </>
    );
}


export default Header;