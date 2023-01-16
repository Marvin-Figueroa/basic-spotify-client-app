import { Grid } from '@nextui-org/react';
import React from 'react';
import { size } from '../utils/layout';
import Playlist from './Playlist';

type PlaylistsProps = {
  playlists: SpotifyApi.PlaylistObjectSimplified[];
};

function Playlists({ playlists }: PlaylistsProps) {
  return (
    <section>
      <Grid.Container gap={2} justify='center'>
        {playlists.map((playlist) => (
          <Grid css={size} key={playlist.id}>
            <Playlist playlist={playlist} />
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
}

export default Playlists;
