import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {useRouter} from "next/router";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {Typography} from "antd";
import Link from 'next/link'
import {useAuth} from "../../store/authStore";

const LoginPage = observer(() => {
    const router = useRouter()
    const authStore = useAuth()
    const [error, setError] = useState<string | null>()

    useEffect(() => {
        return () => {
            authStore.error = null
        }
    }, [])

    const onFinish = async (values: any) => {
        const { email, password } = values
        await authStore.login(email, password)
        if (authStore.error) {
            setError(authStore.error)
        }
        else router.push('/')
    }

    return (
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
            <Col span={10}>
                <Form
                    name="login"
                    labelCol={{ md: { span: 5 } }}
                    wrapperCol={{ span: 18 }}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Почта"
                        name="email"
                        rules={[{required: true, message: 'Заполните поле'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[{required: true, message: 'Заполните поле'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Row gutter={[0, 10]}>
                        {
                            error ? (
                                <Col offset={5}>
                                    <Typography.Text type={"danger"}>
                                        {error}
                                    </Typography.Text>
                                </Col>
                            ) : null
                        }

                        <Col md={{ offset: 5 }} span={18}>
                            <Row justify={'space-between'}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={authStore.loading}
                                    >
                                        Войти
                                    </Button>
                                </Form.Item>
                                <Typography.Paragraph>
                                    Нет аккаунта?&nbsp;<Link href={'/auth/register'}>Зарегистрироваться</Link>
                                </Typography.Paragraph>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
})

export default LoginPage