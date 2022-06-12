import React, { FC } from 'react'
import styled from 'styled-components';
import { Blurhash, BlurhashCanvas } from '../src';

const hash = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj'

const items = [...Array(1024).keys()]

const Stress: FC<{ async?: boolean }> = ({ async }) => <>
    <p>Stress test</p>
    {items.map(i => (
        <Blurhash
            key={i}
            hash={hash}
            punch={2}
            loading={async ? 'lazy' : 'eager'}
            width={32}
            height={32}
        />
    ))}
</>

export default Stress;
