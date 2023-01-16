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
import Albums from './Albums';

function NewAlbumReleases() {
  const pageSize = 5;
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [newReleases, setNewReleases] = useState<
    SpotifyApi.AlbumObjectSimplified[]
  >([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setLoadingAlbums(true);
      spotifyApi
        .getNewReleases({ limit: pageSize, offset: 0, country: 'SV' })
        .then(
          function (data) {
            setNewReleases(data.body.albums.items);
            setTotalAlbums(data.body.albums.total);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        )
        .finally(() => setLoadingAlbums(false));
    }
  }, [session, spotifyApi]);

  function handleAlbumsPageChange(page: number) {
    setLoadingAlbums(true);
    spotifyApi
      .getNewReleases({
        limit: pageSize,
        offset: pageSize * (page - 1),
        country: 'SV',
      })
      .then(
        function (data) {
          console.log(data.body.albums);
          setNewReleases(data.body.albums.items);
        },
        function (err) {
          alert(err);
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingAlbums(false));
  }

  return (
    <>
      <Text css={{ textAlign: 'center' }} h2>
        New Album Releases
      </Text>
      <Spacer y={2} />
      <>
        {loadingAlbums ? (
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
          <Albums albums={newReleases} />
        )}
        <Spacer y={1} />
        <Container css={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            color='success'
            size='lg'
            total={Math.ceil(totalAlbums / pageSize)}
            initialPage={1}
            onChange={handleAlbumsPageChange}
          />
        </Container>
      </>
    </>
  );
}

export default NewAlbumReleases;
