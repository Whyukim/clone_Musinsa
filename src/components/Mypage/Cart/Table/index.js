import React, { createContext, useCallback, useEffect, useState } from 'react';
import { ImgSpan } from '../styles';
import { FiMinus } from '@react-icons/all-files/fi/FiMinus';
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { thousandComma } from 'utils/thousandComma';
import { smallCategory } from 'utils/smallCategory';
import { bigCategory } from 'utils/bigCategory';
import { CheckLabel, ItemUl } from './styles';
import OrderModal from 'components/Modals/OrderModal';
import Order from 'components/Order';
import itemData from 'data/main.json';
import { getData } from 'utils/getData';
import { setData } from 'utils/setData';

function CartTable({ item, setCartList, cartList, cartRemove }) {
    const [modalOrder, setModalOrder] = useState(false);
    const [pay, setPay] = useState('card');
    const [order, setOrder] = useState(false);
    const [orderArr, setOrderArr] = useState([]);
    const amountValue = item.count == 0 ? 0 : item.count;
    const [productItem, setProductItem] = useState(() => {
        return itemData.filter(v => item.id === v.id)[0];
    });
    const [loginData, setLoginData] = useState(() => {
        return getData();
    });

    // 수량 기입
    const handleChange = useCallback(
        ({ target: { value } }) => {
            if (value > item.amount) {
                alert('상품의 재고보다 많은 수량을 선택할 수 없습니다');
            } else if (value == 0) {
                alert('수량을 줄일 수 없습니다.');
            } else {
                const temp = loginData.baskets.map(v => {
                    if (v.productId === item.productId)
                        return {
                            ...v,
                            count: Number(value),
                        };
                    else return v;
                });
                setCartList(temp);

                let data = loginData;
                data.baskets = temp;
                setData(data);
            }
        },
        [cartList],
    );

    // 수량 증가
    const plusCount = useCallback(() => {
        if (amountValue >= item.amount) {
            alert('상품의 재고보다 많은 수량을 선택할 수 없습니다');
        } else {
            const temp = loginData.baskets.map(v => {
                if (v.productId === item.productId)
                    return {
                        ...v,
                        count: amountValue + 1,
                    };
                else return v;
            });
            setCartList(temp);

            let data = loginData;
            data.baskets = temp;
            setData(data);
        }
    }, [cartList]);

    // 수량 감소
    const minusCount = useCallback(() => {
        if (amountValue === 1) {
            alert('수량을 줄일 수 없습니다.');
        } else {
            const temp = loginData.baskets.map(v => {
                if (v.productId === item.productId)
                    return {
                        ...v,
                        count: amountValue - 1,
                    };
                else return v;
            });
            setCartList(temp);

            let data = loginData;
            data.baskets = temp;
            setData(data);
        }
    }, [cartList]);

    // 체크
    const checkItem = useCallback(() => {
        if (item.count > 0) {
            const temp = cartList.map(v =>
                v.productId === item.productId ? { ...v, check: !v.check } : v,
            );
            setCartList(temp);

            let data = loginData;
            data.baskets = temp;
            setData(data);
        }
    }, [cartList]);

    const removeItem = useCallback(() => {
        const temp = cartList.filter(v => v.productId !== item.productId);
        setCartList(temp);

        let data = loginData;
        data.baskets = temp;
        setData(data);
    }, [cartList]);

    // 결제 모달창
    const onCloseModal = useCallback(() => {
        setModalOrder(false);
        setOrder(false);
    }, [modalOrder]);

    // 바로구매
    const onClickOrderButton = useCallback(() => {
        let obj = {
            id: item.id,
            productId: item.productId,
            price: productItem.price * amountValue,
            count: amountValue,
            size: item.size,
            name: item.name,
        };
        const orderList = [obj];

        setOrderArr(orderList);
        setModalOrder(true);
    }, [amountValue]);

    // 결제
    const onClickOrder = useCallback(() => {
        setModalOrder(false);
        setOrder(true);
    }, []);

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    return (
        <tbody>
            <tr>
                <td colSpan="7" className="cart_cont">
                    <table>
                        <colgroup>
                            <col width="3.62%" />
                            <col width="*" />
                            <col width="9.5%" />
                            <col width="12%" />
                            <col width="9.5%" />
                            <col width="17.3%" />
                            <col width="15%" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td onClick={checkItem}>
                                    <CheckLabel
                                        className={
                                            item.amount > 0 ? (item.check ? 'active' : '') : 'sold'
                                        }
                                    ></CheckLabel>
                                </td>
                                <td className="top">
                                    <div>
                                        <ImgSpan className={item.count === 0 ? 'soldout' : ''}>
                                            <a href={`/detail?productId=${item.id}`}>
                                                <img
                                                    src={
                                                        productItem.img +
                                                        getParametersForUnsplash({
                                                            width: 80,
                                                            height: 100,
                                                            quality: 80,
                                                            format: 'jpg',
                                                        })
                                                    }
                                                    alt="더미데이터"
                                                />
                                            </a>
                                        </ImgSpan>
                                        <ItemUl>
                                            <li>
                                                <a href={`/detail?productId=${productItem.id}`}>
                                                    {bigCategory[productItem.bigCategoryId]} /{' '}
                                                    {
                                                        smallCategory[productItem.bigCategoryId][
                                                            productItem.smallCategoryId
                                                        ]
                                                    }
                                                </a>
                                            </li>
                                            <li>
                                                <a href={`/detail?productId=${productItem.id}`}>
                                                    <strong>{productItem.productTitle}</strong>
                                                </a>
                                            </li>
                                            <li>
                                                {item.size} / {item.name} /&nbsp;
                                                {item.amount === 0 ? `품절` : `${item.amount}개`}
                                            </li>
                                        </ItemUl>
                                    </div>
                                </td>
                                <td> {thousandComma(productItem.price)}원</td>
                                <td>
                                    <div className="input_amount">
                                        <button value={1} onClick={minusCount}>
                                            <FiMinus
                                                style={
                                                    amountValue <= 1
                                                        ? { color: '#ddd' }
                                                        : { color: '#777' }
                                                }
                                            />
                                        </button>
                                        <input
                                            type="text"
                                            value={amountValue}
                                            onChange={handleChange}
                                        ></input>
                                        <button value={1} onClick={plusCount}>
                                            <FiPlus
                                                style={
                                                    amountValue === 0
                                                        ? { color: '#ddd' }
                                                        : { color: '#777' }
                                                }
                                            />
                                        </button>
                                    </div>
                                </td>
                                <td>{thousandComma(productItem.price * amountValue)}원</td>
                                <td>
                                    택배배송 <br />
                                    <strong>무료 배송</strong>
                                </td>
                                <td>
                                    <div>
                                        <button
                                            className="btn"
                                            onClick={amountValue === 0 ? false : onClickOrderButton}
                                        >
                                            결제하기
                                        </button>
                                        {order && (
                                            <Order
                                                pay={pay}
                                                orderArr={orderArr}
                                                setOrder={setOrder}
                                            />
                                        )}
                                        <button className="del_btn" onClick={removeItem}>
                                            <FiX />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            {modalOrder && (
                <OrderModal
                    show={modalOrder}
                    onCloseModal={onCloseModal}
                    onClickConfirm={onClickOrder}
                    price={thousandComma(productItem.price * item.count)}
                    pay={pay}
                    setPay={setPay}
                ></OrderModal>
            )}
        </tbody>
    );
}

export default CartTable;
