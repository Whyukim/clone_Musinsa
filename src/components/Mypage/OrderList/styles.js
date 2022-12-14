import styled from '@emotion/styled';

export const OrderTable = styled.table`
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
    table-layout: fixed;
    tr {
        transition: ease-in background-color 0.2s;
        &:hover {
            background-color: #f5f5f5;
        }
    }
    th {
        height: 52px;
        border-bottom: 1px solid #000000;
        font-size: 16px;
        vertical-align: middle;
        font-weight: bold;
    }
    td {
        position: relative;
        height: 70px;
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid #f5f5f5;
        text-align: center;
        vertical-align: middle;
        word-break: break-all;
        &:first-of-type {
            text-align: left;
        }
        ul {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            li {
                a {
                    text-decoration: none;
                    strong {
                        color: #000000;
                        font-weight: bold;
                    }
                    &:hover {
                        text-decoration: underline;
                    }
                }

                font-size: 14px;
                color: gray;
                line-height: 1.5;
            }
        }
    }
`;

export const ImgSpan = styled.span`
    float: left;
    margin-right: 10px;
`;
