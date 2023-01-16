import {
  Container,
  Loading,
  Pagination,
  Spacer,
  Text,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import Categories from './Categories';

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
          country: 'SE',
        })
        .then(
          function (data) {
            setCategories(data.body.categories.items);
            setTotalCategories(data.body.categories.total);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        )
        .finally(() => setLoadingCategories(false));
    }
  }, [session, spotifyApi]);

  function handleCategoriesPageChange(page: number) {
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
          console.log('Something went wrong!', err);
        }
      )
      .finally(() => setLoadingCategories(false));
  }

  return (
    <>
      <Text css={{ textAlign: 'center' }} h2>
        Categories
      </Text>
      <Spacer y={2} />
      {loadingCategories ? (
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
        <Categories categories={categories} />
      )}
      <Spacer y={1} />
      <Container css={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color='success'
          size='lg'
          total={Math.ceil(totalCategories / pageSize)}
          initialPage={1}
          onChange={handleCategoriesPageChange}
        />
      </Container>
    </>
  );
}

export default CategoriesSection;
