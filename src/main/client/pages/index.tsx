import type {NextPage} from 'next'
import {DatePicker, Table, Typography} from "antd";
import useSWR from 'swr';

type SecurityType = {
    ticker: string
    name: string
    price: string
    changeInCurrency: string
    changeInPercentages: string
    currency: string
}

const Home: NextPage = () => {
    // const {data, error} = useSWR('/api/user/')

    // тикер название цена последнее_изменение_в_валюте последнее_изменение_в_процентах

    const data: SecurityType[] = [
        {
            ticker: 'SBER',
            name: 'СБЕР Банк',
            price: '360',
            changeInCurrency: '+0.15',
            changeInPercentages: '+0.2',
            currency: 'RUB'
        },
        {
            ticker: 'GAZP',
            name: 'Газпром',
            price: '370',
            changeInCurrency: '-0.25',
            changeInPercentages: '-0.13',
            currency: 'RUB'
        },
    ]

    const columns: any = [
        {
            title: 'Тикер',
            dataIndex: 'ticker',
            key: 'ticket',
            width: '10%',
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            render: (text: string) => `${text}₽`
        },
        {
            title: 'Изменение',
            key: 'price',
            width: '10%',
            render: (text: string, security: SecurityType) => {
                return (
                    <>
                        {security.changeInCurrency}₽ / {security.changeInPercentages}%
                    </>
                )
            }
        }
    ]

    return (
        <Table
            dataSource={data}
            columns={columns}
        />
    )
}

export default Home
