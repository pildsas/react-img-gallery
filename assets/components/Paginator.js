import React, { useContext, useEffect, useState } from "react";
import { GalleryContext } from "../app";
// import "../styles/pagination.css";
import styled, { css, keyframes } from "styled-components";

const dotSize = 10;
const dotSizeNegative = -10;
const smallColor = "rgba(255, 184, 184, 1)";
const bigColor = "rgba(255, 184, 184, 1)";
const arrowColor = "rgba(255, 184, 184, 1)";

const AnimationContainerPrev = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${dotSize * 3}px);
  }
`;

const AnimationContainerNext = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(${dotSizeNegative * 3}px);
  }
`;

const AnimationLittleDot = keyframes`
   0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const AnimationBigDotPrev = keyframes`
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(-50%) rotate(-179deg);
  }
`;

const AnimationBigDotNext = keyframes`
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(-50%) rotate(-181deg);
  }
`;

//not working
const leftSlide = keyframes`
  0% {
    transform: translateX(0px);

  }
  100% {
    transform: translateX(${dotSizeNegative * 3}px);
  }
`;

//not working
const rightSlide = keyframes`
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(${dotSize * 3}px);
    opacity: 1;
  }
`;

const PaginationWrap = styled.div`
  position: relative;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SmallDot = styled.div`
  width: ${dotSize}px;
  height: ${dotSize}px;
  background: ${smallColor};
  border-radius: 100%;
  display: inline-block;
  margin: 0 ${dotSize}px;
  position: relative;
  ${({ disabled }) => {
    return (
      disabled &&
      css`
        background: rgba(255, 184, 184, 0.3);
      `
    );
  }}
`;

const BigDotContainer = styled.div`
  width: ${dotSize * 3}px;
  height: ${dotSize * 3}px;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  right: ${dotSize / 2}px;
  transform: translateY(-50%);
  z-index: 10;
`;

const BigDot = styled.div`
  width: ${dotSize * 2}px;
  height: ${dotSize * 2}px;
  border-radius: 100%;
  background: ${bigColor};
  position: absolute;
  top: 50%;
  right: ${dotSizeNegative}px;
  transform: translateY(-50%);
`;

const Arrow = styled.i`
  position: absolute;
  color: ${arrowColor};
  transition: opacity 0.2s;
  font-size: 4rem;
  cursor: pointer;
  ${({ prev }) => {
    return (
      prev &&
      css`
        right: calc(100% + 20px);
      `
    );
  }}
  ${({ next }) => {
    return (
      next &&
      css`
        left: calc(100% + 20px);
      `
    );
  }}

  ${({ disabled }) => {
    return (
      disabled &&
      css`
        color: rgba(255, 184, 184, 0.3);
        pointer-events: none;
      `
    );
  }}

  &:hover {
    opacity: 0.7;
  }
}
`;

const PaginationContainer = styled.div`
  ${({ dir }) => {
    if (dir == "prev") {
      return css`
        animation: ${AnimationContainerPrev} 0.3s forwards;
        ${SmallDot}:nth-of-type(3) {
          animation: ${AnimationLittleDot} 0.3s forwards;
        }
        ${BigDotContainer} {
          animation: ${AnimationBigDotPrev} 0.3s forwards;
        }
      `;
    } else if (dir == "next") {
      return css`
        animation: ${AnimationContainerNext} 0.3s forwards;
        ${SmallDot}:nth-of-type(1) {
          animation: ${AnimationLittleDot} 0.3s forwards;
        }
        ${BigDotContainer} {
          right: auto;
          left: ${dotSize / 2}px;
          animation: ${AnimationBigDotNext} 0.3s forwards;
        }
        ${BigDot} {
          right: auto;
          left: ${dotSizeNegative}px;
        }
      `;
    }
  }}
`;

export const Paginator = () => {
  const {
    currentPageNumber,
    setCurrentPageNumber,
    totalCount,
    numItemsPerPage,
  } = useContext(GalleryContext);

  const [dir, setDir] = useState(null);

  const ClickHandler = async (e, dir) => {
    setDir(dir);

    dir == "prev"
      ? setCurrentPageNumber(currentPageNumber - 1)
      : setCurrentPageNumber(currentPageNumber + 1);

    setTimeout(() => {
      setDir(null);
    }, 300);
  };

  return (
    <PaginationWrap>
      <Arrow
        prev
        disabled={currentPageNumber - 1 < 1}
        className="fas fa-chevron-left"
        onClick={(e) => ClickHandler(e, "prev")}
      ></Arrow>
      <PaginationContainer dir={dir}>
        <SmallDot disabled={currentPageNumber - 1 < 1}></SmallDot>
        <SmallDot>
          <BigDotContainer>
            <BigDot></BigDot>
          </BigDotContainer>
        </SmallDot>
        <SmallDot
          disabled={
            currentPageNumber == Math.ceil(totalCount / numItemsPerPage) ||
            Math.ceil(totalCount / numItemsPerPage) < 1
          }
        ></SmallDot>
      </PaginationContainer>
      <Arrow
        next
        className="fas fa-chevron-right"
        onClick={(e) => ClickHandler(e, "next")}
        disabled={
          currentPageNumber == Math.ceil(totalCount / numItemsPerPage) ||
          Math.ceil(totalCount / numItemsPerPage) < 1
        }
      ></Arrow>
    </PaginationWrap>
  );
};
