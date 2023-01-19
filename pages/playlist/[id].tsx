import { Card, Col, Loading, Row, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PlaylistSongs from '../../components/PlaylistSongs';
import spotifyApi from '../../lib/spotify';
import Image from 'next/image';

function PlaylistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [playlist, setPlaylist] =
    useState<SpotifyApi.SinglePlaylistResponse | null>(null);

  useEffect(() => {
    setLoadingPlaylist(true);
    spotifyApi
      .getPlaylist(id as string, {
        fields: 'name,images,description,followers',
      })
      .then(
        function (data) {
          setPlaylist(data.body);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingPlaylist(false));
  }, [id]);

  return (
    <PageLayout title='Playlist Details'>
      <Card css={{ mw: '100%' }}>
        <Card.Header>
          {loadingPlaylist ? (
            <Loading
              css={{
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              color='success'
              textColor='success'
              size='xl'></Loading>
          ) : (
            <Row
              dir='column'
              css={{
                flexDirection: 'column',
                gap: '30px',
                '@xs': {
                  flexDirection: 'row',
                  gap: '30px',
                },
              }}
              align='center'
              justify='center'>
              <Col>
                <Row
                  css={{
                    '@xs': {
                      justifyContent: 'flex-end',
                    },
                  }}
                  justify='center'>
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={playlist?.images[0].url as string}
                    alt='Playlist Cover image'
                  />
                </Row>
              </Col>
              <Col
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '30px',
                }}>
                <Row
                  justify='center'
                  css={{
                    '@xs': {
                      justifyContent: 'flex-start',
                    },
                  }}>
                  <Text h2 color='error'>
                    Playlist
                  </Text>
                </Row>
                <Row
                  css={{
                    '@xs': {
                      justifyContent: 'flex-start',
                    },
                  }}
                  justify='center'
                  align='center'>
                  <Text b>Title: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {playlist?.name || 'No playlist name'}
                  </Text>
                </Row>
                <Row
                  css={{
                    '@xs': {
                      justifyContent: 'flex-start',
                    },
                  }}
                  justify='center'
                  align='center'>
                  <Text b>Description: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {playlist?.description}
                  </Text>
                </Row>
                <Row
                  css={{
                    '@xs': {
                      justifyContent: 'flex-start',
                    },
                  }}
                  justify='center'
                  align='center'>
                  <Text b>Followers: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {playlist?.followers.total}
                  </Text>
                </Row>
              </Col>
            </Row>
          )}
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: '$10', textAlign: 'center', margin: '0 auto' }}>
          <Text b color='success' h2>
            Songs
          </Text>
          <Spacer y={1} />
          <PlaylistSongs playlistId={id as string} />
          <Spacer y={2} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
}

export default PlaylistDetail;
