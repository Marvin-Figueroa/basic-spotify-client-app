import React, { useEffect, useState } from 'react';
import spotifyApi from '../lib/spotify';
import Artists from './Artists';
import PaginatedItemsSection from './PaginatedItemsSection';

function UserTopArtists() {
  const pageSize = 5;
  const [totalArtists, setTotalArtists] = useState(0);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [topArtists, setTopArtists] = useState<SpotifyApi.ArtistObjectFull[]>(
    []
  );

  useEffect(() => {
    /* Get a User’s Top Artists*/
    setLoadingArtists(true);
    spotifyApi
      .getMyTopArtists({
        limit: pageSize,
        offset: 0,
      })
      .then(
        function (data) {
          setTopArtists(data.body.items);
          setTotalArtists(data.body.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingArtists(false));
  }, []);

  function handleArtistPageChange(page: number) {
    setLoadingArtists(true);
    spotifyApi
      .getMyTopArtists({
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setTopArtists(data.body.items);
          setTotalArtists(data.body.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingArtists(false));
  }
  return (
    <PaginatedItemsSection
      onPageChange={handleArtistPageChange}
      totalItems={totalArtists}
      title='Top Artists'
      pageSize={pageSize}
      loading={loadingArtists}>
      <Artists artists={topArtists} />
    </PaginatedItemsSection>
  );
}

export default UserTopArtists;
