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

  function handleSaveChange() {
    if (!isSaved) {
      spotifyApi.addToMySavedAlbums([album.id]).then(
        function (data) {
          setIsSaved(true);
        },
        function (err) {
          alert(err);
        }
      );
    } else {
      spotifyApi.removeFromMySavedAlbums([album.id]).then(
        function (data) {
          setIsSaved(false);
        },
        function (err) {
          alert(err);
        }
      );
    }
  }

  return (
    <Card css={{ w: '100%', h: '300px' }}>
      <Link
        href={{
          pathname: '/album/[id]',
          query: { id: album.id },
        }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col dir='colum'>
            <Badge color='error'>{album.name}</Badge>
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
      </Link>
      <Card.Footer>
        <Row>
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
