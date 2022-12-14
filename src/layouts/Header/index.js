import React, { useCallback, useState, useRef, useEffect, useTransition } from 'react';
import { HContainer, HDiv, HLogo, HSearch, HUser, CountNum } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getData } from 'utils/getData';
import { deleteData } from 'utils/deleteData';
import {
    DeleteHeaderBodyApi,
    PostHeaderApi,
    PostHeaderBodyApi,
    PostQueryApi,
    GetTokenApi,
} from 'utils/api';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import useInput from 'hooks/useInput';
import { BiSkipPreviousCircle } from 'react-icons/bi';
import FirstModal from 'components/Modals/FirstModal';

import { AiOutlineCamera } from '@react-icons/all-files/ai/AiOutlineCamera';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import { IoMdArrowDropup } from '@react-icons/all-files/io/IoMdArrowDropup';
import { FaCommentsDollar } from 'react-icons/fa';

import { useMainState, useMainDispatch, SEARCH, INIT } from 'context/MainContext';
import { ALL, TITLE } from 'context/MainContext';
import NoticeList from 'components/NoticeList';
import { useMemo } from 'react';
import { BOSKET, useGlobalDispatch, useGlobalState } from 'context/GlobalContext';
import { getStorage } from 'utils/getStorage';
import { setStorage } from 'utils/setStorage';

