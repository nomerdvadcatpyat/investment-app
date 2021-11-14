import {get, isNull} from "./common";
import {Typography} from "antd";
import dayjs from "dayjs";

import {EMPTY_CELL_SYMBOL} from "../constants/common";
import {Security} from "../hooks/exchange/useTableColumns";

const getChangePriceTextType = (change: string) => {
    const changeInNumber = Number(change)

    if (changeInNumber > 0)
        return 'success'
    else if (changeInNumber < 0)
        return 'danger'
}

const CHANGE_PRICE_TEXT_STYLE = { margin: 0 }

export const renderPrice = (text: string) => !isNull(text) ? `${text}₽` : EMPTY_CELL_SYMBOL

export const renderChange = (security: Security) => {
    const textType = getChangePriceTextType(security.CHANGE)

    return get(security, 'CHANGE') ? (
        <>
            <Typography.Text type={textType} style={CHANGE_PRICE_TEXT_STYLE}>
                {security.CHANGE}₽ / {security.LASTTOPREVPRICE}%
            </Typography.Text>
        </>
    ) : EMPTY_CELL_SYMBOL
}

export const renderDate = (textDate: string) => dayjs(textDate).format('DD.MM.YYYY')

export const renderNumber = new Intl.NumberFormat('ru-RU').format