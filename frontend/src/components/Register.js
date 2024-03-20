import React, { useState } from "react";
import * as auth from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";


const Register = () => {
    const [formData, setFormData] = useState({});
    const [infoToolOpen, setInfoToolOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleCloseInfoTool = () => {
      setInfoToolOpen(false);
      setError(false);
    };
  
    const onRegister = (evt) => {
      evt.preventDefault();
      const { email, password } = formData;
      auth.registerUser(email, password).then((res) => {
        if (res && res.data) {
          navigate("/signin", { state: "success" });
        } else {
          setError(true);
        }
        setInfoToolOpen(true);
      });
    };


    return (
        <section className="register" onSubmit={onRegister}>
            <form className="form" action="#"  noValidate>
                <h2 className="form__title">Regístrate</h2>
                <label className="form__label">

                <input
                    type="email"
                    id="register__email"
                    name="email"
                    className="form__input"
                    placeholder="Correo electrónico"
                    required
                    onChange={handleChange}
                    
                />
                </label>
                <label className="form__label">
                <input
                    type="password"
                    id="register__password"
                    name="password"
                    className="form__input"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                />
                </label>
                <button type="submit" className="form__button">
                    Regístrate
                </button>
                <Link to="/signin" className="form__link">
                    ¿Ya eres miembro? Inicia sesión aquí
                </Link>
            </form>
            <InfoTooltip
                error={error}
                infoToolOpen={infoToolOpen}
                handleClose={handleCloseInfoTool}
            />
        </section>
    );
}

export default Register