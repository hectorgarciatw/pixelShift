import React, { useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import { FilterOptions } from '../types';

interface ImageDisplayProps {
    filters: FilterOptions;
    image: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ filters, image }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (image && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                applyFilters(ctx);
            };
            img.src = image;
        }
    }, [image, filters]);

    const applyFilters = (ctx: CanvasRenderingContext2D | null) => {
        if (ctx) {
            ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        grayscale(${filters.grayscale}%)
      `;
            ctx.drawImage(ctx.canvas, 0, 0);
            ctx.filter = 'none';
        }
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            const link = document.createElement('a');
            link.download = 'filtered_image.png';
            link.href = canvasRef.current.toDataURL();
            link.click();
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-200 dark:bg-gray-700">
            {image ? (
                <>
                    <canvas ref={canvasRef} className="max-w-full max-h-[80vh] object-contain shadow-lg" />
                    <button onClick={handleDownload} className="mt-4 flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg tracking-wide uppercase border border-green cursor-pointer hover:bg-green-600">
                        <Download className="mr-2" />
                        Descargar imagen
                    </button>
                </>
            ) : (
                <div className="text-gray-500 dark:text-gray-400 text-lg">Por favor, carga una imagen para comenzar</div>
            )}
        </div>
    );
};

export default ImageDisplay;
