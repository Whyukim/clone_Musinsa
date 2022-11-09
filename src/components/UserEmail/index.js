import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { LoginContainer } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';

const UserEmail = ({ email, setEmail, onChangeEmail, placeholder, title, reg, setReg }) => {
    const location = useLocation();
    const { pathname } = location;

    // input clear button
    const onClickClear = useCallback(() => {
        setEmail('');
        setReg(false);
    }, [setEmail]);

    return (
        <>
            <LoginContainer>
                {title && (
                    <label>
                        아이디
                        <span>필수 입력</span>
                    </label>
                )}
                <div>
                    <input
                        className="email"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder={placeholder}
                    />
                    {email?.length > 0 && (
                        <button type="button" onClick={() => onClickClear()}>
                            <CancelIcon />
                        </button>
                    )}
                </div>

                {pathname === '/signup' && <p className="login-input__validation">{reg}</p>}
            </LoginContainer>
        </>
    );
};

export default UserEmail;
