import React, { useEffect, useState } from 'react';
import spotifyApi from '../lib/spotify';
import PaginatedItemsSection from './PaginatedItemsSection';
import Songs from './Songs';

function UserTopSongs() {
  const pageSize = 5;
  const [totalSongs, setTotalSongs] = useState(0);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [topSongs, setTopSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);

  useEffect(() => {
    setLoadingSongs(true);
    spotifyApi
      .getMyTopTracks({
        limit: pageSize,
        offset: 0,
      })
      .then(
        function (data) {
          setTopSongs(data.body.items);
          setTotalSongs(data.body.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }, []);

  function handleSongPageChange(page: number) {
    setLoadingSongs(true);
    spotifyApi
      .getMyTopTracks({
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setTopSongs(data.body.items);
          setTotalSongs(data.body.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }
  return (
    <PaginatedItemsSection
      onPageChange={handleSongPageChange}
      totalItems={totalSongs}
      title='Top Songs'
      pageSize={pageSize}
      loading={loadingSongs}>
      <Songs songs={topSongs} />
    </PaginatedItemsSection>
  );
}

export default UserTopSongs;
