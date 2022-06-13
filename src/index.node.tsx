// fake modules to render empty <canvas /> on SSR side without useless JS, import.meta, webworker, ES modules
import React, { FC } from 'react';
import type { BlurhashProps, BlurhashCanvasProps } from './types'
import { absoluteStyle, defaultStyle } from './style'
import { blurhashDefaultProps, blurhashCanvasDefaultProps } from './props'

export const BlurhashCanvas: FC<BlurhashCanvasProps> = ({ loading, hash, width, height, punch, imageRef, ...props }) => (
    <canvas {...props} height={height} width={width} />
)

BlurhashCanvas.defaultProps = blurhashCanvasDefaultProps

export const Blurhash: FC<BlurhashProps> = ({ loading, hash, height, width, punch, resolutionX, resolutionY, style, imageRef, ...props }) => (
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
            style={absoluteStyle}
            imageRef={imageRef}
        />
    </div>
)

Blurhash.defaultProps = blurhashDefaultProps