import {useRouter} from "next/router";
import {Col, Row, Typography} from "antd";

import {MainLoader} from "../../components/common/Loader";
import {BrokerageAccountsInfo} from "../../components/user/BrokerageAccountsInfo";

export default function UserPage () {
    const router = useRouter()
    const { username } = router.query

    if (typeof username !== 'string')
        return <MainLoader />

    return (
        <Row justify={'center'}>
            <Col span={22}>
                <Typography.Title level={1}>{username}</Typography.Title>
                <BrokerageAccountsInfo username={username} />
            </Col>
        </Row>
    )
}