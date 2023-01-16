import { useRouter } from 'next/router';
import React from 'react';
import PageLayout from '../../components/PageLayout';

type Props = {};

function AlbumDetail({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageLayout title='Album Details'>
      <div>Album Details for album id:{id}</div>
    </PageLayout>
  );
}

export default AlbumDetail;
