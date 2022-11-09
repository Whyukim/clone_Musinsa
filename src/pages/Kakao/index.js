import React, { useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { KakaoGetQueryApi, PostHeaderApi } from 'utils/api';
import { URLquery } from 'utils/URLquery';
import Cookies from 'js-cookie';
import { useScript } from 'hooks/useScript';
import { useCallback } from 'react';
import userData from 'data/user.json';
import { getStorage } from 'utils/getStorage';
import { setStorage } from 'utils/setStorage';
import { BOSKET, useGlobalDispatch } from 'context/GlobalContext';

const Kakao = () => {
    const kakaoScript = useScript('https://developers.kakao.com/sdk/js/kakao.min.js');

    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

    const basketDispatch = useGlobalDispatch();

    // calllback으로 받은 인가코드
    const navigate = useNavigate();
    const location = useLocation();
    const { code } = URLquery(location);

    const autoLogin = Cookies.get('autoLogin');

    const getToken = useCallback(async () => {
        const payload = qs.stringify({
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
            client_secret: CLIENT_SECRET,
        });
        try {
            // access token 가져오기
            const res = await axios.post('https://kauth.kakao.com/oauth/token', payload);

            // Kakao Javascript SDK 초기화
            window.Kakao.init(REST_API_KEY);
            // access token 설정
            window.Kakao.Auth.setAccessToken(res.data.access_token);

            let data = await window.Kakao.API.request({
                url: '/v2/user/me',
            });

            let users = getStorage('user') || userData;
            console.log(users);
            let login = users.filter(v => v.userId === data.kakao_account.email);

            let params = {};
            if (!login.length) {
                params = {
                    kakao: true,
                    id: users.length + 1,
                    userId: data.kakao_account.email,
                    userPw: '',
                    info: {
                        name: data.properties.nickname,
                        phone: '',
                        mobile: '',
                        address: '',
                    },
                    likes: [],
                    baskets: [],
                    order: [],
                };

                users = [...users, params];
                setStorage('user', users);
            } else {
                params = login[0];

                const payload = {
                    basketCount: login[0].baskets.length,
                };
                basketDispatch({ type: BOSKET, payload });
            }

            sessionStorage.setItem('data', JSON.stringify(params));
            localStorage.removeItem('data');

            const redirect = Cookies.get('redirect');
            if (redirect) {
                navigate(redirect);
                return Cookies.remove('redirect');
            }
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }, [autoLogin, code]);

    useEffect(() => {
        if (kakaoScript === 'ready') getToken();
    }, [kakaoScript]);

    return null;
};

export default Kakao;
