/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    onSearch(search);
  }, [debouncedSearch]);

  return (
    <Input
      width='100%'
      clearable
      bordered
      color='success'
      size='xl'
      placeholder='Enter album, song or artist name'
      contentRight={<FaSearch size={35} />}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
