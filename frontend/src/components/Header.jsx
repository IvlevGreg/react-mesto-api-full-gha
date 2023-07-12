import logo from '../images/logo/logo.svg'
import {Link, Route, Routes} from "react-router-dom";
import {ProtectedRouteElement} from "./ProtectedRouteElement";


export function Header({isLoggedIn, handleLogOut, email,userStatus}) {
    return <header className='header'>
        <a href='/' className='logo'>
            <img
                className='logo__img'
                src={logo}
                alt='логотип Место'
            />
        </a>

        <Routes>
            <Route path="/sign-up" element={<Link className='header__link header__text' to='/sign-in'>Войти</Link>}/>
            <Route path="/sign-in"
                   element={<Link className='header__link header__text' to='/sign-up'>Регистрация</Link>}/>
            <Route
                path="/"
                element={
                    <ProtectedRouteElement loggedIn={isLoggedIn} userStatus={userStatus}>
                        <div className='header__user'>
                            {email && <div className='header__text header__email'>{email}</div>}
                            <Link className='header__text header__link header__text_gray' to='/sign-in'
                                  onClick={handleLogOut}>Выйти</Link>
                        < /div>
                    </ProtectedRouteElement>
                }
            />
        </Routes>
    </header>
}
