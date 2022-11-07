import { CATEGORY, useMainDispatch } from 'context/MainContext';
import { useProductDetailState } from 'context/ProductDetailContext';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { bigCategory } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { Header, CategoryWrapper } from './styles';

const HeaderInfo = () => {
    const detail = useProductDetailState();
    const navigate = useNavigate();

    const dispatch = useMainDispatch();

    const onClickBig = useCallback(() => {
        const payload = {
            bigCategoryId: detail.product.bigCategoryId,
            smallCategoryId: 0,
        };
        dispatch({ type: CATEGORY, payload });
        navigate(`/`);
    }, []);

    const onClickSmall = useCallback(() => {
        const payload = {
            bigCategoryId: detail.product.bigCategoryId,
            smallCategoryId: detail.product.smallCategoryId,
        };
        dispatch({ type: CATEGORY, payload });
        navigate(`/`);
    }, []);

    return (
        <Header>
            <CategoryWrapper>
                <p onClick={onClickBig}>{bigCategory[detail.product.bigCategoryId - 1]}</p>
                <span> &gt; </span>
                <p onClick={onClickSmall}>
                    {
                        smallCategory[detail.product.bigCategoryId - 1][
                            detail.product.smallCategoryId
                        ]
                    }
                </p>
            </CategoryWrapper>
            <p>{detail.product.productTitle}</p>
        </Header>
    );
};
export default HeaderInfo;
