import { useCallback, useContext } from 'react';
import { useState } from 'react';
import TextModal from 'components/Modals/TextModal';
import { useEffect } from 'react';
import { PostHeaderBodyApi } from 'utils/api';
import { getData } from 'utils/getData';
import { URLquery } from 'utils/URLquery';
import { useLocation } from 'react-router';
import { useScript } from 'hooks/useScript';
import { setData } from 'utils/setData';
import { BOSKET, useGlobalDispatch, useGlobalState } from 'context/GlobalContext';

const impNumber = process.env.REACT_APP_PAYMENT;

const Order = ({ pay, orderArr, setOrder, cartList, setCartList }) => {
    const jQueryScript = useScript('https://code.jquery.com/jquery-1.12.4.min.js');
    const iamportScript = useScript('https://cdn.iamport.kr/js/iamport.payment-1.1.8.js');

    const basketState = useGlobalState();
    const basketDispatch = useGlobalDispatch();

    const [modalOrder, setModalOrder] = useState(false);

    useEffect(() => {
        if (iamportScript === 'ready' && jQueryScript === 'ready') {
            let pg = '';
            let price = 10;
            if (pay === 'card') pg = 'html5_inicis';
            else if (pay === 'kakao') pg = 'kakaopay';
            else if (pay == 'payco') pg = 'payco';
            var { IMP } = window; // 생략가능
            IMP.init(impNumber); // <-- 본인 가맹점 식별코드 삽입
            IMP.request_pay(
                {
                    pg,
                    pay_method: 'card',
                    merchant_uid: `mid_${new Date().getTime()}`,
                    name: 'Test 상품',
                    amount: price,
                    buyer_email: 'test@test.com',
                    buyer_name: '홍길동',
                    buyer_tel: '01096361038',
                    buyer_addr: '서울특별시 강남구 신사동',
                    buyer_postcode: '01181',
                },
                rsp => {
                    // callback
                    if (rsp.success) {
                        // 결제 성공 시 로직,
                        const loginData = getData();
                        loginData.order = [...loginData.order, ...orderArr];

                        if (setCartList) {
                            const value = orderArr.map(v => v.productId);
                            const temp = cartList.filter(v => !value.includes(v.productId));
                            setCartList(temp);

                            loginData.baskets = temp;

                            const payload = {
                                basketCount: basketState.basketCount - 1,
                            };
                            basketDispatch({ type: BOSKET, payload });
                        }
                        setData(loginData);

                        setModalOrder(true);
                    } else {
                        // 결제 실패 시 로직,
                        setOrder(false);
                        console.log('error');
                    }
                },
            );
        }
    }, [jQueryScript, iamportScript]);

    const onCloseModal = useCallback(() => {
        setModalOrder(false);
    }, []);

    return (
        <TextModal
            show={modalOrder}
            onCloseModal={onCloseModal}
            content="결제가 완료 되었습니다."
        ></TextModal>
    );
};

export default Order;
