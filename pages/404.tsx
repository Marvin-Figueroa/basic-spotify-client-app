import Link from 'next/link';
import React from 'react';
import { Container, Text, Link as UILink, Spacer } from '@nextui-org/react';
import Head from 'next/head';
import Image from 'next/image';

function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
      </Head>

      <Container
        display='flex'
        direction='column'
        justify='center'
        alignItems='center'
        css={{ textAlign: 'center' }}
        lg>
        <Text h1 color='error'>
          Oops!
        </Text>
        <Image
          src='/page_not_found.svg'
          alt='A 404 page not found image'
          width={500}
          height={400}
        />
        <Spacer y={1} />
        <Text b h3 color='error'>
          Sorry 😔, we couldn&apos;t find what you were looking for.
        </Text>
        <Spacer y={1} />
        <UILink css={{ border: '1px solid #1DB954' }} block color='success'>
          <Link href='/'>
            <Text color='#1DB954'>Go Home</Text>
          </Link>
        </UILink>
      </Container>
    </>
  );
}

export default NotFound;
