import React from 'react';
import { DetailWrapper, ProductWrapper, DetailContainer } from './styles';

import ProductInfoRight from 'components/DetailProduct/ProductInfoRight/InfoRight';
import ProductInfoLeft from 'components/DetailProduct/ProductInfoLeft';
import HeaderInfo from 'components/DetailProduct/ProductInfoRight/HeaderInfo';
import ProductInfo from 'components/DetailProduct/ProductInfo';
import { GetApi } from 'utils/api';
import { useEffect } from 'react';
import { ProductDetailProvider } from 'context/ProductDetailContext';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { URLquery } from 'utils/URLquery';
import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import DialLog from 'layouts/DialLog';
import { Oval } from 'react-loader-spinner';
import itemData from 'data/main.json';

const DetailProduct = () => {
    const location = useLocation();
    const query = URLquery(location);

    const [initialProduceDetail, setInitialProduceDetail] = useState({
        user: {},
        product: {},
        order: {
            pay: 'card',
            modal: false,
        },
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const result = await GetApi(
        //     `/api/product/productDetail?productId=${}`,
        // );
        const item = itemData.filter(v => v.id === Number(query.productId))[0];
        setInitialProduceDetail(prev => ({
            ...prev,
            product: item,
        }));

        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <Oval color="#00BFFF" height={80} width={80} timeout={10000} />
            </div>
        );
    }

    return (
        <>
            <ProductDetailProvider value={initialProduceDetail}>
                <Header></Header>
                <Sidebar></Sidebar>
                <DialLog></DialLog>
                <DetailContainer>
                    <DetailWrapper>
                        <HeaderInfo />
                        <ProductWrapper>
                            <ProductInfoLeft />
                            <ProductInfoRight />
                        </ProductWrapper>
                    </DetailWrapper>
                    <ProductInfo />
                    <Footer></Footer>
                </DetailContainer>
            </ProductDetailProvider>
        </>
    );
};

export default DetailProduct;
