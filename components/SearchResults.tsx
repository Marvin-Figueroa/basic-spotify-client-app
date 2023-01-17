import {
  Container,
  Loading,
  Pagination,
  Spacer,
  Text,
} from '@nextui-org/react';
import React, { ReactNode } from 'react';

type SearchResultsProps = {
  loading: boolean;
  title: string;
  children: ReactNode;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function SearchResults({
  loading,
  title,
  children,
  totalItems,
  pageSize,
  onPageChange,
}: SearchResultsProps) {
  return (
    <>
      <Text css={{ textAlign: 'center' }} h3>
        {title}
      </Text>
      {loading ? (
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
        children
      )}
      <Spacer y={1} />
      <Container css={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          color='success'
          size='lg'
          total={Math.ceil(totalItems / pageSize)}
          initialPage={1}
          onChange={onPageChange}
        />
      </Container>
    </>
  );
}

export default SearchResults;
