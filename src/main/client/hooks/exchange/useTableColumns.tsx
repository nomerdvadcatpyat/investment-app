import {useCallback, useMemo} from "react";

import {getNumberSorter, getTextFilterColumnProperties, getTextSorter} from "../../utils/table";
import {renderChange, renderPrice} from "../../utils/renders";

export type Security = {
    SECID: string
    SHORTNAME: string
    // last price
    LAST: string
    // change in percents
    LASTTOPREVPRICE: string
    // change in currency
    CHANGE: string
}

enum DATA_INDICES {
    SECID = 'SECID',
    SHORTNAME = 'SHORTNAME',
    LAST = 'LAST',
    CHANGE = 'CHANGE',
}

export const useTableColumns = () => {
    const renderChangeInCell = useCallback((change: string, security: Security) => renderChange(security), [])

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
            render: renderChangeInCell,
            sorter: getNumberSorter(DATA_INDICES.CHANGE)
        }
    ]), [renderChange, renderPrice])
}