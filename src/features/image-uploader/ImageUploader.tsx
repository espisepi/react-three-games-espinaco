import type React from "react"
import { useState } from "react"

const ImageUploader: React.FC = () => {
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files)
      setImages(prev => [...prev, ...filesArray])

      const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file))
      setPreviewUrls(prev => [...prev, ...newPreviewUrls])
    }
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div>
      <h2>Upload and Preview Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{
            position: "absolute",
            top: 0,
            zIndex: 999999
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {previewUrls.map((url, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "150px",
              height: "150px",
              overflow: "hidden",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <img
              src={url}
              alt={`Preview ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUploader
