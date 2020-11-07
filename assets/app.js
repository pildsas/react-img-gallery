import "./styles/app.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import UploadForm from "./components/UploadForm.js";
import { Gallery } from "./components/Gallery";
import { Modal } from "./components/Modal";
import { PreviewModal } from "./components/PreviewModal";
import { ProgressBar } from "./components/ProgressBar";
import { Paginator } from "./components/Paginator";

export const GalleryContext = React.createContext();

export const App = () => {
  const [selected, setSelected] = useState(null);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [numItemsPerPage, setNumItemsPerPage] = useState(0);

  return (
    <div className="container">
      <GalleryContext.Provider
        value={{
          selected,
          setSelected,
          images,
          setImages,
          file,
          setFile,
          preview,
          setPreview,
          progress,
          setProgress,
          currentPageNumber,
          setCurrentPageNumber,
          totalCount,
          setTotalCount,
          numItemsPerPage,
          setNumItemsPerPage,
        }}
      >
        <div className="row">{progress && <ProgressBar />}</div>
        <div className="row">
          <UploadForm />
        </div>
        <div className="row">
          {preview && <PreviewModal />}
          <Gallery />
          {selected && <Modal />}
        </div>
        <div className="row">
          <Paginator />
        </div>
      </GalleryContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
