import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Categories from './Categories';
import PaginatedItemsSection from './PaginatedItemsSection';

function CategoriesSection() {
  const pageSize = 5;
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [totalCategories, setTotalCategories] = useState(0);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<SpotifyApi.CategoryObject[]>([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setLoadingCategories(true);
      spotifyApi
        .getCategories({
          limit: pageSize,
          offset: 0,
          country: 'SV',
        })
        .then(
          function (data) {
            setCategories(data.body.categories.items);
            setTotalCategories(data.body.categories.total);
          },
          function (err) {
            alert(err);
          }
        )
        .finally(() => setLoadingCategories(false));
    }
  }, [session, spotifyApi]);

  function handlePageChange(page: number) {
    setLoadingCategories(true);
    spotifyApi
      .getCategories({
        limit: pageSize,
        offset: pageSize * (page - 1),
        country: 'SV',
      })
      .then(
        function (data) {
          setCategories(data.body.categories.items);
        },
        function (err) {
          alert(err);
        }
      )
      .finally(() => setLoadingCategories(false));
  }

  return (
    <PaginatedItemsSection
      loading={loadingCategories}
      title='Categories'
      pageSize={pageSize}
      onPageChange={handlePageChange}
      totalItems={totalCategories}>
      <Categories categories={categories} />
    </PaginatedItemsSection>
  );
}

export default CategoriesSection;
