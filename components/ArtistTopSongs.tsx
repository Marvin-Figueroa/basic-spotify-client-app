import React, { useEffect, useState } from 'react';
import spotifyApi from '../lib/spotify';
import PaginatedItemsSection from './PaginatedItemsSection';
import Songs from './Songs';

interface ArtistTopSongsProps {
  artistId: string;
}
function ArtistTopSongs({ artistId }: ArtistTopSongsProps) {
  const pageSize = 5;
  const [totalSongs, setTotalSongs] = useState(0);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [paginatedSongs, setPaginatedSongs] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);

  useEffect(() => {
    setLoadingSongs(true);
    spotifyApi
      .getArtistTopTracks(artistId, 'SV')
      .then(
        function (data) {
          setSongs(data.body.tracks);
          setPaginatedSongs(data.body.tracks.slice(0, pageSize));
          setTotalSongs(data.body.tracks.length);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }, [artistId]);

  function handleSongsPageChange(page: number) {
    setPaginatedSongs(
      songs.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize)
    );
  }

  return (
    <PaginatedItemsSection
      onPageChange={handleSongsPageChange}
      totalItems={totalSongs}
      title='Top Songs'
      pageSize={pageSize}
      loading={loadingSongs}>
      <Songs songs={paginatedSongs} />
    </PaginatedItemsSection>
  );
}

export default ArtistTopSongs;
