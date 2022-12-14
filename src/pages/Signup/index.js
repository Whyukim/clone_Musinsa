import UserAddress from 'components/UserAddress';
import UserEmail from 'components/UserEmail';
import UserPassword from 'components/UserPassword';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as CheckIcon } from 'assets/svg/Check.svg';
import { ReactComponent as LogoIcon } from 'assets/svg/Logo.svg';
import { ReactComponent as BackArrow } from 'assets/svg/BackArrow.svg';
import TextModal from 'components/Modals/TextModal';
import {
    Container,
    SignupSection,
    Header,
    SignupInner,
    SignupContainer,
    SignupCheckBox,
    SignupButton,
    KakaoKeyframes,
} from './styles';
import { useUserDispatch, useUserState } from 'context/UserContext';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { URLquery } from 'utils/URLquery';
import { getStorage } from 'utils/getStorage';
import userData from 'data/user.json';
import { setStorage } from 'utils/setStorage';
import itemData from 'data/main.json';

const Signup = () => {
    const user = useUserState();
    const dispatch = useUserDispatch();
    const location = useLocation();
    const url = URLquery(location);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailReg, setEmailReg] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [passwordLookButton, setPasswordLookButton] = useState(false);
    const passwordRef = useRef();

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmReg, setPasswordConfirmReg] = useState(false);
    const [passwordConfirmLookButton, setPasswordConfirmLookButton] = useState(false);
    const passwordConfirmRef = useRef();

    const [checkValue, setCheckValue] = useState({
        checkAll: false,
        checkAgree: false,
        checkTerms: false,
        checkYouth: false,
        checkSns: false,
        count: 0,
    });

    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        mobile1: '',
        mobile2: '',
        mobile3: '',
        phone: true,
        phone1: '',
        phone2: '',
        phone3: '',
        address1: '',
        address2: '',
        address3: '',
    });

    const [modalAuth, setModalAuth] = useState(false);
    const [modalAuthConfirm, setModalAuthConfirm] = useState(false);
    const [modalSignUp, setModalSignUp] = useState(false);

    const [signUpBtn, setSignUpBtn] = useState(false);

    const onCloseModal = useCallback(() => {
        setModalAuth(false);
        setModalAuthConfirm(false);
        setModalSignUp(false);
    }, [user]);

    const onCloseLinkModal = useCallback(() => {
        setModalSignUp(false);

        return navigate(`/login`);
    }, []);

    useEffect(() => {
        if (checkValue.count === 4) {
            setCheckValue(prevState => ({
                ...prevState,
                checkAll: true,
            }));
        } else {
            setCheckValue(prevState => ({
                ...prevState,
                checkAll: false,
            }));
        }
    }, [checkValue.count]);

    // onChange ????????? ??????
    const onChangeEmail = useCallback(e => {
        setEmail(e.target.value);

        const regExp = /^[A-Za-z0-9]{4,11}$/;
        if (regExp.test(e.target.value)) setEmailReg('');
        else setEmailReg('4`11??? ????????? ?????????????????? ????????????.');
    }, []);

    const onChangePassword = useCallback(
        e => {
            setPassword(e.target.value);

            const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            if (regExp.test(e.target.value)) setPasswordReg('');
            else setPasswordReg('??????, ??????, ???????????? ?????? ?????? 8?????? ????????????.');

            if (passwordConfirm.length > 0 && passwordConfirm !== e.target.value)
                setPasswordConfirmReg('???????????? ?????? ????????? ?????? ????????????.');
            else setPasswordConfirmReg('');
        },
        [passwordConfirm],
    );

    const onChangePasswordConfirm = useCallback(
        e => {
            setPasswordConfirm(e.target.value);

            if (password.length > 0 && password !== e.target.value)
                setPasswordConfirmReg('???????????? ?????? ????????? ?????? ????????????.');
            else setPasswordConfirmReg('');
        },
        [password],
    );

    // ???????????? ?????? ?????????
    useEffect(() => {
        if (
            emailReg === '' &&
            passwordReg === '' &&
            passwordConfirmReg === '' &&
            deliveryInfo.name &&
            deliveryInfo.mobile1 &&
            deliveryInfo.mobile2 &&
            deliveryInfo.mobile3 &&
            deliveryInfo.address1 &&
            deliveryInfo.address2 &&
            checkValue.checkAgree &&
            checkValue.checkTerms &&
            checkValue.checkYouth
        ) {
            if (!deliveryInfo.phone) setSignUpBtn(true);
            else if (deliveryInfo.phone1 && deliveryInfo.phone2 && deliveryInfo.phone3)
                setSignUpBtn(true);
            else setSignUpBtn(false);
        } else setSignUpBtn(false);
    }, [emailReg, passwordReg, passwordConfirmReg, deliveryInfo, checkValue]);

    // ?????? ?????? ?????????
    let win;
    function openPop(open) {
        if (win != null) {
            win.close();
        }

        if (open === 'agree')
            win = window.open(
                '/signup/agreement/agree',
                '???????????? ?????? ??? ?????? ?????? ??????',
                'width=500px,height=800px,scrollbars=yes',
            );
        else if (open === 'terms') {
            win = window.open(
                '/signup/agreement/terms',
                '?????????, ????????? ????????? ?????? ??????',
                'width=500px,height=800px,scrollbars=yes',
            );
        } else if (open === 'sns') {
            win = window.open(
                '/signup/agreement/sns',
                '????????? ?????? ??? ????????? ?????? ?????? ??????',
                'width=500px,height=800px,scrollbars=yes',
            );
        }

        win.focus();
    }

    const onClickCheck = useCallback(
        e => {
            const name = e.target.name;

            setCheckValue(prevState => ({
                ...prevState,
                [name]: !checkValue[name],
                count: !checkValue[name] ? checkValue.count + 1 : checkValue.count - 1,
            }));
        },
        [checkValue],
    );

    const onClickCheckAll = useCallback(() => {
        if (checkValue.count < 4) {
            setCheckValue(() => ({
                checkAll: true,
                checkAgree: true,
                checkTerms: true,
                checkYouth: true,
                checkSns: true,
                count: 4,
            }));
        } else {
            setCheckValue(() => ({
                checkAll: false,
                checkAgree: false,
                checkTerms: false,
                checkYouth: false,
                checkSns: false,
                count: 0,
            }));
        }
    }, [checkValue]);

    const onSubmitForm = useCallback(
        async e => {
            e.preventDefault();
            let users = getStorage('user') || userData;

            for (let i = 0; i < users.length; i++) {
                if (users[i].userId === email) {
                    return alert('?????? ???????????? ??????????????????.');
                }
            }

            const params = {
                id: users.length + 1,
                userId: email,
                userPw: password,
                info: {
                    name: `${deliveryInfo.name}`,
                    phone: `${deliveryInfo.phone1}-${deliveryInfo.phone2}-${deliveryInfo.phone3}`,
                    mobile: `${deliveryInfo.mobile1}-${deliveryInfo.mobile2}-${deliveryInfo.mobile3}`,
                    address: `(${deliveryInfo.address1})${deliveryInfo.address2}${deliveryInfo.address3}`,
                },
                likes: [],
                baskets: [],
                order: [],
            };

            users = [...users, params];
            setStorage('user', users);
            setModalSignUp(true);
        },
        [email, password, checkValue, deliveryInfo],
    );

    return (
        <Container>
            <SignupSection>
                <Header>
                    <div>
                        <LogoIcon />
                        <div>
                            <Link to="/login">
                                <button className="back">
                                    <span>?????? ???????????? ??????</span>
                                    <BackArrow></BackArrow>
                                </button>
                            </Link>
                        </div>
                    </div>
                </Header>
                <SignupInner>
                    <form onSubmit={onSubmitForm}>
                        <UserEmail
                            email={email}
                            setEmail={setEmail}
                            onChangeEmail={onChangeEmail}
                            placeholder="??????, ?????? 4-11???"
                            reg={emailReg}
                            setReg={setEmailReg}
                            title={true}
                        ></UserEmail>
                        <UserPassword
                            password={password}
                            setPassword={setPassword}
                            onChnage={onChangePassword}
                            lookBtn={passwordLookButton}
                            setLookBtn={setPasswordLookButton}
                            dom={passwordRef}
                            reg={passwordReg}
                            placeholder="??????, ??????, ???????????? ?????? ?????? 8???"
                            title={true}
                        ></UserPassword>
                        <UserPassword
                            password={passwordConfirm}
                            setPassword={setPasswordConfirm}
                            onChnage={onChangePasswordConfirm}
                            lookBtn={passwordConfirmLookButton}
                            setLookBtn={setPasswordConfirmLookButton}
                            dom={passwordConfirmRef}
                            reg={passwordConfirmReg}
                            placeholder="???????????? ?????????"
                        ></UserPassword>

                        <UserAddress props={{ deliveryInfo, setDeliveryInfo }}></UserAddress>

                        <SignupCheckBox>
                            <div className="all-check">
                                <label
                                    htmlFor="checkAll"
                                    className={checkValue.checkAll && 'active'}
                                >
                                    <input
                                        onClick={e => onClickCheckAll(e)}
                                        style={{ display: 'none' }}
                                        id="checkAll"
                                        type="checkbox"
                                        name="checkAll"
                                        value={checkValue.checkAll}
                                    />
                                    ?????? ?????? ????????????
                                </label>
                            </div>
                            <div className="check">
                                <label htmlFor="checkAgree">
                                    <input
                                        onClick={e => onClickCheck(e)}
                                        style={{ display: 'none' }}
                                        id="checkAgree"
                                        type="checkbox"
                                        name="checkAgree"
                                        value={checkValue.checkAgree}
                                    />
                                    <CheckIcon
                                        stroke={checkValue.checkAgree ? '#0078ff' : '#D1D1D1'}
                                    />
                                    [??????] ???????????? ?????? ??? ?????? ??????
                                </label>
                                <a target="_blank" onClick={() => openPop('agree')}>
                                    ?????????
                                </a>
                            </div>
                            <div className="check">
                                <label htmlFor="checkTerms">
                                    <input
                                        onClick={e => onClickCheck(e)}
                                        style={{ display: 'none' }}
                                        id="checkTerms"
                                        type="checkbox"
                                        name="checkTerms"
                                        value={checkValue.checkTerms}
                                    />
                                    <CheckIcon
                                        stroke={checkValue.checkTerms ? '#0078ff' : '#D1D1D1'}
                                    />
                                    [??????] ?????????, ????????? ????????? ?????? ??????
                                </label>
                                <a target="_blank" onClick={() => openPop('terms')}>
                                    ?????????
                                </a>
                            </div>
                            <div className="check">
                                <label htmlFor="checkYouth">
                                    <input
                                        onClick={e => onClickCheck(e)}
                                        style={{ display: 'none' }}
                                        id="checkYouth"
                                        type="checkbox"
                                        name="checkYouth"
                                        value={checkValue.checkYouth}
                                    />
                                    <CheckIcon
                                        stroke={checkValue.checkYouth ? '#0078ff' : '#D1D1D1'}
                                    />
                                    [??????] ??? 14??? ?????? ?????? ??????
                                </label>
                            </div>
                            <div className="check">
                                <label htmlFor="checkSns">
                                    <input
                                        onClick={e => onClickCheck(e)}
                                        style={{ display: 'none' }}
                                        id="checkSns"
                                        type="checkbox"
                                        name="checkSns"
                                        value={checkValue.checkSns}
                                    />
                                    <CheckIcon
                                        stroke={checkValue.checkSns ? '#0078ff' : '#D1D1D1'}
                                    />
                                    [??????] ????????? ?????? ??? ????????? ?????? ?????? ??????
                                </label>
                                <a target="_blank" onClick={() => openPop('sns')}>
                                    ?????????
                                </a>
                            </div>
                        </SignupCheckBox>

                        <SignupButton>
                            <button
                                type="submit"
                                disabled={!signUpBtn}
                                className={
                                    signUpBtn ? 'signup-button__item active' : 'signup-button__item'
                                }
                            >
                                ????????????
                            </button>
                        </SignupButton>
                    </form>
                </SignupInner>
            </SignupSection>

            <TextModal
                show={modalAuth}
                onCloseModal={onCloseModal}
                content="??????????????? ?????????????????????."
            ></TextModal>
            <TextModal
                show={modalAuthConfirm}
                onCloseModal={onCloseModal}
                content="??????????????? ?????????????????????."
            ></TextModal>
            <TextModal
                show={modalSignUp}
                onCloseModal={onCloseLinkModal}
                content="??????????????? ??????????????????."
            ></TextModal>
        </Container>
    );
};

export default Signup;
