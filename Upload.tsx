import { useState } from "react";
import styled from "styled-components";
import Vector from "./Vector.png";

const Upload = () => {
  const [img, setImg] = useState<any>([]);
  const [previewImg, setPreviewImg] = useState<any>([]);

  if (img.length >= 4) {
    img.length = 4;
  }
  const insertImg = (e: any) => {
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);

      setImg([...img, e.target.files[0]]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl) {
        setPreviewImg([...previewImg, previewImgUrl]);
      }
    };
  };
  const deleteImg = (index: any) => {
    const imgArr = img.filter((el: any, idx: number) => idx !== index);
    const imgNameArr = previewImg.filter(
      (el: any, idx: number) => idx !== index
    );

    setImg([...imgArr]);
    setPreviewImg([...imgNameArr]);
  };
  const getPreviewImg = () => {
    return img.map((el: any, index: any) => {
      return (
        <div key={index} className="flex">
          <Img id="images" key={index} src={previewImg[index]}></Img>
          <CloseButton onClick={() => deleteImg(index)}>×</CloseButton>
        </div>
      );
    });
  };

  return (
    <>
      <UploadLabel htmlFor="inputfile">
        <img src={Vector} alt="Vector" className="mx-auto mt-[70px]" />
        여기로 파일을 끌어오세요.
      </UploadLabel>
      <ImgInput
        type="file"
        id="inputfile"
        accept="image/jpg, image/jpeg, image/png"
        onChange={(e) => insertImg(e)}
      />
      <div className="flex mt-[30px] justify-center">{getPreviewImg()}</div>
    </>
  );
};

export default Upload;

const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;
const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #0000d8;
  color: #ffffff;
  font-size: 7px;
  line-height: 15.5px;
  z-index: 2;
  margin-left: 50px;
  top: 772px;
`;

const UploadLabel = styled.label`
  display: inline-block;
  width: 380px;
  height: 180px;
  font-weight: 400;
  font-size: 13px;
  color: #9e9e9e;
  border: 1px dashed #9e9e9e;
  border-radius: 5px;
  margin-top: 50px;
  cursor: pointer;
`;
const ImgInput = styled.input`
  display: flex;
  position: absolute;
  width: 0;
  height: 0;
`;
