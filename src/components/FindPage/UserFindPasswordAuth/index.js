import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserFindAuth from '../UserFindAuth';
import {
    AUTH,
    SHOWAUTH,
    FINDPASSWORDSHOWMARKINGDATA,
    useUserFindDispatch,
    useUserFindState,
    MOBILE,
} from 'context/UserFindContext';
import { PostHeaderApi, PostHeaderBodyApi } from 'utils/api';
import { AuthUser } from './styles';
import { maskingFunc } from 'utils/masking';
import { storageData } from 'utils/storageData';
import { URLquery } from 'utils/URLquery';
import userData from 'data/user.json';
import { getStorage } from 'utils/getStorage';

const UserFindPasswordAuth = () => {
    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();
    const { auth, emailCheck, phoneCheck, authSuccess } = userFind;

    const navigate = useNavigate();
    const location = useLocation();
    const query = URLquery(location);

    const [authUser, setAuthUser] = useState('');

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    // 개인정보 마킹
    useEffect(() => {
        const asyncFunction = async () => {
            const users = getStorage('user') || userData;
            const user = users.filter(v => v.userId === query.token);

            let answer = maskingFunc.phone(user[0].info.mobile);
            setAuthUser(answer);

            changeDispatch(MOBILE, { mobile: user[0].info.mobile });
        };

        asyncFunction();
    }, []);

    // 아이디 찾기
    useEffect(() => {
        if (auth === 'phoneAuth' && authSuccess && phoneCheck) {
            // 휴대전화로 아이디 찾기
            const asyncFunction = async () => {
                // const data = {
                //     loginId: userId,
                //     phoneNumber: phoneNumber.replaceAll('-', ''),
                // };
                // try {
                //     const result = await PostHeaderBodyApi(
                //         '/api/auth/findPassword',
                //         data,
                //         'phoneCheck',
                //         phoneCheck,
                //     );
                //     const token = result.data.changePasswordToken;
                //     navigate(`/find/password/change?token=${token}`);
                // } catch (error) {
                //     console.log(error);
                // }
            };

            asyncFunction();
        }
    }, [authSuccess, emailCheck, phoneCheck]);

    return (
        <>
            <AuthUser>{authUser}</AuthUser>
            <UserFindAuth></UserFindAuth>
        </>
    );
};

export default UserFindPasswordAuth;
