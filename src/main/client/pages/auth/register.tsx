import {Button, Checkbox, Col, Form, Input, Row, Typography} from "antd";
import {useRouter} from "next/router";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import Link from 'next/link'
import {useAuth} from "../../store/authStore";
import {INDEX_PAGE} from "../../constants/common";

const RegisterPage = observer(() => {
    const router = useRouter()
    const authStore = useAuth()
    const [error, setError] = useState<string | null>()

    useEffect(() => {
        return () => {
            authStore.error = null
        }
    }, [])

    const onFinish = async (values: any) => {
        const { login, password } = values
        await authStore.register(login, password)

        if (authStore.error) {
            setError(authStore.error)
        }
        else router.push(INDEX_PAGE)
    }

    return (
        <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
            <Col span={10}>
                <Form
                    name="login"
                    layout={'vertical'}
                    // wrapperCol={{ span: 20 }}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Логин"
                        name="login"
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

                    <Form.Item
                        label="Подтвердите пароль"
                        name="rePassword"
                        rules={[
                            {
                                required: true,
                                message: 'Заполните поле',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Row gutter={[0, 10]}>
                        {
                            error ? (
                                <Col>
                                    <Typography.Text type={"danger"}>
                                        {error}
                                    </Typography.Text>
                                </Col>
                            ) : null
                        }

                        <Col span={24}>
                            <Row justify={'space-between'}>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={authStore.loading}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                </Form.Item>
                                <Typography.Paragraph>
                                    Есть аккаунт?&nbsp;<Link href={'/auth/login'}>Войти</Link>
                                </Typography.Paragraph>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    )
})

export default RegisterPage