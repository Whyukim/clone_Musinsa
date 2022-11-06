import useInput from 'hooks/useInput';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import itemData from 'data/main.json';

const SearchInput = ({ setProduct }) => {
    const [searchTerm, onChangeSearchTerm, setSearchTerm] = useInput('');

    // //select박스 상태

    // //검색창 함수
    const onSearch = useCallback(
        e => {
            e.preventDefault();

            if (!searchTerm || !searchTerm.trim()) {
                setProduct(itemData);
            } else {
                setProduct(pre => {
                    const data = pre.filter(v => v.productTitle.includes(searchTerm));
                    return data;
                });
            }
        },
        [searchTerm],
    );

    return (
        <form className="search_items" onSubmit={onSearch}>
            <input type="text" id="search_items" value={searchTerm} onChange={onChangeSearchTerm} />
            <span type="submit" className="search_btn">
                검색
            </span>
        </form>
    );
};

export default SearchInput;
