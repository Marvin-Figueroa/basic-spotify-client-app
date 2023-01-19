import React, { useEffect, useState } from 'react';
import spotifyApi from '../lib/spotify';
import Artists from './Artists';
import PaginatedItemsSection from './PaginatedItemsSection';

interface ArtistRelatedArtistsProps {
  artistId: string;
}

function ArtistRelatedArtists({ artistId }: ArtistRelatedArtistsProps) {
  const pageSize = 5;
  const [totalArtists, setTotalArtists] = useState(0);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [artists, setArtists] = useState<SpotifyApi.ArtistObjectFull[]>([]);
  const [paginatedArtists, setPaginatedArtists] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  useEffect(() => {
    setLoadingArtists(true);
    spotifyApi
      .getArtistRelatedArtists(artistId)
      .then(
        function (data) {
          setArtists(data.body.artists);
          setPaginatedArtists(data.body.artists.slice(0, pageSize));
          setTotalArtists(data.body.artists.length);
        },
        function (err) {
          console.log('Something went wrong', err);
        }
      )
      .finally(() => setLoadingArtists(false));
  }, [artistId]);

  function handleArtistsPageChange(page: number) {
    setPaginatedArtists(
      artists.slice(pageSize * (page - 1), pageSize * (page - 1) + pageSize)
    );
  }

  return (
    <PaginatedItemsSection
      onPageChange={handleArtistsPageChange}
      totalItems={totalArtists}
      title='Related Artists'
      pageSize={pageSize}
      loading={loadingArtists}>
      <Artists artists={paginatedArtists} />
    </PaginatedItemsSection>
  );
}

export default ArtistRelatedArtists;
