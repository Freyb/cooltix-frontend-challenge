import Image from 'next/image';
import styled from 'styled-components';

const ImageContainer = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 100px;
  height: 100px;
`;

export const CircleImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <ImageContainer>
      <Image src={src} width={100} height={100} alt={alt} />
    </ImageContainer>
  );
};
