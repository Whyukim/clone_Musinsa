import React, { useState } from 'react';
import MyHeader from 'components/Mypage/Header';
import { StyleNav, MypageLayout } from './styles';
import { Routes, Route, NavLink, useParams, Navigate, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { getData } from 'utils/getData';
import MainHeader from 'layouts/Header';
import MainFooter from 'layouts/Footer';
import DialLog from 'layouts/DialLog';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';

const OrderList = loadable(() => import('components/Mypage/OrderList'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Like = loadable(() => import('components/Mypage/Like'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Cart = loadable(() => import('components/Mypage/Cart'), {
    fallback: (
        <div className="loading">
            <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
        </div>
    ),
});

const Mypage = () => {
    const location = useLocation();

    const [data, setData] = useState(() => getData());
    const pageURL = Object.values(useParams())[0];

    if (pageURL === '') {
        return <Navigate to="/mypage/orderlist" />;
    } else if (data === null) {
        const { pathname } = location;
        Cookies.set('redirect', pathname);
        return <Navigate to="/login" />;
    }

    return (
        <>
            <MainHeader />
            <MypageLayout>
                <MyHeader />
                {
                    <StyleNav>
                        <h3>나의 쇼핑 활동</h3>
                        <ul>
                            <li>
                                <NavLink
                                    exact
                                    to="/mypage/orderlist"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'black' : 'gray',
                                    })}
                                >
                                    주문 내역 조회
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/mypage/like"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'black' : 'gray',
                                    })}
                                >
                                    좋아요
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/mypage/cart"
                                    style={({ isActive }) => ({
                                        color: isActive ? 'black' : 'gray',
                                    })}
                                >
                                    장바구니
                                </NavLink>
                            </li>
                        </ul>
                    </StyleNav>
                }
                <div>
                    <Routes>
                        <Route path="/orderlist" element={<OrderList />} />
                        <Route path="/like" element={<Like />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </MypageLayout>
            <DialLog />
            <MainFooter />
        </>
    );
};

export default Mypage;
