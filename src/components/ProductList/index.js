import React, { useState } from 'react';
import { ListOuter, ListWrapper } from './styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { useCallback } from 'react';

const ShowList = props => {
    const navigate = useNavigate();

    const goDetail = data => {
        navigate(`/detail?productId=${data.id}`);
        //localStorage.setItem('memo', location.search);
    };

    //옵션 데이터
    const [arrow, setArrow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(Array(props.product.length).fill(false));

    const clickOption = idx => {
        const newArr = selected;
        if (selected.includes(true)) {
            newArr[selected.indexOf(true)] = false;
        } else {
            newArr[idx] = true;
        }
        setSelected(newArr);
    };

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    return (
        <ListWrapper>
            {props.product.length === 0 ? (
                <div style={{ fontSize: '20px', padding: '15px' }}>해당하는 상품이 없습니다.</div>
            ) : (
                props.product
                    .slice(
                        props.items * (props.page - 1),
                        props.items * (props.page - 1) + props.items,
                    )
                    .map((data, idx) => (
                        <ListOuter key={data.id}>
                            <div className="hotItem">
                                {data.like < 10000 && data.comment > 6000 ? (
                                    <span className="recommend">무신사 추천</span>
                                ) : null}
                                {data.like > 10000 && <span className="hot">인기 상품</span>}
                            </div>
                            <div
                                onClick={() => {
                                    goDetail(data);
                                }}
                            >
                                <div className="li_inner">
                                    <div className="list_img">
                                        <img
                                            src={
                                                data.img +
                                                getParametersForUnsplash({
                                                    width: 116,
                                                    height: 145,
                                                    quality: 80,
                                                    format: 'jpg',
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="item_info">
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '3px',
                                                fontSize: '13px',
                                            }}
                                        >
                                            {data.productTitle}
                                        </p>
                                        <p>{data.price.toLocaleString('ko-KR')}원</p>
                                    </div>
                                    <div className="choice">Members' Choice</div>
                                    <div className="item_like">
                                        <p style={{ color: 'red' }}>❤</p>
                                        <p className="likes">{data.like}</p>
                                    </div>
                                    <div className="item_comment">
                                        {data.comment < 2000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                            </p>
                                        ) : data.comment < 4000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : data.comment < 8000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : data.comment < 10000 ? (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        ) : (
                                            <p style={{ color: '#FF923A' }}>
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                                <AiFillStar />
                                            </p>
                                        )}
                                        <p className="comments">{data.comment}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="option">
                                <p
                                    className="option_btn"
                                    onClick={() => {
                                        clickOption(idx);
                                        setArrow(!arrow);
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    {selected[idx] ? 'OPTION ▲' : 'OPTION ▼'}
                                </p>
                                <div className="option_list">
                                    <ul
                                        style={
                                            selected[idx]
                                                ? { display: 'block' }
                                                : { display: 'none' }
                                        }
                                    >
                                        {data.productTag.map((data, idex) => (
                                            <li
                                                className={selected[idx] ? 'open' : 'close'}
                                                key={idex}
                                            >
                                                <span>{data}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ListOuter>
                    ))
            )}
        </ListWrapper>
    );
};

export default ShowList;
