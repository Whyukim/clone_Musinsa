import React, { useCallback, useState } from 'react';
import { LoginContainer, LookButton } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { useLocation } from 'react-router';
import { URLquery } from 'utils/URLquery';

const UserPassword = ({
    password,
    setPassword,
    onChnage,
    lookBtn,
    setLookBtn,
    dom,
    reg,
    placeholder,
    title,
    validation,
}) => {
    const location = useLocation();
    const { pathname } = location;

    // input clear button
    const onClickClear = useCallback(() => {
        setPassword('');
    }, [setPassword]);

    // password input look
    const onClickLookPassword = useCallback(() => {
        setLookBtn(v => !v);

        if (lookBtn) dom.current.type = 'password';
        else dom.current.type = 'text';
    }, [lookBtn]);

    return (
        <LoginContainer>
            {title && (
                <label>
                    비밀번호
                    <span>필수 입력</span>
                </label>
            )}
            <div>
                <input
                    className={lookBtn ? 'look' : ''}
                    type="password"
                    value={password}
                    onChange={onChnage}
                    ref={dom}
                    placeholder={placeholder}
                />
                {password?.length > 0 && (
                    <button type="button" onClick={() => onClickClear('password')}>
                        <CancelIcon />
                    </button>
                )}
                <LookButton
                    className={lookBtn ? 'look' : ''}
                    type="button"
                    aria-label="비밀번호 보이기"
                    onClick={onClickLookPassword}
                ></LookButton>
            </div>

            {pathname === '/signup' && <p className="login-input__validation">{reg}</p>}
        </LoginContainer>
    );
};

export default UserPassword;
