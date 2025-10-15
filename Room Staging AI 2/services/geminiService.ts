import { StagingStyle } from '../types';

// Helper function to convert File to a base64 string.
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                // The result includes the data URL prefix (e.g., "data:image/jpeg;base64,"),
                // so we need to remove it.
                resolve(reader.result.split(',')[1]);
            } else {
                reject('Failed to read file as base64 string');
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};


export const stageRoom = async (
    imageFile: File,
    style: StagingStyle,
    description: string
): Promise<string> => {
    try {
        const base64Data = await fileToBase64(imageFile);
        
        // Call our own backend API endpoint
        const response = await fetch('/api/stage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                image: {
                    data: base64Data,
                    mimeType: imageFile.type,
                },
                style,
                description,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'An unknown server error occurred' }));
            throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.error || 'No error details'}`);
        }

        const result = await response.json();
        
        if (result.imageUrl) {
            return result.imageUrl;
        } else {
            throw new Error("API did not return a valid image URL.");
        }

    } catch (error) {
        console.error("Error staging room:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to stage the room: ${error.message}`);
        }
        throw new Error("Failed to stage the room. Please check the console for more details.");
    }
};