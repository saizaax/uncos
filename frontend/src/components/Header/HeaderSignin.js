import React from "react"
import { Link } from "react-router-dom"

/* Sign-in */
function HeaderSignin() {
  return (
    <div className="info-section__auth">
      <Link to="/auth?type=signup">
        <button className="info-section__btn info-section__register-btn">
          Зарегистрироваться
        </button>
      </Link>
      <Link to="/auth?type=signin">
        <button className="info-section__btn info-section__login-btn">
          Войти
        </button>
      </Link>
      <Link to="/auth">
        <button className="info-section__btn info-section__mobile-btn">
          <i className="ri-login-box-line"></i>
        </button>
      </Link>
    </div>
  )
}

export default HeaderSignin
