import React from 'react';
import { useState } from 'react';
import { ImgSpan } from '../styles';
import itemData from 'data/main.json';
import { thousandComma } from 'utils/thousandComma';

function OrderList({ data }) {
    const [item, setItem] = useState(() => {
        return itemData.filter(v => v.id === data.id)[0];
    });

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    return (
        <tbody>
            <tr>
                <td>
                    <ImgSpan>
                        <a href={`/detail?productId=${data.id}`}>
                            <img
                                src={
                                    item.img +
                                    getParametersForUnsplash({
                                        width: 80,
                                        height: 96,
                                        quality: 80,
                                        format: 'jpg',
                                    })
                                }
                            />
                        </a>
                    </ImgSpan>
                    <ul>
                        <li>
                            <a href={`/detail?productId=${data.id}`}>
                                <strong>{item.productTitle}</strong>
                            </a>
                        </li>
                        <li>
                            옵션 : {data.size} / {data.name}
                        </li>
                    </ul>
                </td>
                <td>{data.date}</td>
                <td>{data.orderNumber}</td>
                <td>
                    {thousandComma(item.price * data.count)}원<br />
                    <span>({data.count}개)</span>
                </td>
                <td colSpan="2">
                    <span>주문완료</span>
                </td>
            </tr>
        </tbody>
    );
}

export default OrderList;
