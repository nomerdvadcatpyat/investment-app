import {FC} from "react";

import {Market} from "../../constants/exchange";
import {get, getOrEmptySymbol} from "../../utils/common";
import {Security} from "../../hooks/exchange/useTableColumns";
import {Typography} from "antd";
import {renderChange, renderDate, renderPrice} from "../../utils/renders";

type InstrumentParametersProps = {
    security: Security
}

export const CommonInstrumentInfo: FC<InstrumentParametersProps> = ({ security }) => {
    const boardName = getOrEmptySymbol(security, 'BOARDNAME')
    const boardId = get(security, 'BOARDID')
    const price = getOrEmptySymbol(security, 'LAST')
    const offer = getOrEmptySymbol(security, 'OFFER')
    const bid = getOrEmptySymbol(security, 'BID')
    const high = getOrEmptySymbol(security, 'HIGH')
    const low = getOrEmptySymbol(security, 'LOW')
    const todayTradesCount = getOrEmptySymbol(security, 'NUMTRADES')
    const todayVolume = getOrEmptySymbol(security, 'VOLTODAY')
    const capitalization = getOrEmptySymbol(security, 'ISSUECAPITALIZATION')

    return (
        <>
            <Typography.Paragraph> <Typography.Text strong>Режим торгов:</Typography.Text> {boardName} {boardId} </Typography.Paragraph>

            <Typography.Paragraph> Цена последней сделки: {renderPrice(price)} </Typography.Paragraph>
            <Typography.Paragraph> {renderChange(security)} </Typography.Paragraph>

            <Typography.Paragraph> Предложение: {offer} </Typography.Paragraph>
            <Typography.Paragraph> Спрос: {bid} </Typography.Paragraph>

            <Typography.Paragraph> Максимум: {high} </Typography.Paragraph>
            <Typography.Paragraph> Минимум: {low} </Typography.Paragraph>

            <Typography.Paragraph> Сделок сегодня: {todayTradesCount} </Typography.Paragraph>
            <Typography.Paragraph> Количество сегодня: {todayVolume} </Typography.Paragraph>

            <Typography.Paragraph> Капитализация: {capitalization} </Typography.Paragraph>
        </>
    )
}

const BondsParameters: FC<InstrumentParametersProps> = ({security}) => {
    const MATDATE = getOrEmptySymbol(security, 'MATDATE')
    const NEXTCOUPON = getOrEmptySymbol(security, 'NEXTCOUPON')
    const COUPONPERCENT = getOrEmptySymbol(security, 'COUPONPERCENT')
    const COUPONVALUE = getOrEmptySymbol(security, 'COUPONVALUE')
    const YIELDATPREVWAPRICE = getOrEmptySymbol(security, 'YIELDATPREVWAPRICE')
    const ACCRUEDINT = getOrEmptySymbol(security, 'ACCRUEDINT')
    const ISSUESIZEPLACED = getOrEmptySymbol(security, 'ISSUESIZEPLACED')

    return (
        <>
            <Typography.Paragraph> Дата погашения: {renderDate(MATDATE)} </Typography.Paragraph>
            <Typography.Paragraph> Дата выплаты купона: {renderDate(NEXTCOUPON)} </Typography.Paragraph>
            <Typography.Paragraph> Ставка купона: {COUPONPERCENT}% </Typography.Paragraph>
            <Typography.Paragraph> Сумма купона, в валюте номинала: {COUPONVALUE} </Typography.Paragraph>
            <Typography.Paragraph> Доходность по оценке пред. дня: {YIELDATPREVWAPRICE} </Typography.Paragraph>
            <Typography.Paragraph> НКД на дату расчетов, в валюте расчетов: {ACCRUEDINT} </Typography.Paragraph>
            <Typography.Paragraph> Количество ценных бумаг в обращении: {ISSUESIZEPLACED} </Typography.Paragraph>
        </>
    )
}

const ShareParameters: FC<InstrumentParametersProps> = ({security}) => {
    const SECID = getOrEmptySymbol(security, 'SECID')
    const SECNAME = getOrEmptySymbol(security, 'SECNAME')
    const SHORTNAME = getOrEmptySymbol(security, 'SHORTNAME')
    const ISIN = getOrEmptySymbol(security, 'ISIN')
    const REGNUMBER = getOrEmptySymbol(security, 'REGNUMBER')
    const ISSUESIZE = getOrEmptySymbol(security, 'ISSUESIZE')
    const FACEVALUE = getOrEmptySymbol(security, 'FACEVALUE')
    const FACEUNIT = getOrEmptySymbol(security, 'FACEUNIT')
    const SECTYPE = getOrEmptySymbol(security, 'SECTYPE')
    const LOTSIZE = getOrEmptySymbol(security, 'LOTSIZE')
    const INSTRID = getOrEmptySymbol(security, 'INSTRID')
    const SETTLEDATE = getOrEmptySymbol(security, 'SETTLEDATE')

    return (
        <>
            <Typography.Paragraph> Код ценной бумаги: {SECID} </Typography.Paragraph>
            <Typography.Paragraph> Полное наименование: {SECNAME} </Typography.Paragraph>
            <Typography.Paragraph> Краткое наименование: {SHORTNAME} </Typography.Paragraph>
            <Typography.Paragraph> ISIN код: {ISIN} </Typography.Paragraph>
            <Typography.Paragraph> Номер государственной регистрации: {REGNUMBER} </Typography.Paragraph>
            <Typography.Paragraph> Объем выпуска: {ISSUESIZE} </Typography.Paragraph>
            <Typography.Paragraph> Номинальная стоимость: {FACEVALUE} </Typography.Paragraph>
            <Typography.Paragraph> Валюта номинала: {FACEUNIT} </Typography.Paragraph>
            <Typography.Paragraph> Вид/категория ценной бумаги: {SECTYPE} </Typography.Paragraph>
            <Typography.Paragraph> Количество ценных бумаг в одном стандартном лоте: {LOTSIZE} </Typography.Paragraph>
            <Typography.Paragraph> Группа инструментов: {INSTRID} </Typography.Paragraph>
            <Typography.Paragraph> Дата расчетов сделки: {renderDate(SETTLEDATE)} </Typography.Paragraph>
        </>
    )
}

type InstrumentParametersSwitchProps = InstrumentParametersProps & { marketType: Market }

export const InstrumentParameters: FC<InstrumentParametersSwitchProps> = ({marketType, security}) => {
    return marketType === Market.BONDS ? (
        <BondsParameters security={security} />
    ) : (
        <ShareParameters security={security} />
    )
}