import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log(acceptedFiles);
    },
  });

  const images = files.map((file: any) => (
    <img
      key={file.name}
      src={file.preview}
      alt="이미지"
      className="mr-[10px]"
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview);
      }}
    />
  ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>
  //     files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  // }, []);

  return (
    <section className="w-[380px] mx-auto">
      <div className="mt-9 text-left text-[14px] leading-[21px]">파일첨부</div>
      <div className="mt-[14px] text-left text-[#616161] text-[14px] leading-[21px]">
        JPG, PNG 이미지 파일을 올릴 수 있습니다.
        <br />한 장당 20MB, 1회 50MB까지 올리기 가능합니다.
      </div>
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{ width: "380px", height: "180px" }}
      >
        <input {...getInputProps()} />
        <div className="w-[380px] h-[180px] border-dashed border-[1px] border-[#9e9e9e] mt-5 rounded-[10px]">
          여기로 파일을 끌어오세요.
        </div>
      </div>
      <div className="flex w-[60px] h-[60px] mt-7">{images}</div>
    </section>
  );
};
export default Dropzone;
