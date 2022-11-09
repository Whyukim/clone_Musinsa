import React, { useCallback, useEffect, useState } from 'react';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { Container, AuthInput, FindIdButton } from 'components/FindPage/UserFindAuth/styles';
import useInput from 'hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { INIT, useUserFindDispatch, useUserFindState } from 'context/UserFindContext';
import { getStorage } from 'utils/getStorage';
import userData from 'data/user.json';

const UserFindPassword = () => {
    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();

    // useContext 초기화
    useEffect(() => {
        dispatch({ type: INIT });
    }, []);

    const navigate = useNavigate();

    const [userId, onChangeUserId, setUserId] = useInput('');
    const [passwordButtonLoading, setPasswordButtonLoading] = useState(false);

    const onClickClear = useCallback(() => {
        setUserId('');
    }, []);

    const onClickCheckPassword = useCallback(async () => {
        setPasswordButtonLoading(true);
        if (userId.length === 0) return;

        const users = getStorage('user') || userData;
        for (let i = 0; i < users.length; i++) {
            if (userId === users[i].userId) {
                return navigate(`choice?token=${users[i].userId}`);
            }
        }

        setPasswordButtonLoading(false);
        alert('회원정보가 없습니다.');
    }, [userId]);

    // key 이벤트
    const onKeyUp = useCallback(
        e => {
            if (e.keyCode === 13) onClickCheckPassword();
        },
        [userId],
    );

    return (
        <Container>
            <div>
                <div>
                    <label style={{ display: 'inline-block', margin: '16px 0 8px' }}>
                        비밀번호를 찾으려는 아이디
                    </label>
                    <AuthInput>
                        <input
                            type="text"
                            value={userId}
                            onChange={onChangeUserId}
                            maxlength="20"
                            onKeyUp={onKeyUp}
                        />
                        <button type="button" className="clearBtn" onClick={onClickClear}>
                            <CancelIcon></CancelIcon>
                        </button>
                    </AuthInput>
                </div>
                <FindIdButton>
                    <button
                        type="button"
                        onClick={onClickCheckPassword}
                        className={userId.length > 0 && 'active'}
                    >
                        다음
                        {passwordButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
                    </button>
                </FindIdButton>
            </div>
        </Container>
    );
};

export default UserFindPassword;
