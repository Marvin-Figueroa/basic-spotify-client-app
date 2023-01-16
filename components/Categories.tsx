import { Card, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { size } from '../utils/layout';

type CategoriesProps = {
  categories: SpotifyApi.CategoryObject[];
};

function Categories({ categories }: CategoriesProps) {
  return (
    <section>
      <Grid.Container gap={1} justify='center'>
        {categories.map((category) => (
          <Grid css={size} key={category.id}>
            <Link
              href={{
                pathname: '/category/[id]',
                query: { id: category.id },
              }}>
              <Card isHoverable variant='bordered'>
                <Card.Body css={{ background: '#1DB954', textAlign: 'center' }}>
                  <Text b color='white' size={15}>
                    {category.name}
                  </Text>
                </Card.Body>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
}

export default Categories;
