import { Card, Loading, Row, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import PageLayout from '../../components/PageLayout';
import spotifyApi from '../../lib/spotify';

function SongDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState<SpotifyApi.SingleTrackResponse | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    setLoading(true);
    spotifyApi
      .getTrack(id as string)
      .then(
        function (data) {
          setSong(data.body);
        },
        function (err) {
          console.log('Something went wrong', err);
        }
      )
      .finally(() => setLoading(false));
  }, [id]);

  function handlePlay() {
    spotifyApi.play({ uris: [song?.uri as string] }).then(
      function () {
        setIsPlaying(true);
        console.log('Playback started');
      },
      function (err) {
        alert(err);
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  }

  function handlePause() {
    spotifyApi.pause().then(
      function () {
        setIsPlaying(false);
      },
      function (err) {
        alert(err);
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
    setIsPlaying(false);
  }

  return (
    <PageLayout title='Song Play'>
      {loading ? (
        <Loading
          css={{
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          color='success'
          textColor='success'
          size='xl'>
          Loading...
        </Loading>
      ) : (
        <Card css={{ width: '380px', height: '480px', margin: '0 auto' }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              showSkeleton
              src={song?.album.images[0].url as string}
              objectFit='cover'
              width='100%'
              height='100%'
              alt='Song Cover Image'
            />
          </Card.Body>
          <Card.Footer
            css={{
              height: '180px',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              textAlign: 'center',
            }}>
            <Row
              css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <Text b>{song?.name}</Text>
              <Text>
                {song?.artists.map((artist) => artist.name).join(', ')}
              </Text>
            </Row>
            <Row
              css={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              {isPlaying ? (
                <FaPauseCircle
                  onClick={handlePause}
                  color='#1DB954'
                  size={30}
                />
              ) : (
                <FaPlayCircle onClick={handlePlay} color='#1DB954' size={30} />
              )}
            </Row>
          </Card.Footer>
        </Card>
      )}
    </PageLayout>
  );
}

export default SongDetail;
