import { Grid } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { size } from '../utils/layout';
import Song from './Song';

type SongsProps = {
  songs: SpotifyApi.TrackObjectFull[];
};

function Songs({ songs }: SongsProps) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [areSavedSongs, setAreSavedSongs] = useState<boolean[]>([]);
  useEffect(() => {
    if (spotifyApi.getAccessToken() && songs.length > 0) {
      const songsIds = songs.map((song) => song.id);
      spotifyApi.containsMySavedTracks(songsIds).then(
        function (data) {
          setAreSavedSongs(data.body);
        },
        function (err) {
          alert(err);
        }
      );
    }
  }, [songs, session, spotifyApi]);

  return (
    <section>
      <Grid.Container gap={2} justify='center'>
        {songs.map((song, index) => (
          <Grid css={size} key={song.id}>
            <Song song={song} saved={areSavedSongs[index]} />
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
}

export default Songs;
