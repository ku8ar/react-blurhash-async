import React, { FC } from 'react';
import type { BlurhashProps } from './types'
import { absoluteStyle, defaultStyle } from './style'
import { blurhashDefaultProps } from './props'
import BlurhashCanvas from './BlurhashCanvas'

const Blurhash: FC<BlurhashProps> = ({ loading, hash, height, width, punch, resolutionX, resolutionY, style, imageRef, ...props }) => (
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

export default Blurhash