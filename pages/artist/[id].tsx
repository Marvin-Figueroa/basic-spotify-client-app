import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import spotifyApi from '../../lib/spotify';
import Image from 'next/image';
import { Card, Col, Loading, Row, Spacer, Text } from '@nextui-org/react';
import ArtistAlbums from '../../components/ArtistAlbums';
import ArtistTopSongs from '../../components/ArtistTopSongs';
import ArtistRelatedArtists from '../../components/ArtistRelatedArtists';

function ArtistDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [loadingArtist, setLoadingArtist] = useState(false);
  const [artist, setArtist] = useState<SpotifyApi.SingleArtistResponse | null>(
    null
  );

  useEffect(() => {
    setLoadingArtist(true);
    spotifyApi
      .getArtist(id as string)
      .then(
        function (data) {
          setArtist(data.body);
        },
        function (err) {alert(err)
        }
      )
      .finally(() => setLoadingArtist(false));
  }, [id]);

  return (
    <PageLayout title='Artist Details'>
      <Card css={{ mw: '100%' }}>
        <Card.Header>
          {loadingArtist ? (
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
                    src={artist?.images[1].url as string}
                    alt='Artist Cover image'
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
                  <Text b>Name: </Text>
                  <Spacer x={1} />
                  <Text b color='success'>
                    {artist?.name || 'No artist name'}
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
                    {artist?.followers.total || 0}
                  </Text>
                </Row>
              </Col>
            </Row>
          )}
        </Card.Header>
        <Card.Divider />
        <Spacer y={1} />
        <Card.Body css={{ py: '$10', textAlign: 'center', margin: '0 auto' }}>
          <ArtistAlbums artistId={id as string} />
          <Spacer y={2} />
          <Card.Divider />
          <Spacer y={2} />
          <ArtistTopSongs artistId={id as string} />
          <Spacer y={2} />
          <Card.Divider />
          <Spacer y={2} />
          <ArtistRelatedArtists artistId={id as string} />
          <Spacer y={2} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
}

export default ArtistDetail;
