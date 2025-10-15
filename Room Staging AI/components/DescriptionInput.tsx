// Fix: Implemented the DescriptionInput component.
import React from 'react';

interface DescriptionInputProps {
    value: string;
    onChange: (value: string) => void;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">3. Add Details (Optional)</h3>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g., add a large sectional sofa, a ficus tree in the corner, and make the color palette neutral with pops of blue."
                rows={4}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all placeholder:text-gray-500"
            />
        </div>
    );
};

export default DescriptionInput;
