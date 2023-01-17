import { Grid } from '@nextui-org/react';
import React from 'react';
import { size } from '../utils/layout';
import Artist from './Artist';

type ArtistsProps = {
  artists: SpotifyApi.ArtistObjectFull[];
};

function Artists({ artists }: ArtistsProps) {
  return (
    <section>
      <Grid.Container gap={2} justify='center'>
        {artists.map((artist) => (
          <Grid css={size} key={artist.id}>
            <Artist artist={artist} />
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
}

export default Artists;
