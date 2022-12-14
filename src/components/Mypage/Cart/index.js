import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import CartTable from 'components/Mypage/Cart/Table';
import { OrderTable, CartPayment, OrderBtn, ModalStyle } from 'components/Mypage/Cart/styles';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { FaEquals } from '@react-icons/all-files/fa/FaEquals';
import Order from 'components/Order';
import OrderModal from 'components/Modals/OrderModal';
import { thousandComma } from 'utils/thousandComma';
import { CheckLabel } from './Table/styles';
import { getData } from 'utils/getData';
import itemData from 'data/main.json';

function Cart() {
    const [cartList, setCartList] = useState([]);
    const loginToken = getData();

    //장바구니 리스트 가져오기
    useEffect(() => {
        setCartList([...loginToken.baskets]);
    }, []);

    const [checkBox, setCheckBox] = useState(false);
    const [sum, setSum] = useState(0);

    const [pay, setPay] = useState('card');
    const [order, setOrder] = useState(false);

    const [modalOrder, setModalOrder] = useState(false);

    const [orderArr, setOrderArr] = useState([]);

    // 체크
    const checkItem = useCallback(() => {
        setCheckBox(check => !check);
    }, [cartList, checkBox]);

    const onCloseModal = useCallback(() => {
        setModalOrder(false);
        setOrder(false);
    }, [modalOrder]);

    // 바로구매
    const onClickOrderButton = useCallback(e => {
        setModalOrder(true);
    }, []);

    // 결제
    const onClickOrder = useCallback(() => {
        setModalOrder(false);
        setOrder(true);
        let arrBsId = [];
        let arrPrice = [];
        let arrAmount = [];

        // cartList.map(v =>
        //     v.check
        //         ? arrBsId.push(v.id) &&
        //           arrPrice.push(v.Product.productPrice * v.packingAmount) &&
        //           arrAmount.push(v.packingAmount)
        //         : arrBsId.filter(f => f !== v.id) &&
        //           arrPrice.filter(f => f !== v.Product.productPrice * v.packingAmount) &&
        //           arrAmount.filter(f => f !== v.packingAmount),
        // );

        const loginData = getData();
        const arr = [];
        let cnt = loginData.order.length;

        let today = new Date();
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1; // 월
        let date = today.getDate(); // 날짜
        if (String(date).length === 1) {
            date = `0${date}`;
        }

        loginData.baskets.map(v => {
            if (v.check && v.amount) {
                cnt++;

                let obj = {
                    id: v.id,
                    productId: v.productId,
                    count: v.count,
                    size: v.size,
                    name: v.name,
                    orderNumber: cnt,
                    date: year + '-' + month + '-' + date,
                };
                arr.push(obj);
            }
        });
        setOrderArr([...arr]);
    }, [cartList]);

    // 모두 체크 확인 및 총상품 금액
    useEffect(() => {
        let arrId = [];
        cartList.map(v => {
            const item = itemData.filter(val => val.id === v.id);
            if (v.check && v.amount) arrId.push({ ...v, price: item[0].price });
        });

        if (cartList.length === arrId.length && cartList.length != 0) setCheckBox(true);
        else setCheckBox(false);

        // 총 상품 금액
        if (arrId.length > 0) {
            const hap = arrId.reduce((a, b) => a + b.price * b.count, 0);
            setSum(hap);
        } else setSum(0);
    }, [cartList]);

    return (
        <>
            <MypageMain>
                <div>
                    <h3>장바구니</h3>
                    <OrderTable>
                        <colgroup>
                            <col width="3.62%" />
                            <col width="*" />
                            <col width="9.5%" />
                            <col width="12%" />
                            <col width="9.5%" />
                            <col width="17.3%" />
                            <col width="15%" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <CheckLabel
                                        onClick={checkItem}
                                        className={checkBox ? 'active' : ''}
                                    ></CheckLabel>
                                </th>
                                <th scope="col">상품정보</th>
                                <th scope="col">상품금액</th>
                                <th scope="col">수량</th>
                                <th scope="col">주문금액</th>
                                <th scope="col">배송 형태/배송비</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        {cartList.map((item, index) => (
                            <CartTable
                                key={index}
                                item={item}
                                setCartList={setCartList}
                                cartList={cartList}
                            />
                        ))}
                    </OrderTable>
                    <CartPayment>
                        <li>
                            <p>상품금액</p>
                            <p>
                                <span>{thousandComma(sum)}</span>원
                            </p>
                        </li>
                        <li>
                            <FaPlus />
                        </li>
                        <li>
                            <p>배송비</p>
                            <p>
                                <span>0</span>원
                                {/* <span>{sum > 30000 || sum === 0 ? 0 : thousandComma(3000)}</span>원 */}
                            </p>
                        </li>
                        <li>
                            <FaEquals />
                        </li>
                        <li>
                            <p>최종 결제 금액</p>
                            <p>
                                <span>
                                    {thousandComma(sum)}
                                    {/* {thousandComma(sum + (sum > 30000 || sum === 0 ? 0 : 3000))} */}
                                </span>
                                원
                            </p>
                        </li>
                    </CartPayment>
                    <OrderBtn>
                        <button onClick={onClickOrderButton}>결제하기</button>
                        {order && (
                            <Order
                                pay={pay}
                                orderArr={orderArr}
                                setOrder={setOrder}
                                cartList={cartList}
                                setCartList={setCartList}
                            />
                        )}
                    </OrderBtn>
                </div>

                {modalOrder && (
                    <OrderModal
                        show={modalOrder}
                        onCloseModal={onCloseModal}
                        onClickConfirm={onClickOrder}
                        price={thousandComma(sum)}
                        // price={thousandComma(sum + (sum > 30000 ? 0 : 3000))}
                        pay={pay}
                        setPay={setPay}
                    ></OrderModal>
                )}
            </MypageMain>
        </>
    );
}

export default Cart;
