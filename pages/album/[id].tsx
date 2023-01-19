import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import spotifyApi from '../../lib/spotify';
import Image from 'next/image';
import { Card, Col, Loading, Row, Spacer, Text } from '@nextui-org/react';
import AlbumSongs from '../../components/AlbumSongs';
import Artists from '../../components/Artists';

function AlbumDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [album, setAlbum] = useState<SpotifyApi.AlbumObjectFull | null>(null);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);

  useEffect(() => {
    setLoadingAlbum(true);
    spotifyApi
      .getAlbum(id as string)
      .then(function (data) {
        setAlbum(data.body);
        console.log(data.body);
        return data.body;
      })
      .then(function (data) {
        setLoadingAlbum(false);
        setLoadingArtists(true);
        spotifyApi
          .getArtists(data.artists.map((artist) => artist.id))
          .then(
            function (data) {
              setArtists(data.body.artists);
              console.log('Artists information', data.body);
            },
            function (err) {
              console.error(err);
            }
          )
          .finally(() => setLoadingArtists(false));
      })
      .catch((err) => console.log('Something went wrong ', err))
      .finally(() => setLoadingAlbum(false));
  }, [id]);

  return (
    <PageLayout title='Album Details'>
      <Card css={{ mw: '100%' }}>
        <Card.Header>
          {loadingAlbum ? (
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
                    src={album?.images[1].url as string}
                    alt='Album Cover image'
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
                    {album?.name || 'No album name'}
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
                  <Text b>Release Date: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {album?.release_date}
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
                  <Text b>Total Songs: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {album?.total_tracks}
                  </Text>
                </Row>
              </Col>
            </Row>
          )}
        </Card.Header>
        <Card.Divider />
        <Spacer y={1} />
        <Card.Body css={{ py: '$10', textAlign: 'center', margin: '0 auto' }}>
          <Text b color='success' h2>
            Album Songs
          </Text>
          <Spacer y={1} />
          <AlbumSongs albumId={id as string} />
          <Spacer y={2} />
          <Card.Divider />
          <Spacer y={2} />
          <Text b color='success' h2>
            Album Artists
          </Text>
          <Spacer y={1} />
          {loadingArtists ? (
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
            <Artists artists={artists} />
          )}
          <Spacer y={2} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
}

export default AlbumDetail;
