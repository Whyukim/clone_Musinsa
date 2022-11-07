import useInput from 'hooks/useInput';
import React from 'react';
import { useCallback } from 'react';
import { SEARCH, useMainDispatch } from 'context/MainContext';

const SearchInput = () => {
    const [searchTerm, onChangeSearchTerm, setSearchTerm] = useInput('');

    const dispatch = useMainDispatch();

    // //검색창 함수
    const onSearch = useCallback(
        e => {
            e.preventDefault();
            const payload = {
                search: searchTerm,
            };
            dispatch({ type: SEARCH, payload });

            setSearchTerm('');
        },
        [searchTerm],
    );

    return (
        <form className="search_items" onSubmit={onSearch}>
            <input type="text" id="search_items" value={searchTerm} onChange={onChangeSearchTerm} />
            <span type="submit" className="search_btn" onClick={onSearch}>
                검색
            </span>
        </form>
    );
};

export default SearchInput;
