import React, { useState } from 'react';
import { Container, Spacer, Text } from '@nextui-org/react';
import PageLayout from '../components/PageLayout';
import SearchBar from '../components/SearchBar';
import spotifyApi from '../lib/spotify';
import Songs from '../components/Songs';
import Albums from '../components/Albums';
import Artists from '../components/Artists';
import SearchResults from '../components/SearchResults';

function Search() {
  const pageSize = 5;
  const [query, setQuery] = useState('');

  const [loadingSongs, setLoadingSongs] = useState(false);
  const [totalSongs, setTotalSongs] = useState(0);
  const [songResults, setSongResults] = useState<SpotifyApi.TrackObjectFull[]>(
    []
  );

  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [albumResults, setAlbumResults] = useState<
    SpotifyApi.AlbumObjectFull[]
  >([]);

  const [loadingArtists, setLoadingArtists] = useState(false);
  const [totalArtists, setTotalArtists] = useState(0);
  const [artistResults, setArtistResults] = useState<
    SpotifyApi.ArtistObjectFull[]
  >([]);

  function handleSongSearch(query: string, page = 1) {
    setQuery(query);
    setLoadingSongs(true);
    // Search tracks whose name, album or artist contains the query
    spotifyApi
      .searchTracks(query, {
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setSongResults(
            data.body.tracks?.items as SpotifyApi.TrackObjectFull[]
          );
          setTotalSongs(data.body.tracks?.total as number);
        },
        function (err) {
          console.error(err);
        }
      )
      .finally(() => setLoadingSongs(false));
  }

  function handleSongPageChange(page: number) {
    handleSongSearch(query, page);
  }

  function handleAlbumSearch(query: string, page = 1) {
    setQuery(query);
    setLoadingAlbums(true);

    spotifyApi
      .searchAlbums(query, {
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setAlbumResults(
            data.body.albums?.items as SpotifyApi.AlbumObjectFull[]
          );
          setTotalAlbums(data.body.albums?.total as number);
        },
        function (err) {
          console.error(err);
        }
      )
      .finally(() => setLoadingAlbums(false));
  }

  function handleAlbumPageChange(page: number) {
    handleAlbumSearch(query, page);
  }

  function handleArtistSearch(query: string, page = 1) {
    setQuery(query);
    setLoadingArtists(true);

    spotifyApi
      .searchArtists(query, {
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setArtistResults(
            data.body.artists?.items as SpotifyApi.ArtistObjectFull[]
          );
          setTotalArtists(data.body.artists?.total as number);
        },
        function (err) {
          console.error(err);
        }
      )
      .finally(() => setLoadingArtists(false));
  }

  function handleArtistPageChange(page: number) {
    handleArtistSearch(query, page);
  }

  function handleSearch(query: string, page = 1) {
    setQuery(query);

    if (query.trim().length > 0) {
      handleSongSearch(query, page);
      handleAlbumSearch(query, page);
      handleArtistSearch(query, page);
    }
  }

  return (
    <PageLayout title='Spotify | Search'>
      <Text css={{ textAlign: 'center' }} h3>
        Search for Albums, Songs and Artists
      </Text>
      <Spacer y={1} />
      <Container xs css={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar onSearch={handleSearch} />
      </Container>

      <Spacer y={2} />
      {query && songResults.length > 0 && (
        <SearchResults
          loading={loadingSongs}
          title='Songs Found'
          pageSize={pageSize}
          onPageChange={handleSongPageChange}
          totalItems={totalSongs}>
          <Songs songs={songResults} />
        </SearchResults>
      )}

      <Spacer y={2} />
      {query && albumResults.length > 0 && (
        <SearchResults
          loading={loadingAlbums}
          title='Albums Found'
          pageSize={pageSize}
          onPageChange={handleAlbumPageChange}
          totalItems={totalAlbums}>
          <Albums albums={albumResults} />
        </SearchResults>
      )}

      <Spacer y={2} />
      {query && artistResults.length > 0 && (
        <SearchResults
          loading={loadingArtists}
          title='Artists Found'
          pageSize={pageSize}
          onPageChange={handleArtistPageChange}
          totalItems={totalArtists}>
          <Artists artists={artistResults} />
        </SearchResults>
      )}
    </PageLayout>
  );
}

export default Search;
