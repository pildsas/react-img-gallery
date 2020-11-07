import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { GalleryContext } from "../app";

const Form = styled.form`
  display: grid;
  align-items: center;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  cursor: pointer;
  margin: 0px 10px;
  border: 3px solid rgba(255, 184, 184, 1);
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  &:hover {
    opacity: 0.6;
  }
`;

const IconBox = styled.div`
  cursor: pointer;
  margin: 0px 10px;
  border: 3px solid rgba(255, 184, 184, 1);
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  &:hover {
    opacity: 0.6;
  }
`;

const Icon = styled.i`
  color: rgba(255, 184, 184, 1);
  font-size: 2rem;
`;

const Validation = styled.div`
  display: flex;
  justify-content: center;
  color: rgba(255, 184, 184, 1);
  font-size: 1.2rem;
  padding: 20px 0px;
`;

export default function UploadForm(props) {
  const [error, setError] = useState(null);

  const {
    file,
    setFile,
    setPreview,
    setProgress,
    totalCount,
    numItemsPerPage,
    setCurrentPageNumber,
  } = useContext(GalleryContext);

  const changeHandler = (e) => {
    const mimeTypes = ["image/png", "image/jpeg"];
    let selected = e.target.files[0];
    e.target.value = null;

    if (selected && mimeTypes.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Accepted file formats – .jpeg / .png");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file) return;

    let page = Math.ceil((totalCount + 1) / numItemsPerPage);
    const data = new FormData();
    data.append("file", file);
    data.append("page", page);

    return axios
      .post("http://127.0.0.1:8000/upload-file", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        },
      })
      .then((res) => {
        setFile(null);
        setProgress(null);
        setCurrentPageNumber(null);
        setCurrentPageNumber(page);
        return res;
      });
  };

  const previewHandler = () => {
    setPreview(true);
  };

  return (
    <Form>
      <FileInput type="file" id="input__comment-img" onChange={changeHandler} />
      <Icons>
        <FileLabel htmlFor="input__comment-img">
          <Icon className="fas fa-plus"></Icon>
        </FileLabel>

        {file && (
          <IconBox onClick={previewHandler}>
            <Icon className="fas fa-file-image"></Icon>
          </IconBox>
        )}

        <IconBox onClick={submitHandler}>
          <Icon className="fas fa-check"></Icon>
        </IconBox>
      </Icons>
      {error && <Validation>{error}</Validation>}
    </Form>
  );
}
