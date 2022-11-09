import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, RadioItem, RadioButton, FindIdButton } from './styles';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import {
    useUserFindDispatch,
    useUserFindState,
    MODALAUTH,
    MODALAUTHCONFIRM,
    AUTH,
} from 'context/UserFindContext';
import TextModal from 'components/Modals/TextModal';
import UserFindAuthEmail from '../UserFindAuthEmail';
import UserFindAuthPhone from '../UserFindAuthPhone';
import { useLocation, useNavigate, useParams } from 'react-router';
import { URLquery } from 'utils/URLquery';

const UserFindAuth = () => {
    const titleArray = ['아이디 찾기', '비밀번호 찾기'];
    const pageURL = Object.values(useParams())[0];
    const navigate = useNavigate();
    const location = useLocation();
    const query = URLquery(location);

    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();
    const { showAuth, findButtonLoading } = userFind;

    const [findIdButton, setFindIdButton] = useState(false);
    const [active, setActive] = useState(false);

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    const onClickCheckId = useCallback(async () => {
        if (!active) return;

        if (pageURL === 'id') {
            changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: true });
        } else navigate(`/find/password/change?token=${query.token}`);
    }, [active]);

    // 버튼 활성화
    useEffect(() => {
        if (active) setFindIdButton(true);
    }, [active]);

    return (
        <>
            <Container>
                <div>
                    {(showAuth === 'all' || showAuth === 'phoneAuth') && (
                        <RadioItem>
                            <RadioButton>
                                <label htmlFor="phoneAuth" className="radio-label active">
                                    휴대전화
                                </label>
                                <input type="radio" value="phoneAuth" id="phoneAuth" name="auth" />
                            </RadioButton>

                            <UserFindAuthPhone setActive={setActive} />
                        </RadioItem>
                    )}
                </div>

                <FindIdButton>
                    <button
                        type="button"
                        onClick={onClickCheckId}
                        className={findIdButton && 'active'}
                    >
                        {pageURL === 'id' ? titleArray[0] : titleArray[1]}
                        {findButtonLoading && <LoadingIcon className="loading"></LoadingIcon>}
                    </button>
                </FindIdButton>
            </Container>
        </>
    );
};

export default UserFindAuth;
