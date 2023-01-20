import { Badge, Card, Col, Row, Spacer, Switch } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useSpotify from '../hooks/useSpotify';

type SongProps = {
  song: SpotifyApi.TrackObjectFull;
  saved: boolean;
};

function Song({ song, saved }: SongProps) {
  const spotifyApi = useSpotify();
  const [isSaved, setIsSaved] = useState(saved);
  useEffect(() => setIsSaved(saved), [saved]);

  function handleSaveChange() {
    if (!isSaved) {
      spotifyApi.addToMySavedTracks([song.id]).then(
        function (data) {
          setIsSaved(true);
        },
        function (err) {
          alert(err);
        }
      );
    } else {
      spotifyApi.removeFromMySavedTracks([song.id]).then(
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
          pathname: '/song/[id]',
          query: { id: song.id },
        }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col dir='colum'>
            <Badge color='success'>{song.name}</Badge>
            <Spacer y={1} />
            <Badge color='default'>
              {song.artists
                .map((art) => art.name)
                .slice(0, 2)
                .join(' & ')}
            </Badge>
          </Col>
        </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={song.album.images[1].url}
            width='100%'
            height='100%'
            objectFit='cover'
            alt='Song cover image'
          />
        </Card.Body>
      </Link>
      <Card.Footer>
        <Row>
          <Col>
            <Row justify='space-between' align='center'>
              <Badge size='md' variant='flat'>
                SONG
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

export default Song;
