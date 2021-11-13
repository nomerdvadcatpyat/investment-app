import {CSSProperties, FC, useCallback, useMemo} from "react";
import {Button, Input, Space, Typography} from "antd";

import {EMPTY_CELL_SYMBOL} from "../../constants/table";
import {getNumberSorter, getTextFilterColumnProperties, getTextFilterDropdown, getTextSorter} from "../../utils/table";

type Security = {
    SECID: string
    SHORTNAME: string
    // last price
    LAST: string
    // change in percents
    LASTTOPREVPRICE: string
    // change in currency
    CHANGE: string
}

const getChangePriceTextType = (change: string) => {
    const changeInNumber = Number(change)

    if (changeInNumber > 0)
        return 'success'
    else if (changeInNumber < 0)
        return 'danger'
}

const CHANGE_PRICE_TEXT_STYLE = { margin: 0 }

enum DATA_INDICES {
    SECID = 'SECID',
    SHORTNAME = 'SHORTNAME',
    LAST = 'LAST',
    CHANGE = 'CHANGE',
}

export const useTableColumns = () => {
    const renderPrice = useCallback(
        (text: string) => text !== 'null' ? `${text}₽` : EMPTY_CELL_SYMBOL,
        [])

    const renderChange = useCallback((text: string, security: Security) => {
        const textType = getChangePriceTextType(security.CHANGE)

        return security.CHANGE !== 'null' ? (
            <>
                <Typography.Paragraph type={textType} style={CHANGE_PRICE_TEXT_STYLE}>
                    {security.CHANGE}₽ / {security.LASTTOPREVPRICE}%
                </Typography.Paragraph>
            </>
        ) : EMPTY_CELL_SYMBOL
    }, [])

    return useMemo(() => ([
        {
            title: 'Тикер',
            dataIndex: DATA_INDICES.SECID,
            key: DATA_INDICES.SECID,
            width: '10%',
            sorter: getTextSorter(DATA_INDICES.SECID),
            ...getTextFilterColumnProperties<Security>(DATA_INDICES.SECID, 'Тикер'),
        },
        {
            title: 'Название',
            dataIndex: DATA_INDICES.SHORTNAME,
            key: DATA_INDICES.SHORTNAME,
            width: '15%',
            sorter: getTextSorter(DATA_INDICES.SHORTNAME),
            ...getTextFilterColumnProperties<Security>(DATA_INDICES.SHORTNAME, 'Название'),
        },
        {
            title: 'Цена',
            dataIndex: DATA_INDICES.LAST,
            key: DATA_INDICES.LAST,
            width: '10%',
            render: renderPrice,
            sorter: getNumberSorter(DATA_INDICES.LAST),
            ...getTextFilterColumnProperties<Security>(DATA_INDICES.LAST, 'Цена'),
        },
        {
            title: 'Изменение',
            key: 'price',
            width: '10%',
            render: renderChange,
            sorter: getNumberSorter(DATA_INDICES.CHANGE)
        }
    ]), [renderChange, renderPrice])
}