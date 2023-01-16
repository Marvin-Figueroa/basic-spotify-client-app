import { useRouter } from 'next/router';
import React from 'react';
import PageLayout from '../../components/PageLayout';

type Props = {};

function PlaylistDetail({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageLayout title='Playlist Details'>
      <div>Playlist Details for playlist id:{id}</div>
    </PageLayout>
  );
}

export default PlaylistDetail;
