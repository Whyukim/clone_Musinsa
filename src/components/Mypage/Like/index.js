import React, { useCallback, useEffect, useState } from 'react';
import { MypageMain } from 'pages/Mypage/styles.js';
import Ul from 'components/Mypage/Like/List';
import { LikeSection, PagenationBox } from './styles';
import Pagination from 'react-js-pagination';
import { getData } from 'utils/getData';
import itemData from 'data/main.json';

function Mainlike() {
    // 페이지네이션
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(8);
    const handlePageChange = page => {
        setPage(page);
    };

    // 좋아요 리스트 저장
    const [likeLists, setlikeList] = useState([]);

    // 좋아요 리스트 서버에서 가져오기
    const loginToken = getData();
    useEffect(() => {
        let likeProduct = itemData.filter(v => loginToken.likes.includes(v.id));
        setlikeList([...likeProduct]);
    }, []);

    // 좋아요리스트 삭제
    const onRemove = useCallback(id => {
        const deleteList = likeLists.filter(likeList => likeList.id !== id);
        setlikeList(deleteList);
    });

    return (
        <>
            <MypageMain>
                <LikeSection>
                    <header>
                        <h1>좋아요</h1>
                        <h2>상품</h2>
                    </header>
                    {likeLists.slice(items * (page - 1), items * (page - 1) + items).map(data => (
                        <Ul
                            key={data.id}
                            id={data.id}
                            img={data.img}
                            model={data.productTitle}
                            price={data.price}
                            like={data.like}
                            onRemove={onRemove}
                        />
                    ))}
                    <PagenationBox>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={items}
                            totalItemsCount={likeLists.length - 1}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            hideNavigation={true}
                            hideFirstLastPages={true}
                        />
                    </PagenationBox>
                </LikeSection>
            </MypageMain>
        </>
    );
}

export default Mainlike;
