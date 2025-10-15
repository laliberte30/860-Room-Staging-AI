// Fix: Implemented the main App component to manage state and UI.
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import DescriptionInput from './components/DescriptionInput';
import { StagingStyle } from './types';
import { stageRoom } from './services/geminiService';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StagingStyle>(StagingStyle.Modern);
  const [description, setDescription] = useState('');
  const [stagedImageUrl, setStagedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    // Revoke the old object URL to prevent memory leaks
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);
    setStagedImageUrl(null); // Clear previous result when new image is uploaded
  }, [imagePreviewUrl]);

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStagedImageUrl(null);

    try {
      const resultImageUrl = await stageRoom(selectedFile, selectedStyle, description);
      setStagedImageUrl(resultImageUrl);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      {isLoading && <Loader />}
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Column */}
          <div className="flex flex-col gap-6 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
            <ImageUploader onFileSelect={handleFileSelect} imagePreviewUrl={imagePreviewUrl} />
            <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
            <DescriptionInput value={description} onChange={setDescription} />
            <button
              onClick={handleSubmit}
              disabled={!selectedFile || isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-md transition-all text-lg flex items-center justify-center gap-2"
            >
              {isLoading ? 'Staging...' : 'Stage My Room'}
            </button>
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </div>

          {/* Results Column */}
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
             <ResultDisplay originalImage={imagePreviewUrl} stagedImage={stagedImageUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