const Header = props => {
    const token = getData()?.accessToken;
    const [login, setLogin] = useState(getData());
    const [inputValue, onChangeInputValue, setInputValue] = useInput();
    const [search, setSearch] = useState(JSON.parse(localStorage.getItem('keywords')) || []);
    const [open, setOpen] = useState(false);
    const [notice, setNotice] = useState(false);

    const navigate = useNavigate();
    const dispatch = useMainDispatch();

    const basketState = useGlobalState();
    const basketDispatch = useGlobalDispatch();

    //알림 추가, 더미데이터
    const [noticeList, setNoticeList] = useState([]);
    const [shoppingNumber, setShoppingNumber] = useState(login ? login?.baskets.length : 0);

    useEffect(() => {
        let basketsData = getData();
        if (basketsData) setShoppingNumber(basketsData?.baskets.length);
    }, [basketState]);

    const { data: noticeNumber, mutate: noticeMutate } = useSWR(
        token ? '/api/order/orderList' : null,
        url => fetcher(url, token),
        {
            refreshInterval: 0,
        },
    );

    const formSub = useCallback(
        e => {
            e.preventDefault();

            const keyWord = localStorage.getItem('keywords');

            if (!keyWord?.includes(inputValue) || !inputValue === '') {
                setSearch(prev => [...prev, inputValue]);
                const value = [...search, inputValue];
                localStorage.setItem('keywords', JSON.stringify(value));
            }

            const payload = {
                search: inputValue,
            };
            dispatch({ type: SEARCH, payload });
            setInputValue('');
            setOpen(false);

            navigate('/');
        },
        [search, inputValue],
    );

    const onClickDeleteSearchAll = useCallback(() => {
        setSearch([]);
        localStorage.removeItem('keywords');
    }, []);

    const onClickSearchItem = useCallback(
        idx => {
            setInputValue(search[idx]);
        },
        [search],
    );

    const onClickDeleteSearchItem = useCallback(
        idx => {
            const filterItem = search.filter((v, i) => i !== idx);
            setSearch(filterItem);
            localStorage.setItem('keywords', JSON.stringify(filterItem));
        },
        [search],
    );

    const inputOpen = () => {
        setOpen(!open);
    };

    const deleteLogout = useCallback(() => {
        let user = getStorage('user');
        let data = getStorage('data');

        if (user || data) {
            for (let i = 0; i < user.length; i++) {
                if (user[i].id === data.id) {
                    user[i] = data;
                }
            }
            setStorage('user', user);
        }

        const payload = {
            basketCount: 0,
        };
        basketDispatch({ type: BOSKET, payload });

        setShoppingNumber(0);
        deleteData();
        setLogin(false);
        navigate('/');
    }, [login]);

    const goMain = () => {
        dispatch({ type: INIT });
        navigate('/');
    };

    const onClickNotice = useCallback(async () => {
        setNotice(!notice);
        //알림창에 넣을 orderLsit 호출
        const { order } = getStorage('data') || null;
        if (order) setNoticeList(order);
    }, [notice]);

    const noticeDay = useMemo(() => {
        let value;
        let temp = getStorage('user') || null;

        if (temp) {
            temp = temp[0];
            if (temp?.order) {
                value = temp.order[temp.order.length - 1].date;
            }
            const today = new Date();
            const timeValue = new Date(value);

            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);

            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return true;
            }
        }

        return false;
    }, [noticeNumber]);

    return (
        <>
            <HContainer>
                <HDiv>
                    <div>
                        <div onClick={goMain}>
                            <HLogo>MUSINSA</HLogo>
                        </div>
                    </div>
                    <HSearch>
                        <div>
                            <form id="search_form" onSubmit={formSub}>
                                <input
                                    id="search_query"
                                    type="text"
                                    maxLength={30}
                                    autoComplete="off"
                                    onClick={inputOpen}
                                    onChange={onChangeInputValue}
                                    value={inputValue}
                                />
                                <span>
                                    <AiOutlineCamera />
                                </span>
                                <span onClick={formSub}>
                                    <AiOutlineSearch />
                                </span>
                            </form>
                        </div>
                        <article className={open ? 'block' : 'none'}>
                            <dl>
                                <dt>
                                    <h3>최근 검색어</h3>
                                    <button type="button" onClick={onClickDeleteSearchAll}>
                                        전체 삭제
                                    </button>
                                </dt>
                                <dd>
                                    <ul>
                                        {search.length === 0 && (
                                            <li className="no-item">
                                                최근 검색어 내용이 없습니다.
                                            </li>
                                        )}
                                        {search?.map((text, idx) => {
                                            return (
                                                <li key={idx}>
                                                    <a>{text}</a>
                                                    <div className="box-edit">
                                                        <a
                                                            href="#"
                                                            className="move"
                                                            onClick={() => onClickSearchItem(idx)}
                                                        >
                                                            ↖
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="remove"
                                                            onClick={() =>
                                                                onClickDeleteSearchItem(idx)
                                                            }
                                                        >
                                                            X
                                                        </a>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </dd>
                            </dl>
                        </article>
                    </HSearch>

                    <HUser>
                        {login ? (
                            <button className="nowLogin">{login.userId}</button>
                        ) : (
                            <Link to="/login">
                                <button className="notLogin">로그인</button>
                            </Link>
                        )}

                        {login ? (
                            <div>
                                <div className="flex" onClick={onClickNotice}>
                                    <a>알림</a>
                                    {noticeDay && <CountNum>N</CountNum>}
                                </div>
                                <article className={notice ? 'block' : 'none'}>
                                    {noticeList.length > 0 ? (
                                        <>
                                            <button
                                                className="list-button"
                                                type="button"
                                                onClick={onClickNotice}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <title>알림 레이어 닫기</title>
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M13.646 3.646l.708.708L9.707 9l4.647 4.646-.708.708L9 9.707l-4.646 4.647-.708-.708L8.293 9 3.646 4.354l.708-.708L9 8.293l4.646-4.647z"
                                                    ></path>
                                                </svg>
                                            </button>
                                            <p className="list-p">
                                                PC에서는 공지, 구매 정보 알림만 확인하실 수
                                                있습니다. <br />그 외 알림은 앱에서 확인 가능합니다.
                                            </p>
                                            <div className="list-container">
                                                {noticeList.reverse().map(item => (
                                                    <NoticeList key={item.id} item={item} />
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p>
                                                PC에서는 공지, 구매 정보 알림만 확인하실 수
                                                있습니다. <br />그 외 알림은 앱에서 확인 가능합니다.
                                            </p>
                                            <p>등록된 알림이 없습니다.</p>
                                        </>
                                    )}
                                    <span>
                                        <IoMdArrowDropup />
                                    </span>
                                </article>
                            </div>
                        ) : null}

                        <div>
                            <Link to="/mypage/like">좋아요</Link>
                        </div>
                        <div>
                            <Link to="/mypage/cart" className="basket">
                                장바구니 <CountNum>{shoppingNumber ? shoppingNumber : 0}</CountNum>
                            </Link>
                        </div>
                        <div>
                            <Link to="/mypage/orderlist">주문배송조회</Link>
                        </div>
                        {login ? (
                            <div onClick={deleteLogout} className="logOut">
                                로그아웃
                            </div>
                        ) : null}
                    </HUser>
                </HDiv>
            </HContainer>

            {/* <FirstModal show={modalFirst} onCloseModal={onCloseModal}></FirstModal> */}
        </>
    );
};

export default Header;
