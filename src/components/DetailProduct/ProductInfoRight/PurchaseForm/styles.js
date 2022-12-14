import styled from '@emotion/styled';

export const FormWrapper = styled.div`
    margin-top: 30px;
    position: relative;
    backgroud: #f3f3f3;
    border: 1px solid #ddd;
    margin-left: 20px;
    padding: 12px 9px 7px 9px;

    .hidden {
        opacity: 0;
        visibility: hidden;
    }
`;

export const BuyOption = styled.select`
    height: 26px;
    margin-bottom: 3px;
    padding: 3px 0 4px 2px;
    font-size: 11px;
    color: #666;
    width: 100%;
    background: #fff;
    margin-top: -2px;
    border: 0;
    border-radius: 0;
    vertical-align: middle;
    cursor: pointer;

    span {
        text-align: right;
    }
`;

export const TotalPrice = styled.div`
    height: 16px;
    margin-left: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-top: none;
    display: flex;
    justify-content: space-between;
    p {
        font-size: 16px;
        font-weight: bold;
        padding-right: 20px;
    }
    div {
        position: absoulte;
        font-size: 16px;
        font-weight: bold;
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 15px;
    margin-left: 20px;
    display: inline-flex;
`;

export const ButtonBuy = styled.div`
    background-color: black;
    color: white;
    width: 270px;
    height: 60px;
    text-align: center;
    line-height: 58px;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`;

export const ButtonLike = styled.div`
    border: 1px solid #ddd;
    margin-left: 5px;
    background-color: ${props => (props.clickedlike ? '#F42C28' : '#fff')};
    width: 60px;
    position: relative;
    cursor: pointer;
`;

export const Like = styled.span`
    position: absolute;
    line-height: normal;
    color: #bbb;
    color: ${props => (props.clickedlike ? '#fff' : '#bbb')};
    font-size: 12px;
    font-weight: bold;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
`;

export const Button = styled.i`
    position: absolute;
    top: 8px;
    left: 17px;
    width: 30px;
    height: 30px;
    background: url('https://static.msscdn.net/skin/musinsa/images/icon.png?20190715');
    background-position: ${props => (props.clickedlike ? '-212px -12px' : '-181px -12px')};

    cursor: pointer;
    color: rgb(0, 0, 0, 0);
`;

export const ButtonCart = styled.div`
    border: 1px solid #ddd;
    margin-left: 5px;
    background-color: white;
    width: 60px;
    position: relative;
    cursor: pointer;

    i {
        position: absolute;
        top: 12px;
        left: 17px;
        width: 30px;
        height: 30px;
        background: url('https://static.msscdn.net/skin/musinsa/images/icon.png?20190715');
        background-position: -240px -10px;
        color: rgb(0, 0, 0, 0);
        text-indent: 100%;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const SelectedOption = styled.div`
    display: flex;
    width: 100%;
    max-width: 402px;
    margin-left: 20px;
    border: 1px solid #ddd;
    height: 50px;
    align-items: center;
    margin-top: -1px;

    & > div:nth-of-type(1) {
        flex: 1.5;
        padding-right: 10px;
        color: #777;
        font-size: 12px;
        font-weight: bold;
        padding-left: 17px;
    }

    & > div:nth-of-type(2) {
        display: inline-block;
        padding: 10px;
        font-size: 12px;
        flex: 1;
        text-align: right;
        padding-right: 10px;
        color: #777;
        font-size: 12px;
        font-weight: bold;
        padding-left: 17px;

        li:last-child {
            font-size: 20px;
            font-weight: bold;
            background-color: #eee;
            border-left: none;
            cursor: pointer;
        }
        li {
            float: left;
            width: 25px;
            height: 25px;
            text-align: center;
            line-height: 23px;
            border: 1px solid #eee;
        }
    }

    & > div:nth-of-type(3) {
        flex: 1;
        text-align: right;
        padding-right: 10px;

        div {
            font-size: 13px;
            font-weight: bold;
            color: #777;
            display: inline-block;
        }
        p {
            font-size: 12px;
            font-weight: bold;
            display: inline-block;
            cursor: pointer;
            margin-left: 5px;
        }
    }
`;

export const Selected = styled.div`
    color: #777;
    font-size: 12px;
    font-weight: bold;
    float: left;
    padding: 10px;
    padding-left: 17px;
    padding-top: 17px;
    width: 145px;
`;

export const Amount = styled.div`
    display: inline-block;
    float: left;
    padding: 10px;
    font-size: 12px;
    li:last-child {
        font-size: 20px;
        font-weight: bold;
        background-color: #eee;
        border-left: none;
        cursor: pointer;
    }
    li {
        float: left;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 23px;
        border: 1px solid #eee;
    }
`;

export const Decrease = styled.li`
    font-size: 20px;
    font-weight: bold;
    background-color: #eee;
    border-right: none;
    cursor: pointer;
    color: ${props => (props.orderAmount === 1 ? '#ddd' : '#777')};
`;

export const Price = styled.div`
    float: left;
    div {
        font-size: 13px;
        font-weight: bold;
        color: #777;
        display: inline-block;
        padding: 15px 10px 10px 40px;
    }
    p {
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
        cursor: pointer;
    }
`;
