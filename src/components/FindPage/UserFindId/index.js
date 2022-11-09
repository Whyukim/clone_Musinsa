import React, { useCallback, useEffect } from 'react';
import UserFindAuth from '../UserFindAuth';
import UserFindIdFinishModal from 'components/Modals/UserFindIdFinishModal';
import {
    INIT,
    MODALAUTHCONFIRM,
    useUserFindDispatch,
    useUserFindState,
} from 'context/UserFindContext';
import { useState } from 'react';

const UserFindId = () => {
    const userFind = useUserFindState();
    const dispatch = useUserFindDispatch();
    const { findUserId, modalAuthConfirm } = userFind;

    // useContext 초기화
    useEffect(() => {
        dispatch({ type: INIT });
    }, []);

    const changeDispatch = useCallback((type, payload) => {
        return dispatch({ type, payload });
    }, []);

    // 모달창 Close
    const onCloseModal = useCallback(() => {
        changeDispatch(MODALAUTHCONFIRM, { modalAuthConfirm: false });
    }, []);

    return (
        <>
            <UserFindAuth></UserFindAuth>
            <UserFindIdFinishModal
                show={modalAuthConfirm}
                onCloseModal={onCloseModal}
                title="아이디 찾기 결과"
                content={`${findUserId}`}
                rest={'비밀번호'}
            ></UserFindIdFinishModal>
        </>
    );
};

export default UserFindId;
