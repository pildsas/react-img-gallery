import React, { useContext, useEffect } from "react";
import { GalleryContext } from "../app";
import "../styles/pagination.css";
import styled from "styled-components";

export const Paginator = () => {
  const {
    currentPageNumber,
    setCurrentPageNumber,
    totalCount,
    numItemsPerPage,
  } = useContext(GalleryContext);

  const ClickHandler = async (e) => {
    let pagesCount = Math.ceil(totalCount / numItemsPerPage);
    const paginationWrapper = document.querySelector(".pagination__wrapper");

    if (e.target.classList.contains("btn__prev")) {
      if (currentPageNumber > 1) {
        paginationWrapper.classList.add("transition-prev");
        setCurrentPageNumber(currentPageNumber - 1);
      }
    } else {
      if (currentPageNumber < pagesCount) {
        paginationWrapper.classList.add("transition-next");
        setCurrentPageNumber(currentPageNumber + 1);
      }
    }
    setTimeout(() => {
      if (paginationWrapper.classList.contains("transition-next")) {
        paginationWrapper.classList.remove("transition-next");
      } else if (paginationWrapper.classList.contains("transition-prev")) {
        paginationWrapper.classList.remove("transition-prev");
      }
    }, 300);
  };

  useEffect(() => {
    let pagesCount = Math.ceil(totalCount / numItemsPerPage);
    const btnNext = document.querySelector(".btn__next");
    const btnPrev = document.querySelector(".btn__prev");

    if (currentPageNumber - 1 < 1) {
      btnPrev.classList.add("btn__disabled");
    } else {
      btnPrev.classList.remove("btn__disabled");
    }

    if (currentPageNumber == pagesCount) {
      btnNext.classList.add("btn__disabled");
    } else {
      btnNext.classList.remove("btn__disabled");
    }
  }, [currentPageNumber, totalCount]);

  return (
    <div className="pagination__wrapper">
      <i
        className="fas fa-chevron-left btn btn__prev"
        onClick={ClickHandler}
      ></i>
      <div className="pagination__container">
        <div className="little-dot  little-dot__first"></div>
        <div className="little-dot">
          <div className="big-dot__container">
            <div className="big-dot"></div>
          </div>
        </div>
        <div className="little-dot  little-dot__last"></div>
      </div>
      <i
        className="fas fa-chevron-right btn btn__next btn__disabled"
        onClick={ClickHandler}
      ></i>
    </div>
  );
};
