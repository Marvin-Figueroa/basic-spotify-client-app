import { Badge, Card, Col, Row } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

type ArtistProps = {
  artist: SpotifyApi.ArtistObjectFull;
};

function Artist({ artist }: ArtistProps) {
  return (
    <Link
      href={{
        pathname: '/artist/[id]',
        query: { id: artist.id },
      }}>
      <Card css={{ w: '100%', h: '300px' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col dir='colum'>
            <Badge color='error'>{artist.name}</Badge>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={artist.images[1]?.url}
            width='100%'
            height='100%'
            objectFit='cover'
            alt='Artist Image'
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: 'absolute',
            bgBlur: '#ffffff66',
            borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
            bottom: 0,
            zIndex: 1,
          }}>
          <Row justify='flex-start'>
            <Col>
              <Row justify='center' align='center'>
                <Badge size='md' variant='flat'>
                  ARTIST
                </Badge>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default Artist;
