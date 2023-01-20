import {
  Container,
  Loading,
  Pagination,
  Spacer,
  Text,
} from '@nextui-org/react';
import React, { ReactNode } from 'react';

type PaginatedItemsSectionProps = {
  loading: boolean;
  title: string;
  children: ReactNode;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

function PaginatedItemsSection({
  loading,
  title,
  children,
  totalItems,
  pageSize,
  onPageChange,
}: PaginatedItemsSectionProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  return (
    <>
      <Text css={{ textAlign: 'center' }} h2>
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
      {totalPages > 1 ? (
        <>
          <Spacer y={1} />
          <Container css={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              color='success'
              size='lg'
              total={totalPages}
              initialPage={1}
              onChange={onPageChange}
            />
          </Container>
        </>
      ) : null}
    </>
  );
}

export default PaginatedItemsSection;
