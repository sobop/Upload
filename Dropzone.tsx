import { useState } from "react";
import tw from "twin.macro";
import Vector from "./Vector.png";

function Dropzone() {
  const [file, setFile] = useState<any>({ photos: [] });
  const [highlight, setHighlight] = useState(false);
  const { photos } = file;
  if (photos.length > 5) {
    alert("사진은 최대 5장까지 가능합니다");
    photos.length = 5;
  }

  const handlefilechange = (e: any) => {
    let files = e.target.files;
    handfiles(files);
  };
  const handfiles = (files: any) => {
    let photosArr: any[] = [];
    for (let file of files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        let fileobj = {
          name: file.name,
          type: file.type,
          size: file.size,
          src: reader.result,
        };
        if (
          fileobj.type === "image/png" ||
          fileobj.type === "image/jpg" ||
          fileobj.type === "image/jpeg"
        ) {
          photosArr.push(fileobj);
        } else {
          alert("확장명이 JPG나 PNG가 아닙니다");
        }
        setFile({
          ...file,
          photos: [...photos, ...photosArr],
        });
      });
    }
  };
  const handledelete = (e: any) => {
    let target = e.target.parentElement;
    let targetindex = target.dataset.imgindex * 1;
    setFile({
      ...file,
      photos: [
        ...photos.slice(0, targetindex),
        ...photos.slice(targetindex + 1),
      ],
    });
  };
  const handlehighlight = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };
  const handleunhighlight = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };
  const handledrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    let files = dt.files;
    setHighlight(false);
    handfiles(files);
  };
  console.log(file);
  return (
    <div className="max-w-[380px] mx-auto">
      <div className="mt-9 text-left text-[14px] leading-[21px]">파일첨부</div>
      <div className="mt-[14px] text-left text-[#616161] text-[14px] leading-[21px]">
        JPG, PNG 이미지 파일을 올릴 수 있습니다.
        <br />한 장당 20MB, 1회 50MB까지 올리기 가능합니다.
      </div>
      <div
        onDragEnter={handlehighlight}
        onDragOver={handlehighlight}
        onDragLeave={handleunhighlight}
        onDrop={handledrop}
      >
        <input
          type="file"
          name="photos"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          id="photos"
          onChange={handlefilechange}
          className="hidden"
        />
        <label
          htmlFor="photos"
          className={
            highlight
              ? "block w-[380px] h-[180px] border-solid border-[1px] border-black mt-5 rounded-[10px] mx-auto cursor-pointer bg-slate-300"
              : "block w-[380px] h-[180px] border-dashed border-[1px] border-[#9e9e9e] mt-5 rounded-[10px] mx-auto cursor-pointer"
          }
        >
          <img src={Vector} alt="Vector" className="mx-auto mt-[60px]" />
          <div className="mt-2 text-[#9E9E9E]">여기로 파일을 끌어오세요.</div>
        </label>
      </div>
      <div className="flex justify-center mt-5">
        {photos.length > 0 &&
          photos.map((item: any, index: any) => (
            <div
              className="mr-[10px] justify-center "
              key={index}
              data-imgindex={index}
            >
              <CloseButton className="cursor-pointer" onClick={handledelete}>
                &times;
              </CloseButton>
              <img
                src={item.src}
                alt={item.name}
                className="w-[60px] h-[60px] rounded-[10px] mt-1"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
export default Dropzone;

const CloseButton = tw.div`
  cursor-pointer
  absolute
  w-4
  h-4
  rounded-[50%]
  bg-[#0000d8] 
  text-[#ffffff]
  text-[7px]
  leading-[15.5px]
  ml-[50px]
`;
