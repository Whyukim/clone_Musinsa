import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, FindPasswordButton } from 'components/FindPage/UserFindPassword/styles';
import { useLocation } from 'react-router-dom';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { MODALAUTHCONFIRM, useUserFindDispatch, useUserFindState } from 'context/UserFindContext';
import UserPassword from 'components/Input/UserPassword';
import { PostHeaderBodyApi } from 'utils/api';
import UserFindPasswordFinishModal from 'components/Modals/UserFindPasswordFinishModal';
import { storageData } from 'utils/storageData';
import { URLquery } from 'utils/URLquery';
import userData from 'data/user.json';
import { getStorage } from 'utils/getStorage';
import { setStorage } from 'utils/setStorage';

const UserFindPasswordChange = () => {
    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();
    const [modal, setModal] = useState(false);
    const { findUserId } = userFind;

    const [password, setPassword] = useState('');
    const [passwordReg, setPasswordReg] = useState(true);
    const [passwordLookButton, setPasswordLookButton] = useState(false);
    const passwordRef = useRef();

    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordConfirmReg, setPasswordConfirmReg] = useState(true);
    const [passwordConfirmLookButton, setPasswordConfirmLookButton] = useState(false);
    const passwordConfirmRef = useRef();

    const [passwordButton, setPasswordButton] = useState(false);
    const [passwordButtonLoading, setPasswordButtonLoading] = useState(false);

    const location = useLocation();
    const query = URLquery(location);

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    // onChange 정규식 검사
    const onChangePassword = useCallback(
        e => {
            const { value } = e.target;
            setPassword(value);

            const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
            if (regExp.test(value)) setPasswordReg(true);
            else setPasswordReg(false);

            if (value === passwordConfirm) setPasswordConfirmReg(true);
            else setPasswordConfirmReg(false);
        },
        [passwordConfirm],
    );

    const onChangePasswordConfirm = useCallback(
        e => {
            const { value } = e.target;
            setPasswordConfirm(value);

            if (password === value) setPasswordConfirmReg(true);
            else setPasswordConfirmReg(false);
        },
        [password],
    );

    // 모달창 Close
    const onCloseModal = useCallback(() => {
        setModal(false);
        changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: false });
    }, []);

    // 버튼 활성화
    useEffect(() => {
        if (
            passwordReg &&
            password.length > 0 &&
            passwordConfirmReg &&
            passwordConfirm.length > 0
        ) {
            setPasswordButton(true);
        } else if (
            (!passwordReg && password.length === 0) ||
            (!passwordConfirmReg && passwordConfirm.length === 0)
        ) {
            setPasswordButton(false);
        }

        if (password !== passwordConfirm) {
            setPasswordButton(false);
        }
    }, [passwordReg, passwordConfirmReg]);

    const onClickChangePassword = useCallback(async () => {
        setPasswordButtonLoading(true);
        if (!passwordButton) return;
        let users = getStorage('user') || userData;
        for (let i = 0; i < users.length; i++) {
            if (users[i].userId === query.token) {
                users[i].userPw = password;
                break;
            }
        }
        setStorage('user', users);
        setModal(true);
        setPasswordButtonLoading(false);
    }, [passwordButton]);

    return (
        <Container>
            <div>
                <h3>새로운 비밀번호를 입력해주세요.</h3>
                <p>
                    아이디 : <strong>{query.token}</strong>
                </p>
                <div>
                    <UserPassword
                        password={password}
                        setPassword={setPassword}
                        onChange={onChangePassword}
                        onFocus={onChangePassword}
                        lookBtn={passwordLookButton}
                        setLookBtn={setPasswordLookButton}
                        dom={passwordRef}
                        reg={passwordReg}
                        placeholder="숫자, 영문, 특수문자 조합 최소 8자"
                        title={false}
                    ></UserPassword>
                    {!passwordReg && <p className="danger-text">8~30자 이내로 입력해 주십시오.</p>}

                    <UserPassword
                        password={passwordConfirm}
                        setPassword={setPasswordConfirm}
                        onChange={onChangePasswordConfirm}
                        onFocus={onChangePasswordConfirm}
                        lookBtn={passwordConfirmLookButton}
                        setLookBtn={setPasswordConfirmLookButton}
                        dom={passwordConfirmRef}
                        reg={passwordConfirmReg}
                        placeholder="비밀번호 재입력"
                        title={false}
                    ></UserPassword>

                    {!passwordConfirmReg && <p className="danger-text">비밀번호가 다릅니다.</p>}
                </div>
                <FindPasswordButton>
                    <button
                        type="button"
                        onClick={onClickChangePassword}
                        className={passwordButton && 'active'}
                    >
                        비밀번호 재설정하기
                        {passwordButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
                    </button>
                </FindPasswordButton>
            </div>
            <UserFindPasswordFinishModal
                show={modal}
                onCloseModal={onCloseModal}
                title="비밀번호가 변경되었습니다."
                content={`${findUserId}`}
                rest={'아이디'}
            ></UserFindPasswordFinishModal>
        </Container>
    );
};

export default UserFindPasswordChange;
