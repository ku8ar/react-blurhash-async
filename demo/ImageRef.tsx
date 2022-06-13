import React, { FC, useRef } from 'react';
import styled from 'styled-components';
import { Blurhash, BlurhashCanvas } from '../src';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const Blur = styled(Blurhash)`
    width: 50% !important;
    height: 300px !important;
`
const Image = styled.img`
    width: 50%;
    height: 300px;
`;

const hash = 'Lq9JN0gOkCocPEbbf+axVFi^a$bI'
const img = 'https://static.euronews.com/articles/stories/06/70/77/30/1100x619_cmsv2_3c21dc67-a995-59d4-861a-35b69a9d7602-6707730.jpg'


const ImageRefDemo: FC = () => {
    const ref = useRef<HTMLImageElement>(null)

    return (
        <>
            <p>If you are entering here for the first time, you will see a generated blurHash on the left side. But When you enter this page again (when image is already cached in browser's memory), blurHash will not be generated.</p>
            <Wrapper>
                <Blur hash={hash} punch={2} loading={'lazy'} imageRef={ref} />
                <Image src={img} ref={ref} />
            </Wrapper>
        </>
    );
}

export default ImageRefDemo;
