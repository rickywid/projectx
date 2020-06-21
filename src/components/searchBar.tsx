import React from 'react';
import { Input } from 'antd';
import history from '../lib/history';
const { Search } = Input;

const SearchBar = () => {

  const onSearch = (v:string) => {
      history.push(`/search?q=${v}`)
  }

  return (
    <div>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
        />
    </div>
  );
};

export default SearchBar;


