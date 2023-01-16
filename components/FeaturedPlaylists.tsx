import {
  Container,
  Loading,
  Pagination,
  Spacer,
  Text,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Playlists from './Playlists';

function FeaturedPlaylists() {
  const pageSize = 5;
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [totalPlaylists, setTotalPlaylists] = useState(0);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setLoadingPlaylists(true);
      spotifyApi
        .getFeaturedPlaylists({
          limit: pageSize,
          offset: 0,
          country: 'SV',
          locale: 'es_SV',
          timestamp: new Date().toISOString(),
        })
        .then(
          function (data) {
            setFeaturedPlaylists(data.body.playlists.items);
            setTotalPlaylists(data.body.playlists.total);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        )
        .finally(() => setLoadingPlaylists(false));
    }
  }, [session, spotifyApi]);

  function handlePlaylistsPageChange(page: number) {
    setLoadingPlaylists(true);
    spotifyApi
      .getFeaturedPlaylists({
        limit: pageSize,
        offset: pageSize * (page - 1),
        country: 'SV',
        locale: 'es_SV',
        timestamp: new Date().toISOString(),
      })
      .then(
        function (data) {
          setFeaturedPlaylists(data.body.playlists.items);
        },
        function (err) {
          alert(err);
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingPlaylists(false));
  }

  return (
    <>
      <Text css={{ textAlign: 'center' }} h2>
        Featured Playlists
      </Text>
      <Spacer y={2} />
      {loadingPlaylists ? (
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
        <Playlists playlists={featuredPlaylists} />
      )}
      <Spacer y={1} />
      <Container css={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color='success'
          size='lg'
          total={Math.ceil(totalPlaylists / pageSize)}
          initialPage={1}
          onChange={handlePlaylistsPageChange}
        />
      </Container>
    </>
  );
}

export default FeaturedPlaylists;
