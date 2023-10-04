import Image from 'next/image';

export const SocialMediaButton = ({ src, href, size }: { src: string; href: string; size: number }) => {
  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div>
          <Image src={src} alt={src} width={size} height={size} />
        </div>
      </a>
    </div>
  );
};
