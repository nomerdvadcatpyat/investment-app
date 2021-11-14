import {useRouter} from "next/router";
import useSWR from "swr";
import {Col, Row, Typography} from "antd";

import {MainLoader} from "../../../../components/common/Loader";
import {get} from "../../../../utils/common";
import {CommonInstrumentInfo, InstrumentParameters} from "../../../../components/exchange/InstrumentParameters";
import {Market} from "../../../../constants/exchange";

export default function SecurityPage () {
    const router = useRouter()
    const { market, board, id } = router.query
    const { data: security, error } = useSWR(`/api/exchange/${market}/${board}/${id}`)
    const secName = get(security, 'SECNAME')

    if (!error && !security) {
        return <MainLoader />
    }

    return security && (
        <Row justify={'center'}>
            <Col span={10}>
                <Typography.Title level={1}>{secName}</Typography.Title>
                <CommonInstrumentInfo security={security} />
            </Col>
            <Col span={10}>
                <Typography.Title level={2}>Параметры инструмента:</Typography.Title>
                <InstrumentParameters marketType={market as Market} security={security} />
            </Col>
        </Row>
    )
}