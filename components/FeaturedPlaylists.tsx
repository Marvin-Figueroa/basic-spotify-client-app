import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import PaginatedItemsSection from './PaginatedItemsSection';
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
          timestamp: new Date().toISOString(),
        })
        .then(
          function (data) {
            setFeaturedPlaylists(data.body.playlists.items);
            setTotalPlaylists(data.body.playlists.total);
          },
          function (err) {
            alert(err);
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
        timestamp: new Date().toISOString(),
      })
      .then(
        function (data) {
          setFeaturedPlaylists(data.body.playlists.items);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingPlaylists(false));
  }

  return (
    <PaginatedItemsSection
      loading={loadingPlaylists}
      title='Featured Playlists'
      pageSize={pageSize}
      onPageChange={handlePlaylistsPageChange}
      totalItems={totalPlaylists}>
      <Playlists playlists={featuredPlaylists} />
    </PaginatedItemsSection>
  );
}

export default FeaturedPlaylists;
