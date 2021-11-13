import {useCallback, useEffect, useState} from "react";
import type {NextPage} from 'next'
import {Col, Row, Table} from "antd";
import useSWR from 'swr';
import get from 'lodash/get'
import {Gutter} from "antd/es/grid/row";

import {AuthRequired} from "../../components/auth/AuthRequired";
import {useTableColumns} from "../../hooks/shares/useTableColumns";
import {ExchangeSelect} from "../../components/exchange/ExchangeSelect";
import {BOARD_OPTIONS, Market, MARKET_OPTIONS, SharesBoard} from "../../constants/exchange";

const MAIN_ROW_GUTTERS: [Gutter, Gutter] = [0, 20]
const SELECTS_ROW_GUTTERS: [Gutter, Gutter] = [20, 0]

const Home: NextPage = () => {
    const columns = useTableColumns()
    const [boardOptions, setBoardOptions] = useState()
    const [selectedMarket, setSelectedMarket] = useState<string>(Market.SHARES)
    const [selectedBoard, setSelectedBoard] = useState<string>(SharesBoard.TQBR)

    const handleMarketSelect = useCallback((market) => setSelectedMarket(market), [])
    const handleBoardSelect = useCallback((board) => setSelectedBoard(board), [])

    const { data, error } = useSWR(`/api/exchange/${selectedMarket}/${selectedBoard}`)

    useEffect(() => {
        const boards = get(BOARD_OPTIONS, selectedMarket)
        setSelectedBoard(boards[0].value)
        setBoardOptions(boards)
    }, [selectedMarket])

    return (
        <AuthRequired>
            <Row gutter={MAIN_ROW_GUTTERS}>
                <Col span={24}>
                    <Row gutter={SELECTS_ROW_GUTTERS}>
                        <Col>
                            <ExchangeSelect
                                value={selectedMarket}
                                options={MARKET_OPTIONS}
                                onSelect={handleMarketSelect}
                                placeholder={'Рынок'}
                            />
                        </Col>
                        {
                            selectedMarket && (
                                <Col>
                                    <ExchangeSelect
                                        value={selectedBoard}
                                        options={boardOptions}
                                        onSelect={handleBoardSelect}
                                        placeholder={'Режим торгов'}
                                    />
                                </Col>
                            )
                        }
                    </Row>
                </Col>
                <Col span={24}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        loading={!data && !error}
                    />
                </Col>
            </Row>
        </AuthRequired>
    )
}

export default Home
