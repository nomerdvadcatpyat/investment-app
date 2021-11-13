import type {NextPage} from 'next'
import {Table} from "antd";
import useSWR from 'swr';

import {AuthRequired} from "../../components/auth/AuthRequired";
import {useTableColumns} from "../../hooks/shares/useTableColumns";

enum Market {
    SHARES = 'shares',
    BONDS = 'bonds',
    FOREIGN_SHARES = 'foreignshares'
}

const Home: NextPage = () => {

    const { data, error } = useSWR('/api/exchange/shares/tqbr')

    const columns = useTableColumns()

    return (
        <AuthRequired>
            <Table
                dataSource={data}
                columns={columns}
                loading={!data && !error}
            />
        </AuthRequired>
    )
}

export default Home
