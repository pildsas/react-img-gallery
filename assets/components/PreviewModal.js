import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GalleryContext } from '../app';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
`;

const ModalWindow = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    font-family: 'Montserrat', sans-serif;
`;

const ModalBody = styled.div`
    padding: 10px;
    background: #2f3640;
    color: #d6d6d6;
    height: 40vh;
`;

const Image = styled.img`
    height: 100%;
    object-fit: cover;
`;

export const PreviewModal = () => {
    let { file, setPreview } = useContext(GalleryContext);

    const closeHandler = () => {
        setPreview(null);
    };

    useEffect(() => {
        let reader = new FileReader();

        reader.addEventListener('load', function () {
            document
                .querySelector('#img__modal-preview')
                .setAttribute('src', this.result);
        });

        reader.readAsDataURL(file);
    }, []);

    return (
        <>
            <Overlay onClick={closeHandler}></Overlay>
            <ModalWindow>
                <ModalBody>
                    <Image src="" id="img__modal-preview" />
                </ModalBody>
            </ModalWindow>
        </>
    );
};
