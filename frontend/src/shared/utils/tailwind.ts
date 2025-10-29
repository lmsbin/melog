import { EN_ALIGN_OPTION } from '../enum';

// ========== Scale ==========
export type SupportedScale = 0 | 50 | 75 | 90 | 95 | 100 | 105 | 110 | 125 | 150 | 200;

const SCALE_CLASS_BY_PERCENT: Record<SupportedScale, string> = {
    0: 'scale-0',
    50: 'scale-50',
    75: 'scale-75',
    90: 'scale-90',
    95: 'scale-95',
    100: '',
    105: 'scale-105',
    110: 'scale-110',
    125: 'scale-125',
    150: 'scale-150',
    200: 'scale-200',
};

function getScaleClass(scale: SupportedScale): string {
    return SCALE_CLASS_BY_PERCENT[scale];
}

// ========== Width & Height ==========
export type SupportedSize = 'full' | 'fit';

const SIZE_CLASS_MAP: Record<SupportedSize, string> = {
    full: 'full',
    fit: 'fit',
};

function getWidthClass(width: 'full' | 'fit' | string): string {
    if (width === 'full' || width === 'fit') {
        return `w-${SIZE_CLASS_MAP[width]}`;
    }

    return `w-${width}`;
}

function getHeightClass(height: 'full' | 'fit' | string): string {
    if (height === 'full' || height === 'fit') {
        return `h-${SIZE_CLASS_MAP[height]}`;
    }
    return `h-${height}`;
}

function getMaxHeightClass(height: 'full' | 'fit' | string): string {
    if (height === 'full' || height === 'fit') {
        return `max-h-${SIZE_CLASS_MAP[height]}`;
    }
    return `max-h-${height}`;
}

// ========== Alignment ==========
const JUSTIFY_CLASS_MAP: Record<EN_ALIGN_OPTION, string> = {
    [EN_ALIGN_OPTION.START]: 'justify-start',
    [EN_ALIGN_OPTION.CENTER]: 'justify-center',
    [EN_ALIGN_OPTION.END]: 'justify-end',
};

const ITEMS_CLASS_MAP: Record<EN_ALIGN_OPTION, string> = {
    [EN_ALIGN_OPTION.START]: 'items-start',
    [EN_ALIGN_OPTION.CENTER]: 'items-center',
    [EN_ALIGN_OPTION.END]: 'items-end',
};

function getJustifyClass(align: EN_ALIGN_OPTION): string {
    return JUSTIFY_CLASS_MAP[align];
}

function getItemsClass(align: EN_ALIGN_OPTION): string {
    return ITEMS_CLASS_MAP[align];
}

// ========== Border Spacing ==========
function getBorderSpacingXClass(space: number): string {
    return `border-spacing-x-${space}`;
}

function getBorderSpacingYClass(space: number): string {
    return `border-spacing-y-${space}`;
}

// ========== Export ==========
export const tw = {
    getScaleClass,
    getWidthClass,
    getHeightClass,
    getMaxHeightClass,
    getJustifyClass,
    getItemsClass,
    getBorderSpacingXClass,
    getBorderSpacingYClass,
};
