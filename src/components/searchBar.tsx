import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import history from '../lib/history';
import '../styles/searchBar.scss';
const { Search } = Input;

const SearchBar = () => {

  const onSearch = (v:string) => {

    if(v === '') {
      history.push(`/`);
      return;
    }
    
      history.push(`/search?q=${v}`);
  }

  return (
    <div className="search-wrapper">
      <div className="search-input">
        <Search
          placeholder="Find a project"
          onSearch={onSearch}
          style={{ width: 300 }}
        />
      </div>
    </div>
  );
};

export default SearchBar;


