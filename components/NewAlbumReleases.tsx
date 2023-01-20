import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Albums from './Albums';
import PaginatedItemsSection from './PaginatedItemsSection';

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
            alert(err);
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
          setNewReleases(data.body.albums.items);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingAlbums(false));
  }

  return (
    <PaginatedItemsSection
      loading={loadingAlbums}
      title='New Album Releases'
      pageSize={pageSize}
      onPageChange={handleAlbumsPageChange}
      totalItems={totalAlbums}>
      <Albums albums={newReleases} />
    </PaginatedItemsSection>
  );
}

export default NewAlbumReleases;
