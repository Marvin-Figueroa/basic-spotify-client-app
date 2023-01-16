import { Grid } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { size } from '../utils/layout';
import Album from './Album';

type AlbumsProps = {
  albums: SpotifyApi.AlbumObjectSimplified[];
};

function Albums({ albums }: AlbumsProps) {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  const [areSavedAlbums, setAreSavedAlbums] = useState<boolean[]>([]);
  useEffect(() => {
    // Check if albums are in the signed in user's Your Music library
    if (spotifyApi.getAccessToken() && albums.length > 0) {
      const albumsIds = albums.map((album) => album.id);
      spotifyApi.containsMySavedAlbums(albumsIds).then(
        function (data) {
          // An array is returned, where the first element corresponds to the first album ID in the query
          setAreSavedAlbums(data.body);
          console.log('Saved Albums State: ', data.body);
        },
        function (err) {
          alert(err);
          console.log('Something went wrong!', err);
        }
      );
    }
  }, [albums, session, spotifyApi]);

  return (
    <section>
      <Grid.Container gap={2} justify='center'>
        {albums.map((album, index) => (
          <Grid css={size} key={album.id}>
            <Album album={album} saved={areSavedAlbums[index]} />
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
}

export default Albums;
