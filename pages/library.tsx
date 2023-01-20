import { Spacer } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Albums from '../components/Albums';
import PageLayout from '../components/PageLayout';
import PaginatedItemsSection from '../components/PaginatedItemsSection';
import Songs from '../components/Songs';
import spotifyApi from '../lib/spotify';

function Library() {
  const pageSize = 5;

  const [totalAlbums, setTotalAlbums] = useState(0);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [savedAlbums, setSavedAlbums] = useState<SpotifyApi.SavedAlbumObject[]>(
    []
  );

  const [totalSongs, setTotalSongs] = useState(0);
  const [loadingSongs, setLoadingSongs] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.SavedTrackObject[]>([]);

  useEffect(() => {
    setLoadingAlbums(true);
    spotifyApi
      .getMySavedAlbums({
        limit: pageSize,
        offset: 0,
      })
      .then(
        function (data) {
          setSavedAlbums(data.body.items);
          setTotalAlbums(data.body.total);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingAlbums(false));

    setLoadingSongs(true);
    spotifyApi
      .getMySavedTracks({
        limit: pageSize,
        offset: 0,
      })
      .then(
        function (data) {
          setSongs(data.body.items);
          setTotalSongs(data.body.total);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }, []);

  function handleAlbumsPageChange(page: number) {
    setLoadingAlbums(true);
    spotifyApi
      .getMySavedAlbums({
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setSavedAlbums(data.body.items);
          setTotalAlbums(data.body.total);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingAlbums(false));
  }

  function handleSongsPageChange(page: number) {
    setLoadingSongs(true);
    spotifyApi
      .getMySavedTracks({
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setSongs(data.body.items);
          setTotalSongs(data.body.total);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }
  return (
    <PageLayout title='Spotify | Library'>
      <PaginatedItemsSection
        onPageChange={handleAlbumsPageChange}
        totalItems={totalAlbums}
        title='Saved Albums'
        pageSize={pageSize}
        loading={loadingAlbums}>
        <Albums albums={savedAlbums.map((album) => album.album)} />
      </PaginatedItemsSection>
      <Spacer y={2} />
      <PaginatedItemsSection
        onPageChange={handleSongsPageChange}
        totalItems={totalSongs}
        title='Saved Songs'
        pageSize={pageSize}
        loading={loadingSongs}>
        <Songs songs={songs.map((song) => song.track)} />
      </PaginatedItemsSection>
      <Spacer y={2} />
    </PageLayout>
  );
}

export default Library;
