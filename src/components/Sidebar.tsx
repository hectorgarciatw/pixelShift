import React from 'react';
import { Sliders, Upload } from 'lucide-react';
import { FilterOptions, PresetFilter } from '../types';

interface SidebarProps {
    filters: FilterOptions;
    onFilterChange: (filterName: keyof FilterOptions, value: number) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPresetChange: (preset: PresetFilter) => void;
    presetFilters: PresetFilter[];
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, onImageUpload, onPresetChange, presetFilters }) => {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800 dark:text-white">
                <Sliders className="mr-2" /> PixelShift
            </h2>
            <div className="mb-4">
                <label className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue-600">
                    <Upload className="mr-2" />
                    <span className="text-base leading-normal">Cargar imagen</span>
                    <input type="file" className="hidden" onChange={onImageUpload} accept="image/*" />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filtros predefinidos</label>
                <select
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    onChange={(e) => {
                        const selectedPreset = presetFilters.find((preset) => preset.name === e.target.value);
                        if (selectedPreset) onPresetChange(selectedPreset);
                    }}
                >
                    {presetFilters.map((preset) => (
                        <option key={preset.name} value={preset.name}>
                            {preset.name}
                        </option>
                    ))}
                </select>
            </div>
            {/* Renderizado de los slider asociados a los filtros  */}
            {Object.entries(filters).map(([filterName, value]) => (
                <div key={filterName} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{filterName.charAt(0).toUpperCase() + filterName.slice(1)}</label>
                    <input type="range" min="0" max={filterName === 'grayscale' ? 100 : 200} value={value} onChange={(e) => onFilterChange(filterName as keyof FilterOptions, Number(e.target.value))} className="w-full" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{value}</span>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
