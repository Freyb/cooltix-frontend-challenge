import Image from 'next/image';

export default function Loading() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image src="/logo_square_animated.svg" height={200} width={200} alt="logo_square" />
      </div>
      <main></main>
    </>
  );
}
