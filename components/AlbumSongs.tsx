import { Loading, Table } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlayCircle } from 'react-icons/fa';
import spotifyApi from '../lib/spotify';
import { millisToMinutesAndSeconds } from '../utils/helpers';

interface AlbumSongsProps {
  albumId: string;
}
function AlbumSongs({ albumId }: AlbumSongsProps) {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<SpotifyApi.TrackObjectSimplified[]>([]);

  useEffect(() => {
    setLoading(true);
    spotifyApi
      .getAlbumTracks(albumId, { limit: 50, offset: 0 })
      .then(
        function (data) {
          console.log(data.body);
          setSongs(data.body.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoading(false));
  }, [albumId]);

  return loading ? (
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
          css={{ textAlign: 'center', color: '#1DB954', fontWeigh: 'bold' }}>
          DURATION
        </Table.Column>
        <Table.Column
          css={{ textAlign: 'center', color: '#1DB954', fontWeigh: 'bold' }}>
          PREVIEW
        </Table.Column>
      </Table.Header>
      <Table.Body>
        {songs.map((song) => (
          <Table.Row key={song.id}>
            <Table.Cell css={{ textAlign: 'left' }}>{song.name}</Table.Cell>
            <Table.Cell>
              {millisToMinutesAndSeconds(song.duration_ms)}
            </Table.Cell>
            <Table.Cell>
              {
                <Link title='Go to preview page' href={`/song/${song.id}`}>
                  <FaPlayCircle size={25} color='#1DB954' />
                </Link>
              }
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Pagination
        noMargin
        align='center'
        rowsPerPage={songs.length > 5 ? 5 : songs.length}
        color='success'
      />
    </Table>
  );
}

export default AlbumSongs;
