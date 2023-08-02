import { t } from "i18next";
import React, { useRef, useState } from "react";

import BtnEdit from "../../assets/icon/edit-2.svg";
import Avatar from "../../assets/img/img-default-avatar.png";
import { errorPopup } from "../UI/modal/PopUp/ErrorPopUp";
import '../../styles/input/inputImage.scss'

export const InputImage = (props) => {
  const uploadImage = useRef(null);
  const [previewImage, setPreviewImage] = useState()

  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJpgOrPng) {
      console.info(t('imageOnly'));
      errorPopup(t('error'), t('imageOnly'), t('gotit'))
    }
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      console.info(t('image2MB'));
      errorPopup(t('error'), t('image2MB'), t('gotit'))
    }

    
    if (isJpgOrPng && isLt2M) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      props.setImage(file);
    } else {
      setPreviewImage();
      uploadImage.current.value = ''
      props.setImage(null);
    }
  };

  return (
    <div {...props}>
      <div 
        className="image-preview" 
        style={{backgroundImage: `url(${previewImage ?? Avatar})`}}
      >
        <div
          className="upload-icon"
          onClick={() => uploadImage.current.click()}
        >
          <img 
            src={BtnEdit} 
            alt="" 
          />
        </div>
      </div>
      <input 
        hidden
        ref={uploadImage}
        type="file" 
        name="" 
        id="" 
        onChange={(e) => {
          beforeUpload(e.target.files[0]);
        }}
      />
    </div>
  )
}