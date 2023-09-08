import React from 'react';
import { Input } from 'antd';
import './Search.css';
const Search = ({searchQuery, handleSearch}) => {
    const { Search } = Input;
    const inputStyle = {
        width: '250px'
    }
    return (
        <Search
            style={inputStyle}
            placeholder="ស្វែងរក"
            allowClear
            enterButton="ស្វែងរក"
            size="medium"
            value={searchQuery}
            onChange={handleSearch}
        />
    );
}

export default Search;
