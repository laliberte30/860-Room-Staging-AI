
import React from 'react';

interface ResultDisplayProps {
    originalImage: string | null;
    stagedImage: string | null;
}

const ImageCard: React.FC<{ imageUrl: string | null; title: string; placeholderText: string }> = ({ imageUrl, title, placeholderText }) => (
    <div className="w-full md:w-1/2 p-2">
        <div className="bg-gray-800/50 rounded-lg p-2 shadow-lg h-full">
            <h3 className="text-xl font-bold text-center mb-3 text-indigo-400">{title}</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-md flex items-center justify-center overflow-hidden h-[400px]">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
                ) : (
                    <p className="text-gray-500">{placeholderText}</p>
                )}
            </div>
        </div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, stagedImage }) => {
    return (
        <div className="flex flex-wrap -m-2">
            <ImageCard imageUrl={originalImage} title="Before" placeholderText="Upload an image to see the original." />
            <ImageCard imageUrl={stagedImage} title="After" placeholderText="Your staged room will appear here." />
        </div>
    );
};

export default ResultDisplay;
