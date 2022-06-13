export type BlurhashProps = React.HTMLAttributes<HTMLDivElement> & {
    hash: string;
    /** CSS height, default: 128 */
    height?: number | string | 'auto';
    punch?: number;
    resolutionX?: number;
    resolutionY?: number;
    style?: React.CSSProperties;
    /** CSS width, default: 128 */
    width?: number | string | 'auto';
    loading?: 'eager' | 'lazy';
    imageRef?: React.MutableRefObject<HTMLImageElement | null>;
};

export type BlurhashCanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement> & {
    hash: string;
    height?: number;
    punch?: number;
    width?: number;
    loading?: 'eager' | 'lazy'
    imageRef?: React.MutableRefObject<HTMLImageElement | null>;
};