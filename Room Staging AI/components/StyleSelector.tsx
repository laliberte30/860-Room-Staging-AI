
import React from 'react';
import { StagingStyle } from '../types';

interface StyleSelectorProps {
    selectedStyle: StagingStyle;
    onStyleChange: (style: StagingStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">2. Choose a Style</h3>
            <select
                value={selectedStyle}
                onChange={(e) => onStyleChange(e.target.value as StagingStyle)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
                {Object.values(StagingStyle).map((style) => (
                    <option key={style} value={style}>
                        {style}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StyleSelector;
