
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="py-4 px-8 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 w-full sticky top-0 z-10">
            <div className="container mx-auto flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl">
                    C
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Clayton 860 <span className="text-indigo-400">Staging AI</span>
                </h1>
            </div>
        </header>
    );
};

export default Header;
