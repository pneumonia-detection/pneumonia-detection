import React, { useState } from "react";

const ImageUploader = ({ onImageUpload }) => {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onImageUpload(file);
        }
    };

    return (
        <div className="mb-4 mr-8">
            <label className="block mb-2 font-semibold" htmlFor="image-uploader">
                Upload an Image:
            </label>
            <input
                type="file"
                id="image-uploader"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-md"
            />
            {preview && (
                <div className="mt-4 bg-white p-6 rounded-lg shadow-md ">
                    <h3 className="text-lg font-semibold mb-4">Image Preview</h3>
                    <img src={preview} alt="Uploaded preview" className="rounded-lg shadow-md w-full" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
