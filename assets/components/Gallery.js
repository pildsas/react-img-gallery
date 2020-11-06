import React, { useState, useEffect, useContext } from "react";
import { getImages } from "../hooks/getImages.js";
import { Image } from "./Image.js";
import { Spinner } from "./Spinner.js";
import { GalleryContext } from "../app";
import styled from "styled-components";

const ImageContainer = styled.div`
  max-width: max-content;
  display: grid;
  grid-template-columns: ${(props) => {
    if (props.len <= 4) {
      return "repeat(4, 1fr);";
    } else if (props.len < 7) {
      return "repeat(6, 1fr);";
    } else if (props.len == 7) {
      return "repeat(6, 1fr);";
    } else if (props.len < 10) {
      return "repeat(7, 1fr);";
    } else if (props.len == 10) {
      return "repeat(8, 1fr);";
    }
  }};
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 2vmin;
  justify-items: center;
  align-items: center;
`;

export const Gallery = () => {
  const {
    images,
    setImages,
    currentPageNumber,
    setTotalCount,
    setNumItemsPerPage,
  } = useContext(GalleryContext);

  useEffect(() => {
    const getGallery = async () => {
      if (!currentPageNumber) return;
      setImages(null);
      let res = await getImages(currentPageNumber);
      setImages([...res.data.gallery]);
      setNumItemsPerPage(res.data.pagination.numItemsPerPage);
      setTotalCount(res.data.pagination.totalCount);
    };
    getGallery();
  }, [currentPageNumber]);

  return (
    <>
      {!images && <Spinner />}
      <ImageContainer len={images ? images.length : 0}>
        {images &&
          images.map((image) => <Image key={image.id} image={image} />)}
      </ImageContainer>
    </>
  );
};

{
}
