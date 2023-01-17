import { Badge, Card, Col, Row, Switch } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdQueueMusic } from 'react-icons/md';
import useSpotify from '../hooks/useSpotify';

type AlbumProps = {
  album: SpotifyApi.AlbumObjectSimplified;
  saved: boolean;
};

function Album({ album, saved }: AlbumProps) {
  const spotifyApi = useSpotify();
  const [isSaved, setIsSaved] = useState(saved);
  useEffect(() => setIsSaved(saved), [saved]);

  console.log('album', album.name);
  console.log('is saved', saved);

  function handleSaveChange() {
    if (!isSaved) {
      // Add albums to the signed in user's Your Music library
      spotifyApi.addToMySavedAlbums([album.id]).then(
        function (data) {
          console.log('Album added!', data);
          setIsSaved(true);
        },
        function (err) {
          alert(err);
          console.log('Something went wrong!', err);
        }
      );
    } else {
      // Remove albums from the signed in user's Your Music library
      spotifyApi.removeFromMySavedAlbums([album.id]).then(
        function (data) {
          console.log('Album Removed!', data);
          setIsSaved(false);
        },
        function (err) {
          alert(err);
          console.log('Something went wrong!', err);
        }
      );
    }
  }

  return (
    <Card css={{ w: '100%', h: '300px' }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Col dir='colum'>
          <Link
            href={{
              pathname: '/album/[id]',
              query: { id: album.id },
            }}>
            <Badge color='error'>{album.name}</Badge>
          </Link>
        </Col>
      </Card.Header>
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={album.images[1].url}
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
              <Badge size='md' variant='flat'>
                ALBUM
              </Badge>
              <Badge color='secondary' variant='flat'>
                <MdQueueMusic color='#1DB954' size={20} />
                {album.total_tracks}
              </Badge>
              <Switch
                color='success'
                checked={isSaved}
                size='lg'
                iconOn={<FaHeart />}
                iconOff={<FaRegHeart />}
                onChange={handleSaveChange}
              />
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default Album;
