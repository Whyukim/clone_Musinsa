import { useProductDetailState } from 'context/ProductDetailContext';
import { ListWrapper, List, Level, Price } from './styles';

const PriceList = () => {
    const detail = useProductDetailState();

    return (
        <div>
            <ListWrapper>
                <List>
                    <Level>비회원가</Level>
                    <Price>{detail.product.price + 100}</Price>원
                </List>
                <List>
                    <Level>루키</Level>
                    <Price>{detail.product.price}</Price>원
                </List>
                <List>
                    <Level>멤버</Level>
                    <Price>{detail.product.price - 10}</Price>원
                </List>
                <List>
                    <Level>브론즈</Level>
                    <Price>{detail.product.price - 20}</Price>원
                </List>
                <List>
                    <Level>실버</Level>
                    <Price>{detail.product.price - 30}</Price>원
                </List>
                <List>
                    <Level>골드</Level>
                    <Price>{detail.product.price - 40}</Price>원
                </List>
                <List>
                    <Level>플레티넘</Level>
                    <Price>{detail.product.price - 50}</Price>원
                </List>
                <List>
                    <Level>다이아몬드</Level>
                    <Price>{detail.product.price - 60}</Price>원
                </List>
            </ListWrapper>
        </div>
    );
};

export default PriceList;
