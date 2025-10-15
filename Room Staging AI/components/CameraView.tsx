import React, { useRef, useEffect, useState } from 'react';

interface CameraViewProps {
    onTakePhoto: (file: File) => void;
    onCancel: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onTakePhoto, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                // Prefer the rear camera on mobile devices
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access the camera. Please check browser permissions and try again.");
            }
        };

        startCamera();

        return () => {
            // Cleanup: stop all tracks on the stream when the component unmounts
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
        // The empty dependency array is intentional to run this effect only once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleTakePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        
        // Set canvas dimensions to match the video feed for an accurate capture
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        if (!context) return;
        
        // Draw the current video frame onto the hidden canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to a Blob, then create a File object
        canvas.toBlob((blob) => {
            if (blob) {
                const photoFile = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
                onTakePhoto(photoFile);
            }
        }, 'image/jpeg', 0.95); // Use high-quality JPEG compression
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
            {error ? (
                <div className="text-center text-red-400">
                    <p className="text-lg">{error}</p>
                    <button onClick={onCancel} className="mt-4 bg-gray-700 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-600 transition-all">
                        Close
                    </button>
                </div>
            ) : (
                <>
                    <video ref={videoRef} autoPlay playsInline className="w-full max-w-3xl h-auto rounded-lg mb-4 bg-gray-900"></video>
                    <canvas ref={canvasRef} className="hidden" aria-hidden="true"></canvas>
                    <div className="flex items-center gap-8">
                        <button onClick={onCancel} className="bg-gray-700 text-white font-bold py-3 px-6 rounded-full hover:bg-gray-600 transition-all" aria-label="Cancel camera">
                            Cancel
                        </button>
                        <button onClick={handleTakePhoto} className="bg-indigo-600 text-white font-bold p-4 rounded-full hover:bg-indigo-700 transition-all ring-4 ring-white/20" aria-label="Take Photo">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h1.172a2 2 0 011.414.586l.828.828A2 2 0 008.828 6H12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm5 2a3 3 0 100 6 3 3 0 000-6z" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CameraView;
