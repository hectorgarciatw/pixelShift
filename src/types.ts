export interface FilterOptions {
    brightness: number;
    contrast: number;
    saturation: number;
    grayscale: number;
}

export interface PresetFilter {
    name: string;
    settings: FilterOptions;
}

//Filtros minimalistas
export const presetFilters: PresetFilter[] = [
    { name: 'Normal', settings: { brightness: 100, contrast: 100, saturation: 100, grayscale: 0 } },
    { name: 'Vintage', settings: { brightness: 120, contrast: 90, saturation: 85, grayscale: 30 } },
    { name: 'B&W', settings: { brightness: 100, contrast: 120, saturation: 0, grayscale: 100 } },
    { name: 'Vivid', settings: { brightness: 110, contrast: 110, saturation: 130, grayscale: 0 } },
    { name: 'Faded', settings: { brightness: 90, contrast: 90, saturation: 80, grayscale: 10 } },
];
