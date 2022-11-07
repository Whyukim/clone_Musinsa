import React, { useState } from 'react';
import { ImgSpan, LikeLi, LikeUl } from '../styles';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { thousandComma } from 'utils/thousandComma';

function Likelist({ img, model, price, like, onRemove, id }) {
    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    return (
        <LikeUl>
            <LikeLi>
                <ImgSpan>
                    <a href={`/detail?productId=${id}`}>
                        <img
                            src={
                                img +
                                getParametersForUnsplash({
                                    width: 80,
                                    height: 100,
                                    quality: 80,
                                    format: 'jpg',
                                })
                            }
                            alt="더미데이터"
                        />
                    </a>
                </ImgSpan>

                <ul>
                    <li className="name">
                        <a href={`/detail?productId=${id}`}>{model}</a>
                    </li>
                    <li className="price">{thousandComma(price)}원</li>
                    <li className="like">
                        <FaHeart /> {like}
                    </li>
                </ul>
                <button onClick={e => onRemove(id)}>
                    <FiX />
                </button>
            </LikeLi>
        </LikeUl>
    );
}

export default Likelist;
