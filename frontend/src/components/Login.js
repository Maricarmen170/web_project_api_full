import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

const Login = ({ handleLogin }) => {
    const [formData, setFormData] = React.useState({});
    const [infoToolOpen, setInfoToolOpen] = React.useState(null);
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
      navigate("/signin", { state: {} });
    };

  
    const onLogin = (e) => {
      const { email, password } = formData;
      e.preventDefault();
      auth
        .authorize(email, password)
        .then((data) => {
          if (data.token) {
            setFormData({ email: "", password: "" });
            navigate("/");
            handleLogin();
          }
        })
        .catch((err) => {
          setInfoToolOpen(true);
          setFormData({ email: "", password: "" });
          navigate("/signin", { state: { error: err } });
          handleLogin();
          console.log(err);
        });
    };

    return (
        <section className="login">
            <form className="form" action="#" onSubmit={onLogin} noValidate>
                <h2 className="form__title">Inicia sesión</h2>
                <label className="form__label">
                <input
                    type="email"
                    name="email"
                    className="form__input"
                    placeholder="Correo Electrónico"
                    required
                    onChange={handleChange}
                />
                </label>
                <label className="form__label">
                <input
                    type="password"
                    name="password"
                    className="form__input"
                    placeholder="Contraseña"
                    required
                    onChange={handleChange}
                />
                </label>
                <button type="submit" className="form__button">
                    Inicia Sesión
                </button>
                <Link to="/signup" className="form__link">
                    ¿Aún no eres miembro? Regístrate aquí
                </Link>
            </form>
            <InfoTooltip
                error={true}
                infoToolOpen={infoToolOpen}
                handleClose={handleCloseInfoTool}
            />
        </section>
    );
};

export default Login;