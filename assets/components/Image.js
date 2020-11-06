import React, { useContext } from 'react';
import { GalleryContext } from '../app';
import styled from 'styled-components';

const Img = styled.img`
    z-index: 1;
    width: 20vh;
    height: 20vh;
    object-fit: cover;
    margin-bottom: -52%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    transform: scale(1);
    transition: all 0.25s;

    &:nth-child(1) {
        grid-column: 2 / span 2;
        grid-row: 1;
    }

    &:nth-child(2) {
        grid-column: 1 / span 2;
        grid-row: 2;
    }

    &:nth-child(3) {
        grid-column: 3 / span 2;
        grid-row: 2;
    }

    &:nth-child(4) {
        grid-column: 2 / span 2;
        grid-row: 3;
    }

    &:nth-child(5) {
        grid-column: 4 / span 2;
        grid-row: 1;
    }

    &:nth-child(6) {
        grid-column: 4 / span 2;
        grid-row: 3;
    }

    &:nth-child(7) {
        grid-column: 5 / span 2;
        grid-row: 2;
    }
    &:nth-child(8) {
        grid-column: 6 / span 2;
        grid-row: 1;
    }
    &:nth-child(9) {
        grid-column: 6 / span 2;
        grid-row: 3;
    }

    &:nth-child(10) {
        grid-column: 7 / span 2;
        grid-row: 2;
    }

    &:hover {
        z-index: 2;
        transform: scale(1.5);
    }
`;

export const Image = ({ image }) => {
    const { setSelected } = useContext(GalleryContext);
    const onClickHandler = () => {
        setSelected(image);
    };

    return (
        <Img
            src={'http://127.0.0.1:8000' + image.path}
            onClick={onClickHandler}
        />
    );
};
