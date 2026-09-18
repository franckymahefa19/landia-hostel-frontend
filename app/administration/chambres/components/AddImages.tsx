import Image from "next/image";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

type AddImagesProps = {
  isMobile: boolean;
  files: any;
  selectedImages: string;
  setSelectedImages: (image: string | null) => void;
  changeImage: () => string;
  handleFileChange: (e: any, index: number) => void;
  preview: any;
  height: string;
  resetImages: ()=>void;
};

const AddImages = ({
  height,
  files,
  selectedImages,
  setSelectedImages,
  changeImage,
  handleFileChange,
  preview,
  resetImages
}: AddImagesProps) => {

   
  return (
    <>
      <div
        className="w-full rounded-lg bg-muted relative"
        style={{ height: height }}
      >
        {files.image1 !== "" ? (
          selectedImages && (
            <Image
              src={selectedImages}
              alt="chambre"
              fill
              className="object-cover z-10"
            />
          )
        ) : (
          <p className="text-muted-foreground/60 absolute top-[50%] translate-y-[-50%] text-center w-full italic text-sm">
            Aucune image sélectioné
          </p>
        )}
        <input
          type="file"
          className="absolute inset-0 opacity-0 z-20"
          accept="image/*"
          onChange={(e) => {
            const cle = changeImage();
            const index = cle.at(-1);
            index
              ? handleFileChange(e, parseInt(index))
              : handleFileChange(e, 1);
          }}
        />
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        <div
          onClick={() => {
            preview.image1 !== "" && setSelectedImages(preview.image1);
          }}
          className={`rounded-md  h-[50px] flex justify-center items-center relative
                 cursor-pointer active:scale-90 transition-transform duration-300 overflow-hidden 
                 ${selectedImages === preview.image1 ? "border-2 border-principal" : "border border-border"}`}
        >
          <IoMdAddCircleOutline
            size={20}
            className="text-muted-foreground font-light"
          />
          <input
            type="file"
            className="absolute inset-0 opacity-0"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 1)}
          />
          {preview.image1 !== "" && (
            <Image
              src={preview.image1}
              alt="chambre"
              fill
              className="object-cover"
            />
          )}
        </div>
        {files.image1 !== "" && (
          <div
            onClick={() => {
              preview.image2 !== "" && setSelectedImages(preview.image2);
            }}
            className={`rounded-md  h-[50px] flex justify-center items-center relative
                 cursor-pointer active:scale-90 transition-transform duration-300 overflow-hidden 
                 ${selectedImages === preview.image2 ? "border-2 border-principal" : "border border-border"}`}
          >
            <IoMdAddCircleOutline
              size={20}
              className="text-muted-foreground font-light"
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 2)}
            />
            {preview.image2 !== "" && (
              <Image
                src={preview.image2}
                alt="chambre"
                fill
                className="object-cover"
              />
            )}
          </div>
        )}
        {files.image2 !== "" && (
          <div
            onClick={() => {
              preview.image3 !== "" && setSelectedImages(preview.image3);
            }}
            className={`rounded-md  h-[50px] flex justify-center items-center relative
                 cursor-pointer active:scale-90 transition-transform duration-300 overflow-hidden 
                 ${selectedImages === preview.image3 ? "border-2 border-principal" : "border border-border"}`}
          >
            <IoMdAddCircleOutline
              size={20}
              className="text-muted-foreground font-light"
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 3)}
            />
            {preview.image3 !== "" && (
              <Image
                src={preview.image3}
                alt="chambre"
                fill
                className="object-cover"
              />
            )}
          </div>
        )}
        {files.image3 !== "" && (
          <div
            onClick={() => {
              preview.image4 !== "" && setSelectedImages(preview.image4);
            }}
            className={`rounded-md  h-[50px] flex justify-center items-center relative
                 cursor-pointer active:scale-90 transition-transform duration-300 overflow-hidden 
                 ${selectedImages === preview.image4 ? "border-2 border-principal" : "border border-border"}`}
          >
            <IoMdAddCircleOutline
              size={20}
              className="text-muted-foreground font-light"
            />
            <input
              type="file"
              className="absolute inset-0 opacity-0"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 4)}
            />
            {preview.image4 !== "" && (
              <Image
                src={preview.image4}
                alt="chambre"
                fill
                className="object-cover"
              />
            )}
          </div>
        )}
      </div>
      <div className="w-full text-center mt-3">
        <button
          type="button"
          onClick={resetImages}
          className={`inline-flex items-center justify-center gap-1.5 text-xs font-medium text-destructive
           bg-destructive/10 hover:bg-destructive border border-destructive/30 hover:border-transparent py-1.5 px-8 
           rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 
           focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer
           ${files.image1 === "" ? 'bg-muted text-muted-foreground border border-muted hover:bg-muted hover:text-muted-foreground' : 'hover:text-white'}`}
        >
          
          <IoTrash size={16} />
        </button>
      </div>
    </>
  );
};

export default AddImages;
