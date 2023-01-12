import React from 'react';
import { getProviders, signIn } from 'next-auth/react';
import { Provider } from 'next-auth/providers';
import Image from 'next/image';
import spotifyLogo from '../public/spotify-logo.png';
import { Button, Container } from '@nextui-org/react';

type LoginProps = {
  providers: Provider[];
};

function Login({ providers }: LoginProps) {
  return (
    <Container
      display='flex'
      alignItems='center'
      justify='center'
      direction='column'
      gap={10}
      css={{
        minHeight: '100vh',
        gap: '40px',
        backgroundColor: '#191414',
      }}
      responsive
      lg>
      <Image
        src={spotifyLogo}
        alt='Spotify Logo'
        priority
        width={200}
        height={200}
        placeholder='blur' // Optional blur-up while loading
      />
      {Object.values(providers).map((provider) => (
        <Button
          key={provider.id}
          rounded
          auto
          ghost
          size='lg'
          color='success'
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
          Login with {provider.name}
        </Button>
      ))}
    </Container>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
