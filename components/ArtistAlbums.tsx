import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Albums from './Albums';
import PaginatedItemsSection from './PaginatedItemsSection';

interface ArtistAlbumsProps {
  artistId: string;
}

function ArtistAlbums({ artistId }: ArtistAlbumsProps) {
  const pageSize = 5;
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectSimplified[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setLoadingAlbums(true);
      spotifyApi
        .getArtistAlbums(artistId, {
          limit: pageSize,
          offset: 0,
        })
        .then(
          function (data) {
            setAlbums(data.body.items);
            setTotalAlbums(data.body.total);
          },
          function (err) {
            console.error(err);
          }
        )
        .finally(() => setLoadingAlbums(false));
    }
  }, [session, spotifyApi, artistId]);

  function handleAlbumsPageChange(page: number) {
    setLoadingAlbums(true);
    spotifyApi
      .getArtistAlbums(artistId, {
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setAlbums(data.body.items);
          setTotalAlbums(data.body.total);
        },
        function (err) {
          console.error(err);
        }
      )
      .finally(() => setLoadingAlbums(false));
  }

  return (
    <>
      <PaginatedItemsSection
        onPageChange={handleAlbumsPageChange}
        totalItems={totalAlbums}
        title='Albums'
        pageSize={pageSize}
        loading={loadingAlbums}>
        <Albums albums={albums} />
      </PaginatedItemsSection>
    </>
  );
}

export default ArtistAlbums;
