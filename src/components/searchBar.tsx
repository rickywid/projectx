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
              enterButton="Search"
              onSearch={onSearch}
              prefix={  <SearchOutlined
                style={{
                  fontSize: 16,
                  color: '#ccc',
                }}
              />}
          />
      </div>
    </div>
  );
};

export default SearchBar;


