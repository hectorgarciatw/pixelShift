import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ImageDisplay from './components/ImageDisplay';
import { FilterOptions, PresetFilter, presetFilters } from './types';
import { Moon, Sun } from 'lucide-react';

const initialFilters: FilterOptions = presetFilters[0].settings;

function App() {
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);
    const [image, setImage] = useState<string | null>(null);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const handleFilterChange = (filterName: keyof FilterOptions, value: number) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePresetChange = (preset: PresetFilter) => {
        setFilters(preset.settings);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
            <Sidebar filters={filters} onFilterChange={handleFilterChange} onImageUpload={handleImageUpload} onPresetChange={handlePresetChange} presetFilters={presetFilters} />
            <ImageDisplay filters={filters} image={image} />
            <button onClick={toggleDarkMode} className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
        </div>
    );
}

export default App;
