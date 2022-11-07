import FirstModalContainer from '../FirstModalContainer';
import { Button, Container } from 'components/Modals/FirstModalContainer/style';
import React from 'react';

const FirstModal = ({ show, onCloseModal }) => {
    return (
        <FirstModalContainer show={show} onCloseModal={onCloseModal}>
            <Container>
                <h1>🛠현재 페이지 수정작업 중입니다.🛠</h1>

                <ul>
                    <li>
                        <h3>페이지가 원활하지 않더라도 너그러이 양해 부탁드립니다.</h3>
                    </li>
                </ul>
            </Container>
            <Button className="button" onClick={onCloseModal}>
                확인
            </Button>
        </FirstModalContainer>
    );
};

export default FirstModal;
