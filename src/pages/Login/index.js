import UserEmail from 'components/UserEmail';
import UserPassword from 'components/UserPassword';
import useInput from 'hooks/useInput';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GetApi, PostApi } from 'utils/api';
import { getData } from 'utils/getData';
import {
    Container,
    LoginSection,
    Header,
    LoginInner,
    LoginButton,
    LoginMember,
    LoginCheck,
    FindLogin,
    KakaoLogIn,
    SignupLink,
} from './styles';
import { ReactComponent as KakaoIcon } from 'assets/svg/Kakao.svg';
import Kakao from 'pages/Kakao';
import { URLquery } from 'utils/URLquery';
import Cookies from 'js-cookie';
import userData from 'data/user.json';
import { BOSKET, useGlobalDispatch, useGlobalState } from 'context/GlobalContext';
import { setStorage } from 'utils/setStorage';
import { getStorage } from 'utils/getStorage';

const LogIn = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const navigate = useNavigate();

    const basketState = useGlobalState();
    const basketDispatch = useGlobalDispatch();

    const [login, setLogin] = useState(getData());

    const [email, onChangeEmail, setEmail] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const [passwordLookButton, setPasswordLookButton] = useState(false);
    const passwordRef = useRef();

    const [autoLoginCheck, setAutoLoginCheck] = useState(
        Cookies.get('autoLogin') === 'false' || Cookies.get('autoLogin') === undefined
            ? false
            : true,
    );
    const [keyframesClass, setKeyframesClass] = useState('');

    useEffect(() => {
        let users = getStorage('user') || userData;
        setStorage('user', users);
    }, []);

    // auto Login Toggle button
    const toggleAutoLogin = useCallback(
        e => {
            const value = e.target.className;
            setAutoLoginCheck(v => !v);

            if (value === 'hide') setKeyframesClass('active');
            else setKeyframesClass('hide');
        },
        [setAutoLoginCheck, setKeyframesClass],
    );

    // onClick login button event
    const onSubmitForm = useCallback(
        async e => {
            e.preventDefault();

            if (!email || !email.trim()) return alert('???????????? ????????? ?????????.');
            if (!password || !password.trim()) return alert('??????????????? ????????? ?????????.');

            let users = getStorage('user') || userData;

            let login = [];
            for (let i = 0; i < users.length; i++) {
                if (users[i].userId === email && users[i].userPw === password) {
                    login = [users[i]];
                    break;
                }
            }

            if (login.length) {
                if (autoLoginCheck) {
                    localStorage.setItem('data', JSON.stringify(...login));
                    sessionStorage.removeItem('data');
                } else {
                    sessionStorage.setItem('data', JSON.stringify(...login));
                    localStorage.removeItem('data');
                }

                const payload = {
                    basketCount: login[0].baskets.length,
                };
                basketDispatch({ type: BOSKET, payload });

                Cookies.set('autoLogin', autoLoginCheck);
                setLogin(true);

                const redirect = Cookies.get('redirect');
                if (redirect) {
                    navigate(redirect);
                    return Cookies.remove('redirect');
                }

                return navigate('/');
            } else {
                alert('???????????? ?????????????????????.');
            }
        },
        [email, password, autoLoginCheck],
    );

    const onClickTest = useCallback(() => {
        let users = getStorage('user') || userData;
        let login = users.filter(v => v.userId === 'test');

        if (login) {
            if (autoLoginCheck) {
                localStorage.setItem('data', JSON.stringify(...login));
                sessionStorage.removeItem('data');
            } else {
                sessionStorage.setItem('data', JSON.stringify(...login));
                localStorage.removeItem('data');
            }

            const payload = {
                basketCount: login[0].baskets.length,
            };
            basketDispatch({ type: BOSKET, payload });

            Cookies.set('autoLogin', autoLoginCheck);
            setLogin(true);

            const redirect = Cookies.get('redirect');
            if (redirect) {
                navigate(redirect);
                return Cookies.remove('redirect');
            }

            return navigate('/');
        } else {
            alert('???????????? ?????????????????????.');
        }
    }, []);

    const kakaoLoginButton = useCallback(() => {
        Cookies.set('autoLogin', autoLoginCheck);
        window.location.href = KAKAO_AUTH_URL;
    }, [autoLoginCheck]);

    if (login) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <LoginSection>
                <Header>?????????</Header>
                <LoginInner>
                    <form onSubmit={onSubmitForm}>
                        <UserEmail
                            email={email}
                            setEmail={setEmail}
                            onChangeEmail={onChangeEmail}
                            placeholder="?????????"
                            title={false}
                        ></UserEmail>

                        <UserPassword
                            password={password}
                            setPassword={setPassword}
                            onChnage={onChangePassword}
                            lookBtn={passwordLookButton}
                            setLookBtn={setPasswordLookButton}
                            dom={passwordRef}
                            placeholder="????????????"
                            title={false}
                            validation={false}
                        ></UserPassword>
                        <LoginButton>
                            <button
                                type="button"
                                onClick={onClickTest}
                                className="login-button__item"
                            >
                                TEST ???????????? ?????????
                            </button>
                            <button type="submit" className="login-button__item">
                                ?????????
                            </button>
                        </LoginButton>
                        <LoginMember>
                            <LoginCheck>
                                <label
                                    onClick={e => toggleAutoLogin(e)}
                                    className={autoLoginCheck ? 'active' : 'hide'}
                                >
                                    ???????????????
                                </label>
                                <div className={keyframesClass}>
                                    ?????? ?????? ????????? ?????? ?????? ??????????????? ??????????????????.
                                </div>
                            </LoginCheck>
                            <FindLogin>
                                <li>
                                    <Link to="/find/id">????????? ??????</Link>
                                </li>
                                <li>
                                    <Link to="/find/password">???????????? ??????</Link>
                                </li>
                            </FindLogin>
                        </LoginMember>
                    </form>
                    <div>
                        <KakaoLogIn
                            className="login-button__item login-button__item--kakao"
                            onClick={kakaoLoginButton}
                        >
                            <KakaoIcon />
                            ????????? ?????????
                        </KakaoLogIn>
                    </div>
                </LoginInner>
                <SignupLink>
                    <Link to="/signup">????????????</Link>
                </SignupLink>
            </LoginSection>
        </Container>
    );
};

export default LogIn;
