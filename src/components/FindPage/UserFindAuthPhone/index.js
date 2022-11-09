import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { RadioDetail, AuthInput } from './styles';
import { ReactComponent as CancelIcon } from 'assets/svg/Cancel.svg';
import { ReactComponent as LoadingIcon } from 'assets/svg/Loading.svg';
import { PostApi, PostHeaderApi } from 'utils/api';
import {
    MODALAUTH,
    PHONECODE,
    PHONENUMBER,
    FINDUSERID,
    useUserFindDispatch,
    useUserFindState,
    FINDBUTTONLOADING,
    MODALAUTHCONFIRM,
    PHONECODEFLAG,
    AUTHSUCCESS,
    PHONECHECK,
    PHONENUMBERAUTHTEXT,
} from 'context/UserFindContext';
import { authError } from 'utils/error';
import TextModal from 'components/Modals/TextModal';
import { useParams } from 'react-router';
import userData from 'data/user.json';
import { getStorage } from 'utils/getStorage';

const UserFindAuthPhone = forwardRef((props, ref) => {
    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();
    const { phoneNumber, phoneNumberAuthText } = userFind;
    const { setActive } = props;
    const pageURL = Object.values(useParams())[0];

    const [phoneNumberReg, setPhoneNumberReg] = useState(true);
    const [phoneNumberLoading, setPhoneNumberLoading] = useState(false);
    const [modalAuth, setModalAuth] = useState(false);

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    const onClickClear = useCallback(e => {
        if (e === 'phoneNumber') {
            changeDispatch(PHONENUMBER, { phoneNumber: '' });
        } else if (e === 'phoneCode') {
            changeDispatch(PHONECODE, { phoneCode: '' });
        }
    }, []);

    // onChange 정규식 검사
    const onChangePhoneNumber = useCallback(
        e => {
            const { value } = e.target;
            const onlyNumber = value.replace(/[^0-9]/g, '');
            changeDispatch(PHONENUMBER, { phoneNumber: value });
            changeDispatch(PHONENUMBERAUTHTEXT, {
                phoneNumberAuthText: '휴대전화 번호를 입력해 주세요.',
            });

            const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
            if (regExp.test(onlyNumber)) setPhoneNumberReg(true);
            else setPhoneNumberReg(false);
        },
        [phoneNumber],
    );

    // 휴대폰 1차인증
    const onClickAuth = useCallback(
        e => {
            setPhoneNumberLoading(true);

            if (pageURL === 'id') {
                let users = getStorage('user') || userData;
                let value = '';
                for (let i = 0; i < users.length; i++) {
                    if (users[i].info.mobile === phoneNumber) {
                        value = users[i].userId;
                    }
                }

                if (value) {
                    changeDispatch(FINDUSERID, { findUserId: value });

                    setActive(true);
                    setModalAuth(true);
                }
            } else if (pageURL === 'password/choice' && userFind.mobile === phoneNumber) {
                setActive(true);
                setModalAuth(true);
            } else {
                alert('번호가 다릅니다.');
            }
            setPhoneNumberLoading(false);
        },
        [phoneNumber],
    );

    // 자동으로 하이픈 넣기
    useEffect(() => {
        if (phoneNumber.length === 10) {
            changeDispatch(PHONENUMBER, {
                phoneNumber: phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'),
            });
        }
        if (phoneNumber.length === 13) {
            changeDispatch(PHONENUMBER, {
                phoneNumber: phoneNumber
                    .replace(/-/g, '')
                    .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            });
        }
    }, [phoneNumber]);

    const onCloseModal = useCallback(() => {
        setModalAuth(false);
    }, []);

    return (
        <>
            <RadioDetail>
                <div>
                    <AuthInput className={phoneNumberReg ? '' : 'danger'}>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={onChangePhoneNumber}
                            onFocus={onChangePhoneNumber}
                            pattern="[0-9]+"
                            inputMode="numberic"
                            title="휴대전화 인증"
                            placeholder="휴대전화 (-없이)"
                            maxLength="13"
                        />
                        {phoneNumber?.length > 0 && (
                            <button
                                type="button"
                                className="clearBtn"
                                onClick={() => onClickClear('phoneNumber')}
                            >
                                <CancelIcon></CancelIcon>
                            </button>
                        )}
                        <button
                            type="button"
                            className="authBtn"
                            disabled={phoneNumber.length > 0 && phoneNumberReg ? false : true}
                            style={
                                phoneNumber.length > 0 && phoneNumberReg
                                    ? { cursor: 'pointer' }
                                    : { cursor: 'default' }
                            }
                            onClick={() => onClickAuth('phoneNumber')}
                        >
                            본인 인증
                            {phoneNumberLoading && <LoadingIcon className="loading"></LoadingIcon>}
                        </button>
                    </AuthInput>
                    {!phoneNumberReg && <p>{phoneNumberAuthText}</p>}
                </div>
            </RadioDetail>

            <TextModal
                show={modalAuth}
                onCloseModal={onCloseModal}
                content="인증번호가 확인되었습니다."
            ></TextModal>
        </>
    );
});

export default UserFindAuthPhone;
