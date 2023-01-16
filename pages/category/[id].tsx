import { useRouter } from 'next/router';
import React from 'react';
import PageLayout from '../../components/PageLayout';

type Props = {};

function CategoryDetail({}: Props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageLayout title='Category Details'>
      <div>Category Details for category id:{id}</div>
    </PageLayout>
  );
}

export default CategoryDetail;
