import {useRouter} from "next/router";
import useSWR from "swr";
import {Col, Row, Typography} from "antd";

import {MainLoader} from "../../../../components/common/Loader";
import {get} from "../../../../utils/common";
import {CommonInstrumentInfo, InstrumentParameters} from "../../../../components/exchange/InstrumentParameters";
import {Market} from "../../../../constants/exchange";
import {REFETCH_INTERVAL_IN_MS} from "../../../../constants/common";
import {useAuth} from "../../../../store/authStore";

export default function SecurityPage () {
    const { token } = useAuth()
    const router = useRouter()
    const { market, board, id } = router.query
    const { data: security, error } = useSWR(`/api/exchange/${market}/${board}/${id}`, {
        refreshInterval: REFETCH_INTERVAL_IN_MS
    })
    const secName = get(security, 'SECNAME')

    if (!error && !security) {
        return <MainLoader />
    }

    return security && (
        <Row justify={'center'}>
            <Col span={22}>
                {
                    token && (
                        <Col span={24}>
                            <Typography.Title level={1}>В вашем портфеле: </Typography.Title>
                        </Col>
                    )
                }
                <Col span={24}>
                    <Row justify={'space-between'}>
                        <Col span={10}>
                            <Typography.Title level={2}>{secName}</Typography.Title>
                            <CommonInstrumentInfo security={security} />
                        </Col>
                        <Col span={10}>
                            <Typography.Title level={2}>Параметры инструмента:</Typography.Title>
                            <InstrumentParameters marketType={market as Market} security={security} />
                        </Col>
                    </Row>
                </Col>
            </Col>
        </Row>
    )
}