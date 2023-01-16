import { Badge, Card, Col, Row } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { MdQueueMusic } from 'react-icons/md';

type PlaylistProps = {
  playlist: SpotifyApi.PlaylistObjectSimplified;
};

function Playlist({ playlist }: PlaylistProps) {
  return (
    <Link
      href={{
        pathname: '/playlist/[id]',
        query: { id: playlist.id },
      }}>
      <Card css={{ w: '100%', h: '300px' }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col dir='colum'>
            <Badge color='error'>{playlist.name}</Badge>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={playlist.images[0].url}
            width='100%'
            height='100%'
            objectFit='cover'
            alt='Playlist Image'
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
              <Row justify='space-between' align='center'>
                <Badge variant='flat'>PLAYLIST</Badge>
                <Badge color='secondary' variant='flat'>
                  <MdQueueMusic color='#1DB954' size={20} />
                  {playlist.tracks.total}
                </Badge>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default Playlist;
