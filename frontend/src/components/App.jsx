import {useCallback, useEffect, useState} from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import {api} from '../utils/Api'
import {Footer} from './Footer'
import {Header} from './Header'
import {ImagePopup} from './ImagePopup'
import {Main} from './Main'
import {EditProfilePopup} from './EditProfilePopup'
import {EditAvatarPopup} from './EditAvatarPopup'
import {AddPlacePopup} from './AddPlacePopup'
import {ConfirmPopup} from './ConfirmPopup'
import {useNavigate, Route, Routes} from 'react-router-dom'
import {ProtectedRouteElement} from './ProtectedRouteElement'
import {Login} from './Login'
import {Register} from './Register'
import {InfoTooltip} from './InfoTooltip'
import {authApi} from '../utils/AuthApi'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
    const [infoTooltipError, setInfoTooltipError] = useState('')
    const [activeRemoveCardId, setActiveRemoveCardId] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userStatus, setUserStatus] = useState('initial')
    const [cards, setCards] = useState(null)
    const [cardsStatus, setCardsStatus] = useState('initial')
    const [selectedCard, setSelectedCard] = useState(null)

    const navigate = useNavigate()

    const handleUserCheck = useCallback(() => {

        authApi
            .getUsersMe()
            .then((res) => {
                setIsLoggedIn(true)
                setUserEmail(res.email)
                navigate('/')
            })
            .catch((error) => {
                setIsLoggedIn(false)
                throw new Error(error)
            })
    }, [navigate])

    useEffect(() => {
        handleUserCheck()
    }, [handleUserCheck])

    useEffect(() => {
        if (!isLoggedIn) return
        setUserStatus('loading')
        setCardsStatus('loading')
        api
            .getUserdata()
            .then((data) => {
                setUserStatus('success')
                setCurrentUser(data)

                api
                    .getInitialCards()
                    .then((data) => {
                        setCards(data.data)
                        setCardsStatus('success')
                    })
                    .catch(() => setCardsStatus('error'))
            })
            .catch(() => setUserStatus('error'))
    }, [isLoggedIn])


    const handleLogOut = useCallback(
        () => {
            authApi.postSignOut().then(() => {
                setIsLoggedIn(null)
            }).catch((e) => console.error(e))


        },
        []
    )

    const handleEditProfileClick = useCallback(
        () => setIsEditProfilePopupOpen(true),
        []
    )
    const handleAddPlaceClick = useCallback(
        () => setIsAddPlacePopupOpen(true),
        []
    )
    const handleEditAvatarClick = useCallback(
        () => setIsEditAvatarPopupOpen(true),
        []
    )
    const handleRemoveCardClick = useCallback((id) => {
        setActiveRemoveCardId(id)
        setIsConfirmPopupOpen(true)
    }, [])

    const closeAllPopups = useCallback(() => {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsConfirmPopupOpen(false)
        setIsInfoTooltipOpen(false)

        setSelectedCard(null)
    }, [])

    const handleCardLike = useCallback((currentCard, isLiked) => {
        api
            .changeLikeCardStatus(currentCard._id, isLiked)
            .then(({data:newCard}) => {
                setCards((state) =>
                    state.map((card) => (card._id === currentCard._id ? newCard : card))
                )
            })
            .catch((error) => {
                throw new Error(error)
            })
    }, [])

    const handleCardDelete = useCallback(() => {
        api
            .removeCard(activeRemoveCardId)
            .then(() => {
                setCards((state) =>
                    state.filter((card) => card._id !== activeRemoveCardId)
                )
                closeAllPopups()
            })
            .catch((error) => {
                throw new Error(error)
            })
    }, [activeRemoveCardId, closeAllPopups])

    const handleUpdateUser = useCallback((user) => {
        api
            .updateUserData(user)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((error) => {
                throw new Error(error)
            })
    }, [closeAllPopups])

    const handleAddPlaceSubmit = useCallback(
        (card) => {
            api
                .postNewCard(card)
                .then(({data:newCard}) => {
                    setCards([newCard, ...cards])
                    closeAllPopups()
                })
                .catch((error) => {
                    throw new Error(error)
                })
        },
        [cards, closeAllPopups]
    )

    const handleUpdateAvatar = useCallback((user) => {
        api
            .updateUserImg(user)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((error) => {
                throw new Error(error)
            })
    }, [closeAllPopups])

    const handleSignUp = useCallback((user) => {
        setInfoTooltipError('')
        authApi
            .postSignUp(user)
            .then(() => navigate('/sign-in'))
            .catch((error) => {
                setInfoTooltipError('Некорректно заполнено одно из полей')

                throw new Error(error)
            })
            .finally(() => setIsInfoTooltipOpen(true))
    }, [navigate])

    const handleSignIn = useCallback((user) => {
        setInfoTooltipError('')
        authApi
            .postSignIn(user)
            .then((res) => {
                setIsLoggedIn(true)
                navigate('/')
            })
            .catch((error) => {
                setInfoTooltipError('Некорректно заполнено одно из полей')

                throw new Error(error)
            })
    }, [navigate])

    const MainElement = (
        <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            setSelectedCard={setSelectedCard}
            userStatus={userStatus}
            cards={cards}
            cardsStatus={cardsStatus}
            onCardLike={handleCardLike}
            onCardDelete={handleRemoveCardClick}
        />
    )

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} email={userEmail}/>

            <Routes>
                <Route path="/sign-in" element={<Login onSubmit={handleSignIn}/>}/>
                <Route path="/sign-up" element={<Register onSubmit={handleSignUp}/>}/>
                <Route
                    path="/"
                    element={
                        <ProtectedRouteElement loggedIn={isLoggedIn}>
                            {MainElement}
                        </ProtectedRouteElement>
                    }
                />
                <Route path="*" element={<h1>Oops!... Not found</h1>}/>
                <Route
                    path="/log-out"
                    element={
                        <ProtectedRouteElement loggedIn={isLoggedIn}>
                            <h1> log-out</h1>
                        </ProtectedRouteElement>
                    }
                />
            </Routes>
            <Footer/>

            {/* попапы инициализируются только если данные юзера успешно подгружены*/}
            {userStatus === 'success' && (
                <>
                    <EditProfilePopup
                        onClose={closeAllPopups}
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        onClose={closeAllPopups}
                        isOpen={isEditAvatarPopupOpen}
                        onUpdateUser={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                        onClose={closeAllPopups}
                        isOpen={isAddPlacePopupOpen}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ConfirmPopup
                        onClose={closeAllPopups}
                        isOpen={isConfirmPopupOpen}
                        submitAction={handleCardDelete}
                    />
                </>
            )}

            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopups}
                error={infoTooltipError}
            />

            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        </CurrentUserContext.Provider>
    )
}

export default App
