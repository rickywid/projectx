import React from 'react';
import { Input } from 'antd';
const { Search } = Input;

const SearchBar = () => {
  return (
    <div>
        <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={value => console.log(value)}
        />
    </div>
  );
};

export default SearchBar;


