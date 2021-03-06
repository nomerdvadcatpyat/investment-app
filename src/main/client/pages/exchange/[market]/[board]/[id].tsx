import {useRouter} from "next/router";
import useSWR from "swr";
import {Button, Col, Form, Input, InputNumber, Row, Typography} from "antd";
import {Dispatch, FC, useCallback, useEffect, useState} from "react";

import {MainLoader} from "../../../../components/common/Loader";
import {get} from "../../../../utils/common";
import {CommonInstrumentInfo, InstrumentParameters} from "../../../../components/exchange/InstrumentParameters";
import {ALL_BROKERAGE_ACCOUNTS_TYPE, Market} from "../../../../constants/exchange";
import {REFETCH_INTERVAL_IN_MS} from "../../../../constants/common";
import {useAuth} from "../../../../store/authStore";
import {BrokerageAccountSecurity, useBrokerageAccountsList} from "../../../../components/user/BrokerageAccountsInfo";
import {FetchService} from "../../../../services/FetchService";

type OperationType = 'add' | 'remove'

type ModifySecurityCountInBrokerageAccountFormProps = {
    operationType: OperationType | undefined
    selectedBrokerageAccount: string | undefined
    ticker: string
    market: string
    board: string
    price: string
    setBrokerageAccountSecurities: Dispatch<BrokerageAccountSecurity[]>
    setIsModifySecurityCountFormVisible: Dispatch<boolean>
}

const ModifySecurityCountInBrokerageAccountForm: FC<ModifySecurityCountInBrokerageAccountFormProps> = ({ operationType, market, board, selectedBrokerageAccount, ticker, price, setBrokerageAccountSecurities, setIsModifySecurityCountFormVisible }) => {
    const handleSubmit = useCallback(async (values) => {
        setIsModifySecurityCountFormVisible(false)
        const { count } = values
        const delta = operationType === 'add' ? count : -count
        const { data } = await FetchService.post(`/api/brokerage-account/${selectedBrokerageAccount}/modifySecuritiesCount`, {
            ticker,
            market,
            board,
            price: Number(price),
            delta
        })

        FetchService.get(`/api/exchange/${data.market}/${data.board}/${data.ticker}`)
            .then(({ data: security }) => {
                //@ts-ignore
                setBrokerageAccountSecurities( (oldBrokerageAccountSecurities: BrokerageAccountSecurity[]) => {
                    const brokerageAccountSecuritiesWithoutUpdated = oldBrokerageAccountSecurities.filter(bac => bac.ticker !== data.ticker)
                    return [...brokerageAccountSecuritiesWithoutUpdated, {...data, price: security.LAST * data.count}]
                })
            })
    }, [operationType, selectedBrokerageAccount, ticker])

    return (
        <Form onFinish={handleSubmit}>
            <Row gutter={[10, 0]}>
                <Col>
                    <Form.Item name={'count'}>
                        <InputNumber min={0} />
                    </Form.Item>
                </Col>
                <Col>
                    <Button htmlType={'submit'}>??????????????????????</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default function SecurityPage () {
    const { token, username } = useAuth()
    const router = useRouter()
    const { market, board, id } = router.query
    const { data: security, error } = useSWR(market && board && id ? `/api/exchange/${market}/${board}/${id}` : null, {
        refreshInterval: REFETCH_INTERVAL_IN_MS
    })
    const [isModifySecurityCountFormVisible, setIsModifySecurityCountFormVisible] = useState<boolean>()
    const [selectedOperation, setSelectedOperation] = useState<OperationType>()
    const {
        BrokerageAccountsList,
        selectedBrokerageAccount,
        brokerageAccounts,
        brokerageAccountSecurities,
        setBrokerageAccountSecurities
    } = useBrokerageAccountsList({
        username,
        ticker: id
    })
    const handleAddButtonClick = useCallback(() => {
        setSelectedOperation('add')
        setIsModifySecurityCountFormVisible(true)
    }, [])
    const handleRemoveButtonClick = useCallback(() => {
        setSelectedOperation('remove')
        setIsModifySecurityCountFormVisible(true)
    }, [])
    const secName = get(security, 'SECNAME')
    const secPrice = get(security, 'LAST')

    useEffect(() => {
        setSelectedOperation(undefined)
        setIsModifySecurityCountFormVisible(false)
    }, [selectedBrokerageAccount])

    if (typeof market !== 'string' || typeof board !== 'string' || typeof id !== 'string') {
        return (
            <Typography.Paragraph>Error</Typography.Paragraph>
        )
    }

    if (!error && !security) {
        return <MainLoader />
    }

    return security && (
        <Row justify={'center'}>
            <Col span={22}>
                <Row gutter={[0, 20]}>
                    {
                        token && (
                            <Row gutter={[0, 10]}>
                                <Col span={24}>
                                    <BrokerageAccountsList
                                        brokerageAccounts={brokerageAccounts}
                                        brokerageAccountSecurities={brokerageAccountSecurities}
                                        username={username}
                                    />
                                </Col>
                                <Col>
                                    {
                                        selectedBrokerageAccount !== ALL_BROKERAGE_ACCOUNTS_TYPE && (
                                            <Row gutter={[10, 0]}>
                                                {
                                                    !isModifySecurityCountFormVisible ? (
                                                        <>
                                                            <Col>
                                                                <Button type={'primary'} onClick={handleAddButtonClick}>
                                                                    ????????????????
                                                                </Button>
                                                            </Col>
                                                            {
                                                                brokerageAccountSecurities.length > 0 && (
                                                                    <Col>
                                                                        <Button danger onClick={handleRemoveButtonClick}>
                                                                            ??????????????
                                                                        </Button>
                                                                    </Col>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <ModifySecurityCountInBrokerageAccountForm
                                                            selectedBrokerageAccount={selectedBrokerageAccount}
                                                            operationType={selectedOperation}
                                                            market={market}
                                                            board={board}
                                                            ticker={id}
                                                            price={secPrice}
                                                            setBrokerageAccountSecurities={setBrokerageAccountSecurities}
                                                            setIsModifySecurityCountFormVisible={setIsModifySecurityCountFormVisible}
                                                        />
                                                    )
                                                }
                                            </Row>
                                        )
                                    }
                                </Col>
                            </Row>
                        )
                    }
                    <Col span={24}>
                        <Row justify={'space-between'}>
                            <Col span={10}>
                                <Typography.Title level={2}>{secName}</Typography.Title>
                                <CommonInstrumentInfo security={security} />
                            </Col>
                            <Col span={10}>
                                <Typography.Title level={2}>?????????????????? ??????????????????????:</Typography.Title>
                                <InstrumentParameters marketType={market as Market} security={security} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}