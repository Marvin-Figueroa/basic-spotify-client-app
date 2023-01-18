import {
  Card,
  User,
  Text,
  Row,
  Button,
  Col,
  Spacer,
  Loading,
  Container,
  Link as UILink,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import spotifyApi from '../lib/spotify';
import Artists from '../components/Artists';
import Link from 'next/link';
import UserTopArtists from '../components/UserTopArtists';
import UserTopSongs from '../components/UserTopSongs';

function Profile() {
  const pageSize = 5;
  const [user, setUser] =
    useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  const [totalFollowedArtists, setTotalFollowedArtists] = useState(0);
  const [loadingFollowedArtists, setLoadingFollowedArtists] = useState(false);
  const [followedArtists, setFollowedArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  useEffect(() => {
    spotifyApi.getMe().then(
      function (data) {
        setUser(data.body);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

    setLoadingFollowedArtists(true);
    spotifyApi
      .getFollowedArtists({
        limit: pageSize,
      })
      .then(
        function (data) {
          setFollowedArtists(data.body.artists.items);
          setTotalFollowedArtists(data.body.artists.total || 0);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingFollowedArtists(false));
  }, []);

  function handleFollowedArtistsPageChange() {
    setLoadingFollowedArtists(true);
    spotifyApi
      .getFollowedArtists({
        limit: pageSize,
        after: followedArtists[followedArtists.length - 1].id,
      })
      .then(
        function (data) {
          setFollowedArtists((prevFollowedArtists) => [
            ...prevFollowedArtists,
            ...data.body.artists.items,
          ]);
          setTotalFollowedArtists(data.body.artists.total || 0);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingFollowedArtists(false));
  }

  return (
    <PageLayout title='Spotify | Profile'>
      <Card css={{ mw: '100%' }}>
        <Card.Header>
          <Row
            dir='column'
            css={{
              flexDirection: 'column',
              gap: '30px',
              '@xs': {
                flexDirection: 'row',
                gap: '0',
              },
            }}
            align='center'
            justify='center'>
            <Col>
              <Row
                css={{
                  '@xs': {
                    justifyContent: 'flex-start',
                  },
                }}
                justify='center'>
                <User
                  size='xl'
                  bordered
                  color='success'
                  src={
                    (user?.images && user.images[user.images.length - 1].url) ??
                    '../public/spotify-logo.png'
                  }
                  name={user?.display_name ?? 'No Username'}
                  description={user?.email ?? 'user@email.com'}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Row
                    css={{
                      '@xs': {
                        justifyContent: 'flex-start',
                      },
                    }}
                    align='center'
                    justify='center'>
                    Country:
                    <Spacer x={1} />
                    <Text b color='success'>
                      {user?.country}
                    </Text>
                  </Row>
                  <Row
                    css={{
                      '@xs': {
                        justifyContent: 'flex-start',
                      },
                    }}
                    align='center'
                    justify='center'>
                    Account: <Spacer x={1} />
                    <Text b color='success'>
                      {user?.product}
                    </Text>
                  </Row>
                </Col>
                <Col>
                  <Row
                    css={{
                      '@xs': {
                        justifyContent: 'flex-end',
                      },
                    }}
                    align='center'
                    justify='center'>
                    <Link href='/library'>
                      <UILink
                        css={{ border: '1px solid #1DB954' }}
                        block
                        color='success'>
                        <Text color='#1DB954'>My Library</Text>
                      </UILink>
                    </Link>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Divider />
        <Spacer y={1} />
        <Card.Body css={{ py: '$10' }}>
          <UserTopArtists />
          <Spacer y={2} />
          <Card.Divider />
          <Spacer y={2} />
          <UserTopSongs />
          <Spacer y={2} />
          <Card.Divider />
          <Spacer y={2} />
          <>
            <Text css={{ textAlign: 'center' }} h3>
              Followed Artists
            </Text>
            {loadingFollowedArtists ? (
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
              <Artists artists={followedArtists} />
            )}
            {followedArtists.length < totalFollowedArtists ? (
              <>
                <Spacer y={1} />
                <Container css={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    rounded
                    color='success'
                    onPress={handleFollowedArtistsPageChange}>
                    Load More
                  </Button>
                </Container>
              </>
            ) : null}
          </>
          <Spacer y={2} />
        </Card.Body>
      </Card>
    </PageLayout>
  );
}

export default Profile;
