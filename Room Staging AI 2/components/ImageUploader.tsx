import React, { useRef, useState } from 'react';
import CameraView from './CameraView';

interface ImageUploaderProps {
    onFileSelect: (file: File) => void;
    imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect, imagePreviewUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showCamera, setShowCamera] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onFileSelect(event.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleCameraClick = () => {
        setShowCamera(true);
    };
    
    const handleTakePhoto = (file: File) => {
        onFileSelect(file);
        setShowCamera(false);
    };
    
    const handleCancelCamera = () => {
        setShowCamera(false);
    };

    return (
        <div className="w-full">
            {showCamera && <CameraView onTakePhoto={handleTakePhoto} onCancel={handleCancelCamera} />}

            <h3 className="text-lg font-semibold text-gray-300 mb-2">1. Add an Empty Room Photo</h3>
            <div
                className="group relative w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400 bg-gray-800/50 transition-all p-2"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp"
                />
                {imagePreviewUrl ? (
                    <>
                       <img src={imagePreviewUrl} alt="Room Preview" className="absolute inset-0 w-full h-full object-contain rounded-lg p-2" />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity">
                            <button onClick={handleUploadClick} className="bg-white/90 text-black font-bold py-2 px-4 rounded-md text-sm">Change File</button>
                            <button onClick={handleCameraClick} className="bg-white/90 text-black font-bold py-2 px-4 rounded-md text-sm">Retake</button>
                       </div>
                    </>
                ) : (
                     <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={handleUploadClick}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            Upload File
                        </button>
                        <span className="text-gray-500">or</span>
                        <button
                            onClick={handleCameraClick}
                            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M2 6a2 2 0 012-2h1.172a2 2 0 011.414.586l.828.828A2 2 0 008.828 6H12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm5 2a3 3 0 100 6 3 3 0 000-6z" />
                            </svg>
                            Use Camera
                        </button>
                    </div>
                )}
            </div>
             {imagePreviewUrl && (
                 <p className="text-xs text-gray-500 text-center mt-2">Hover over the image to change or retake.</p>
             )}
        </div>
    );
};

export default ImageUploader;