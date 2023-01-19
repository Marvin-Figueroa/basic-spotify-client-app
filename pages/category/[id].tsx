import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import PaginatedItemsSection from '../../components/PaginatedItemsSection';
import Playlists from '../../components/Playlists';
import spotifyApi from '../../lib/spotify';

function CategoryDetail() {
  const pageSize = 10;
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState('');
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    spotifyApi.getCategory(id as string).then(
      function (data) {
        setCategory(data.body.name);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
    setLoading(true);
    spotifyApi
      .getPlaylistsForCategory(id as string, {
        country: 'SV',
        limit: pageSize,
        offset: 0,
      })
      .then(
        function (data) {
          console.log(data.body);
          setPlaylists(data.body.playlists.items);
          setTotal(data.body.playlists.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoading(false));
  }, [id]);

  function handlePageChange(page: number) {
    setLoading(true);
    spotifyApi
      .getPlaylistsForCategory(id as string, {
        country: 'SV',
        limit: pageSize,
        offset: pageSize * (page - 1),
      })
      .then(
        function (data) {
          setPlaylists(data.body.playlists.items);
          setTotal(data.body.playlists.total);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoading(false));
  }

  return (
    <PageLayout title='Category Details'>
      <PaginatedItemsSection
        onPageChange={handlePageChange}
        totalItems={total}
        title={`${category} - Playlists`}
        pageSize={pageSize}
        loading={loading}>
        <Playlists playlists={playlists} />
      </PaginatedItemsSection>
    </PageLayout>
  );
}

export default CategoryDetail;
