import React, { useContext } from 'react';
import { GalleryContext } from '../app';
import styled from 'styled-components';

const Bar = styled.div`
    background: linear-gradient(
        90deg,
        rgba(255, 184, 184, 1) 35%,
        rgba(248, 165, 194, 1) 100%
    );
    height: 6px;
    width: ${(props) => {
        return props.progress;
    }}%;
`;

export function ProgressBar() {
    const { progress } = useContext(GalleryContext);

    return <Bar progress={progress} />;
}
