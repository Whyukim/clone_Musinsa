import { useEffect, useRef } from 'react';

const ProductInfoImageList = ({ image }) => {
    const imgRef = useRef(null);

    function getParametersForUnsplash({ width, height, quality, format }) {
        return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
    }

    useEffect(() => {
        const options = {};
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        observer.observe(imgRef.current);
    }, []);

    return (
        <img
            ref={imgRef}
            rel="preload"
            data-src={
                image.src +
                getParametersForUnsplash({
                    width: 960,
                    height: 1152,
                    quality: 80,
                    format: 'jpg',
                })
            }
        />
    );
};

export default ProductInfoImageList;
