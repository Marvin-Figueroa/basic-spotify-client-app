import {
  Container,
  Loading,
  Pagination,
  Spacer,
  Table,
} from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import spotifyApi from '../lib/spotify';

interface PlaylistSongsProps {
  playlistId: string;
}
function PlaylistSongs({ playlistId }: PlaylistSongsProps) {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalSongs, setTotalSongs] = useState(0);
  const [songs, setSongs] = useState<SpotifyApi.PlaylistTrackObject[]>([]);

  useEffect(() => {
    setLoading(true);
    spotifyApi
      .getPlaylistTracks(playlistId, { limit: pageSize, offset: 0 })
      .then(
        function (data) {
          setSongs(data.body.items);
          setTotalSongs(data.body.total);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoading(false));
  }, [playlistId]);

  function handleSongsPageChange(page: number) {
    setCurrentPage(page);
    setLoading(true);
    spotifyApi
      .getPlaylistTracks(playlistId, {
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setSongs(data.body.items);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoading(false));
  }

  return (
    <>
      {loading ? (
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
        <Table
          css={{
            maxHeight: 'auto',
            minWidth: '100%',
          }}>
          <Table.Header>
            <Table.Column
              css={{
                textAlign: 'flex-start',
                color: '#1DB954',
                fontWeigh: 'bold',
              }}>
              TITLE
            </Table.Column>
            <Table.Column
              css={{
                textAlign: 'center',
                color: '#1DB954',
                fontWeigh: 'bold',
              }}>
              ALBUM
            </Table.Column>
            <Table.Column
              css={{
                textAlign: 'center',
                color: '#1DB954',
                fontWeigh: 'bold',
              }}>
              PREVIEW
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {songs.map((song) => (
              <Table.Row key={song.track?.id}>
                <Table.Cell css={{ textAlign: 'left', whiteSpace: 'initial' }}>
                  {song.track?.name || 'No song name'}
                </Table.Cell>
                <Table.Cell
                  css={{ textAlign: 'center', whiteSpace: 'initial' }}>
                  <Link href={`/album/${song.track?.album.id}`}>
                    {song.track?.album.name || 'No Name'}
                  </Link>
                </Table.Cell>
                <Table.Cell css={{ textAlign: 'center' }}>
                  {
                    <Link
                      title='Go to preview page'
                      href={`/song/${song.track?.id}`}>
                      <FaPlayCircle size={25} color='#1DB954' />
                    </Link>
                  }
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      <Spacer y={1} />
      {totalSongs > pageSize ? (
        <Container css={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            color='success'
            size='lg'
            total={Math.ceil(totalSongs / pageSize)}
            initialPage={currentPage}
            onChange={handleSongsPageChange}
          />
        </Container>
      ) : null}
      <Spacer y={2} />
    </>
  );
}

export default PlaylistSongs;
