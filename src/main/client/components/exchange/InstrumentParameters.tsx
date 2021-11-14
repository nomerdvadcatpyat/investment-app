import {FC} from "react";

import {Market} from "../../constants/exchange";
import {get, getOrEmptySymbol} from "../../utils/common";
import {Security} from "../../hooks/exchange/useTableColumns";
import {renderChange, renderDate, renderPrice, renderNumber} from "../../utils/renders";
import {KeyValueParagraph} from "../common/KeyValueParagraph";

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
            <KeyValueParagraph keyStr={'Режим торгов'} value={`${boardName} ${boardId ? boardId : ''}`}/>
            <KeyValueParagraph keyStr={'Цена последней сделки'} value={renderPrice(renderNumber(price))}/>
            <KeyValueParagraph keyStr={'Изменение цены'} value={renderChange(security)} />
            <KeyValueParagraph keyStr={'Предложение'} value={renderNumber(offer)} />
            <KeyValueParagraph keyStr={'Спрос'} value={renderNumber(bid)} />
            <KeyValueParagraph keyStr={'Максимум'} value={renderNumber(high)} />
            <KeyValueParagraph keyStr={'Минимум'} value={renderNumber(low)} />
            <KeyValueParagraph keyStr={'Сделок сегодня'} value={renderNumber(todayTradesCount)} />
            <KeyValueParagraph keyStr={'Количество сегодня'} value={renderNumber(todayVolume)} />
            <KeyValueParagraph keyStr={'Капитализация'} value={renderNumber(capitalization)} />
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
            <ShareParameters security={security}/>
            <KeyValueParagraph keyStr={'Дата погашения'}  value={renderDate(MATDATE)}/>
            <KeyValueParagraph keyStr={'Дата выплаты купона'} value={renderDate(NEXTCOUPON)}/>
            <KeyValueParagraph keyStr={'Ставка купона'} value={`${COUPONPERCENT}%`} />
            <KeyValueParagraph keyStr={'Сумма купона, в валюте номинала'} value={renderNumber(COUPONVALUE)} />
            <KeyValueParagraph keyStr={'Доходность по оценке пред. дня'} value={renderNumber(YIELDATPREVWAPRICE)} />
            <KeyValueParagraph keyStr={'НКД на дату расчетов, в валюте расчетов'} value={renderNumber(ACCRUEDINT)} />
            <KeyValueParagraph keyStr={'Количество ценных бумаг в обращении'} value={renderNumber(ISSUESIZEPLACED)} />
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
            <KeyValueParagraph keyStr={'Код ценной бумаги'}  value={SECID}/>
            <KeyValueParagraph keyStr={'Полное наименование'} value={SECNAME}/>
            <KeyValueParagraph keyStr={'Краткое наименование'} value={`${SHORTNAME}`} />
            <KeyValueParagraph keyStr={'ISIN код'} value={ISIN} />
            <KeyValueParagraph keyStr={'Номер государственной регистрации'} value={REGNUMBER} />
            <KeyValueParagraph keyStr={'Объем выпуска'} value={renderNumber(ISSUESIZE)} />
            <KeyValueParagraph keyStr={'Номинальная стоимость'} value={renderNumber(FACEVALUE)} />
            <KeyValueParagraph keyStr={'Валюта номинала'}  value={FACEUNIT}/>
            <KeyValueParagraph keyStr={'Вид/категория ценной бумаги'} value={SECTYPE}/>
            <KeyValueParagraph keyStr={'Количество ценных бумаг в одном стандартном лоте'} value={renderNumber(LOTSIZE)} />
            <KeyValueParagraph keyStr={'Группа инструментов'} value={INSTRID} />
            <KeyValueParagraph keyStr={'Дата расчетов сделки'} value={renderDate(SETTLEDATE)} />
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