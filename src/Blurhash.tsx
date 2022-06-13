import React, { FC, CSSProperties } from 'react';

import BlurhashCanvas from './BlurhashCanvas';

type Props = React.HTMLAttributes<HTMLDivElement> & {
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

const canvasStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
};

const defaultStyle: CSSProperties = { display: 'inline-block', position: 'relative' }

const Blurhash: FC<Props> = ({ loading, hash, height = 128, width = 128, punch, resolutionX = 32, resolutionY = 32, style, imageRef, ...props }) => {
  if (resolutionX <= 0) {
    console.error('resolutionX must be larger than zero')
    return null
  }

  if (resolutionY <= 0) {
    console.error('resolutionY must be larger than zero')
    return null
  }

  return (
    <div
      {...props}
      style={{ ...defaultStyle, width, height, ...style }}
    >
      <BlurhashCanvas
        loading={loading}
        hash={hash}
        height={resolutionY}
        width={resolutionX}
        punch={punch}
        style={canvasStyle}
        imageRef={imageRef}
      />
    </div>
  )
}

export default Blurhash