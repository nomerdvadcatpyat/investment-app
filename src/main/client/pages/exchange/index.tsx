import {useCallback, useEffect, useState} from "react";
import type {NextPage} from 'next'
import {Col, Row, Table} from "antd";
import useSWR from 'swr';
import get from 'lodash/get'
import {Gutter} from "antd/es/grid/row";

import {AuthRequired} from "../../components/auth/AuthRequired";
import {Security, useTableColumns} from "../../hooks/shares/useTableColumns";
import {ExchangeSelect} from "../../components/exchange/ExchangeSelect";
import {BOARD_OPTIONS, Market, MARKET_OPTIONS, SharesBoard} from "../../constants/exchange";
import {useRouter} from "next/router";

const MAIN_ROW_GUTTERS: [Gutter, Gutter] = [0, 20]
const SELECTS_ROW_GUTTERS: [Gutter, Gutter] = [20, 0]

const Home: NextPage = () => {
    const router = useRouter()
    const columns = useTableColumns()
    const [boardOptions, setBoardOptions] = useState()
    const [selectedMarket, setSelectedMarket] = useState<string>(Market.SHARES)
    const [selectedBoard, setSelectedBoard] = useState<string>(SharesBoard.TQBR)

    const { data, error } = useSWR(`/api/exchange/${selectedMarket}/${selectedBoard}`)

    useEffect(() => {
        const boards = get(BOARD_OPTIONS, selectedMarket)
        setSelectedBoard(boards[0].value)
        setBoardOptions(boards)
    }, [selectedMarket])

    const handleMarketSelect = useCallback((market) => setSelectedMarket(market), [])
    const handleBoardSelect = useCallback((board) => setSelectedBoard(board), [])
    const handleOnRow = (record: Security) => ({
      onClick: () => {
          router.push({
              pathname: router.route + `/${selectedMarket}/${selectedBoard}/${record.SECID}`
          })
      }
    })

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
                        onRow={handleOnRow}
                    />
                </Col>
            </Row>
        </AuthRequired>
    )
}

export default Home
