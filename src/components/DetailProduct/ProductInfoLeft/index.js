import { useProductDetailState } from 'context/ProductDetailContext';
import { useRef } from 'react';
import { useState, useCallback, useEffect } from 'react';
import ImageZoom from '../ImageZoom';
import { ProductImage, MainImage, ImageList } from './styles';

const ProductInfoLeft = () => {
    const detail = useProductDetailState();

    const [thumbNum, setThumbNum] = useState(0);
    const [active, setActive] = useState('');

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    const imageList = detail.product.imgList.map((image, index) => (
        <div
            key={index}
            onMouseOver={() => setActive(index)}
            className={active === index ? 'active' : ''}
        >
            <img
                src={
                    image +
                    getParametersForUnsplash({
                        width: 60,
                        height: 72,
                        quality: 80,
                        format: 'jpg',
                    })
                }
                onMouseOver={() => setThumbNum(index)}
            />
        </div>
    ));

    return (
        <ProductImage>
            <MainImage>
                <ImageZoom img={detail.product.imgList[thumbNum]} alt={'사진'}></ImageZoom>
            </MainImage>

            <ImageList>{imageList}</ImageList>
        </ProductImage>
    );
};

export default ProductInfoLeft;
