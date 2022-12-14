import FirstModalContainer from '../FirstModalContainer';
import { Button, Container } from 'components/Modals/FirstModalContainer/style';
import React from 'react';

const FirstModal = ({ show, onCloseModal }) => {
    return (
        <FirstModalContainer show={show} onCloseModal={onCloseModal}>
            <Container>
                <h1>π νμ¬ νμ΄μ§ μμ μμ μ€μλλ€.π </h1>

                <ul>
                    <li>
                        <h3>νμ΄μ§κ° μννμ§ μλλΌλ λκ·Έλ¬μ΄ μν΄ λΆνλλ¦½λλ€.</h3>
                    </li>
                </ul>
            </Container>
            <Button className="button" onClick={onCloseModal}>
                νμΈ
            </Button>
        </FirstModalContainer>
    );
};

export default FirstModal;
