import Image from 'next/image';
import styled from 'styled-components';

const ImageContainer = styled.div<{ $size: number }>`
  border-radius: 50%;
  overflow: hidden;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

export const CircleImage = ({ src, alt, size }: { src: string; alt: string; size: number }) => {
  return (
    <ImageContainer $size={size}>
      <Image src={src} width={size} height={size} alt={alt} />
    </ImageContainer>
  );
};