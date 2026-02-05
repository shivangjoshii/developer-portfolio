"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";

export default function CloudinaryUpload({ onUpload, currentImage }) {
  const [imageUrl, setImageUrl] = useState(currentImage || "");
  const [loading, setLoading] = useState(false);

  const handleUpload = (result) => {
    if (result.event === "success") {
      const url = result.info.secure_url;
      setImageUrl(url);
      onUpload(url);
    }
  };

  const handleRemove = () => {
    setImageUrl("");
    onUpload("");
  };

  return (
    <div className="space-y-3">
      <label className="block text-[#d3d8e8] mb-2">Project Image *</label>

      {imageUrl && (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-[#353a52]">
          <Image
            src={imageUrl}
            alt="Project"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
          >
            <MdClose size={20} />
          </button>
        </div>
      )}

      <div className="upload-widget">
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_projects"}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="w-full bg-[#1b2c68a0] hover:bg-[#16f2b3] hover:text-[#0d1224] text-[#16f2b3] font-bold py-2 rounded-lg transition-all duration-300"
            >
              {imageUrl ? "Change Image" : "Upload Image"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {!imageUrl && (
        <p className="text-xs text-[#7a8599]">
          Click to upload your project image to Cloudinary
        </p>
      )}
    </div>
  );
}
