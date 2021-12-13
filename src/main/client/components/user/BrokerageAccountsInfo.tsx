import {Dispatch, FC, useCallback, useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Tabs, Typography} from "antd";
import {FetchService} from "../../services/FetchService";
import useSWR from "swr";
import {ALL_BROKERAGE_ACCOUNTS_TYPE} from "../../constants/exchange";
import {KeyValueParagraph} from "../common/KeyValueParagraph";

const { TabPane } = Tabs;

export type AccountType = {
    id: number,
    name: string,
    userId: number
}

type UseBrokerageAccountsListArgumentType = {
    username: string | null
    ticker?: string
    refetchBrokerageAccountsDependencies?: any[]
    loading: boolean
}

// @ts-ignore
const InnerBrokerageAccountsList = ({ tabChangeHandler, brokerageAccounts, brokerageAccountSecurities, username, ticker }) => {
    if (!username || !brokerageAccounts) {
        return <></>
    }

    const isBrokerageAccountEmpty = brokerageAccountSecurities.length === 0

    return brokerageAccounts.length === 0 ? (
        <Typography.Title level={4}>
            У вас еще нет ни одного брокерского счета.&nbsp;
        </Typography.Title>
    ) : (
        <Tabs onChange={tabChangeHandler} defaultActiveKey={'1'}>
            {/*<TabPane key={ALL_BROKERAGE_ACCOUNTS_TYPE} tab={'Все счета'}>*/}
            {/*    /!*<Typography.Text>{JSON.stringify(account)}</Typography.Text>*!/*/}
            {/*</TabPane>*/}
            {
                brokerageAccounts.map((account: AccountType) => (
                    <TabPane key={account.id} tab={account.name}>
                        {
                            !isBrokerageAccountEmpty ? (
                                <>
                                    {
                                        brokerageAccountSecurities?.filter(bas => ticker ? bas.ticker === ticker : true)
                                            .map((bas: BrokerageAccountSecurity) => {
                                            return <KeyValueParagraph key={bas.ticker} keyStr={bas.ticker} value={`${bas.count} штук, суммарная стоимость: ${bas.price}₽`} />
                                        })
                                    }
                                </>
                            ): (
                                <Typography.Text> На выбранном счету нет ценных бумаг </Typography.Text>
                            )
                        }
                    </TabPane>
                ))
            }
        </Tabs>
    )
}

export type BrokerageAccountSecurity = {
    id: number
    ticker: string
    market: string
    board: string
    price: string
    count: number
    brokerageAccountId: number
}

export const useBrokerageAccountsList = ({ ticker, username, refetchBrokerageAccountsDependencies = [] }: UseBrokerageAccountsListArgumentType) => {
    const [brokerageAccounts, setBrokerageAccounts] = useState<AccountType[] | null>(null)
    const [brokerageAccountSecurities, setBrokerageAccountSecurities] = useState<BrokerageAccountSecurity[]>([])
    const [selectedBrokerageAccount, setSelectedBrokerageAccount] = useState<number>('1')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!username) return

        setLoading(true)
        // don't use useSwr here because idk how to refetch data with it
        FetchService.get(`/api/user/${username}/brokerage-accounts`)
            .then(({ data }) => {
                setBrokerageAccounts(data)
                setLoading(false)
            })
    }, [...refetchBrokerageAccountsDependencies, username])

    useEffect(() => {
        if (!username || !selectedBrokerageAccount) return

        setLoading(true)
        // if (selectedBrokerageAccount === ALL_BROKERAGE_ACCOUNTS_TYPE) {
        //     FetchService.get(`/api/user/${username}/securities`)
        //         .then(({ data }) => {
        //             setBrokerageAccountSecurities(data)
        //             setLoading(false)
        //         })
        // } else {
        FetchService.get(`/api/brokerage-account/${selectedBrokerageAccount}/securities`)
            .then(({ data: securities }) => {
                return Promise.all(
                    securities.map((bas) => {
                        return FetchService.get(`/api/exchange/${bas.market}/${bas.board}/${bas.ticker}`)
                            .then(({ data }) => ({...bas, price: data.LAST * bas.count}))
                    }))
                    .then(data => {
                        setBrokerageAccountSecurities(data)
                        setLoading(false)
                    })
            })
        // }
    }, [selectedBrokerageAccount, username])

    const tabChangeHandler = useCallback((tabName: string) => {
        setSelectedBrokerageAccount(tabName)
    }, [])

    const BrokerageAccountsList = useCallback((props) => (
        <InnerBrokerageAccountsList
            tabChangeHandler={tabChangeHandler}
            ticker={ticker}
            loading={loading}
            {...props}
        />
    ), [tabChangeHandler])

    return {
        BrokerageAccountsList,
        selectedBrokerageAccount,
        setBrokerageAccountSecurities,
        brokerageAccountSecurities,
        brokerageAccounts
    }
}

type AddBrokerageAccountFormProps = {
    setShowBrokerageAccountNumberInput: Dispatch<boolean>
}

const AddBrokerageAccountForm: FC<AddBrokerageAccountFormProps> = ({ setShowBrokerageAccountNumberInput }) => {
    const handleSubmit = useCallback(async (values) => {
        await FetchService.put('/api/brokerage-account/create', values)
        setShowBrokerageAccountNumberInput(false)
    }, [setShowBrokerageAccountNumberInput])

    const handleCancel = useCallback(() => {
        setShowBrokerageAccountNumberInput(false)
    }, [setShowBrokerageAccountNumberInput])

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'brokerageAccount'}>
                <Input placeholder={'Введите номер брокерского счета'} />
            </Form.Item>
            <Row gutter={[10, 0]}>
                <Col>
                    <Button type={'primary'} htmlType='submit'>Добавить</Button>
                </Col>
                <Col>
                    <Button type={'dashed'} onClick={handleCancel}>Отмена</Button>
                </Col>
            </Row>
        </Form>
    )
}

type BrokerageAccountsInfoProps = {
    username: string
}

const ADD_BROKERAGE_ACCOUNT_BUTTON_STYLE = { padding: 0, fontSize: '20px' }

export const BrokerageAccountsInfo: FC<BrokerageAccountsInfoProps> = ({ username }) => {
    const [showBrokerageAccountNumberInput, setShowBrokerageAccountNumberInput] = useState<boolean>(false)
   const handleAddBrokerageAccountClick = useCallback(() => setShowBrokerageAccountNumberInput(true), [])
    const { BrokerageAccountsList, brokerageAccountSecurities, brokerageAccounts } = useBrokerageAccountsList({
        username,
        refetchBrokerageAccountsDependencies: [showBrokerageAccountNumberInput]
    })

    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                {
                    showBrokerageAccountNumberInput ? (
                        <AddBrokerageAccountForm
                            setShowBrokerageAccountNumberInput={setShowBrokerageAccountNumberInput}
                        />
                    ) : (
                        <Button
                            type={'link'}
                            style={ADD_BROKERAGE_ACCOUNT_BUTTON_STYLE}
                            onClick={handleAddBrokerageAccountClick}
                        >
                            Добавить брокерский счет
                        </Button>
                    )
                }
            </Col>
            <Col span={24}>
                <BrokerageAccountsList
                    brokerageAccounts={brokerageAccounts}
                    brokerageAccountSecurities={brokerageAccountSecurities}
                    username={username}
                />
            </Col>
        </Row>
    )
}