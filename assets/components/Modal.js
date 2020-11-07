import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { GalleryContext } from "../app";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: none;
  ${(props) => {
    if (props.selected) {
      return "display: block;";
    } else {
      return "display: none;";
    }
  }}
`;

const ModalWindow = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #2f3640;
  color: #d6d6d6;
  z-index: 9999;
  font-family: "Montserrat", sans-serif;
  ${(props) => {
    if (props.selected) {
      return "display: block;";
    } else {
      return "display: none;";
    }
  }}
`;

const ModalBody = styled.div`
  /* padding: 10px; */
  height: 40vh;
`;

const Image = styled.img`
  height: 100%;
  object-fit: cover;
`;

const ModalFooter = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  border: 2px solid rgba(255, 184, 184, 1);
  outline: none;
  height: 50px;
  border-radius: 5px;
  padding: 5px 10px;
  text-transform: uppercase;
  font-size: 1rem;
  cursor: pointer;
  width: 48%;
  font-weight: 600;
  color: rgba(255, 184, 184, 1);
  background: transparent;
  &:hover {
    background: rgba(255, 184, 184, 1);
    color: white;
  }
`;

export const Modal = () => {
  let {
    selected,
    images,
    setSelected,
    setCurrentPageNumber,
    currentPageNumber,
  } = useContext(GalleryContext);

  const closeHandler = () => {
    setSelected(null);
  };

  const deleteHandler = (id) => {
    let page =
      images.length - 1 > 0
        ? currentPageNumber
        : currentPageNumber > 1
        ? currentPageNumber - 1
        : 1;

    let data = new FormData();
    data.append("id", id);

    axios.post("http://127.0.0.1:8000/remove-file", data).then((res) => {
      setSelected(null);
      setCurrentPageNumber(null);
      setCurrentPageNumber(page);
    });
  };

  return (
    <>
      <Overlay selected={selected} onClick={closeHandler}></Overlay>
      <ModalWindow selected={selected}>
        <ModalBody>
          <Image src={"http://127.0.0.1:8000" + selected.path} />
        </ModalBody>
        <ModalFooter>
          <Button action="delete" onClick={() => deleteHandler(selected.id)}>
            Delete
          </Button>
          <Button action="close" onClick={closeHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalWindow>
    </>
  );
};
