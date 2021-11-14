import {Dispatch, FC, useCallback, useEffect, useMemo, useState} from "react";
import {Button, Col, Form, Input, Row, Tabs, Typography} from "antd";
import {FetchService} from "../../services/FetchService";
import {useRouter} from "next/router";
import useSWR from "swr";
import {MainLoader} from "../common/Loader";

const { TabPane } = Tabs;

export type AccountType = {
    id: number,
    name: string,
    userId: number
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
    username: string | undefined | string[]
}

const ADD_BROKERAGE_ACCOUNT_BUTTON_STYLE = { padding: 0, fontSize: '20px' }

export const BrokerageAccountsInfo: FC<BrokerageAccountsInfoProps> = ({ username }) => {
    const [brokerageAccounts, setBrokerageAccounts] = useState<AccountType[]>([]);
    const [showBrokerageAccountNumberInput, setShowBrokerageAccountNumberInput] = useState<boolean>(false)
    const [selectedBrokerageAccount, setSelectedBrokerageAccount] = useState<string>()

    const { data: userSecurities, error: userSecuritiesFetchError } = useSWR(`/api/user/${username}/securities`)

    useEffect(() => {
        // don't use useSwr here because idk how to refetch data with it
        if (!showBrokerageAccountNumberInput) {
            // refetch brokerageAccounts when close addBrokerageAccount form
            FetchService.get(`/api/user/${username}/brokerage-accounts`)
                .then(({ data }) => setBrokerageAccounts(data))
        }
    }, [showBrokerageAccountNumberInput, username])

    const handleAddBrokerageAccountClick = useCallback(() => setShowBrokerageAccountNumberInput(true), [])
    const tabChangeHandler = useCallback((tabName: string) => {
        setSelectedBrokerageAccount(tabName)
    }, [setSelectedBrokerageAccount])

    if (!brokerageAccounts) {
        return <MainLoader />
    }

    return (
        <Row gutter={[0, 20]}>
            <Col span={24}>
                {
                    showBrokerageAccountNumberInput ? (
                        <AddBrokerageAccountForm setShowBrokerageAccountNumberInput={setShowBrokerageAccountNumberInput} />
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
                {
                    !brokerageAccounts || brokerageAccounts.length === 0 ? (
                        <Typography.Title level={4}>
                            У вас еще нет ни одного брокерского счета.&nbsp;
                        </Typography.Title>
                    ) : (
                        <Tabs onChange={tabChangeHandler}>
                            {
                                brokerageAccounts.map((account: AccountType) => (
                                    <TabPane key={account.id} tab={account.name}>
                                        <Typography.Text key={account.id}>{JSON.stringify(account)}</Typography.Text>
                                    </TabPane>
                                ))
                            }
                            <TabPane key={'all'} tab={'Все счета'}>
                                {/*<Typography.Text>{JSON.stringify(account)}</Typography.Text>*/}
                            </TabPane>
                        </Tabs>
                    )
                }
            </Col>
        </Row>
    )
}