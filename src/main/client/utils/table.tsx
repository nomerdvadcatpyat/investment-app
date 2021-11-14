import get from 'lodash/get'
import isNaN from 'lodash/isNaN'
import {CSSProperties, FC} from "react";
import {Button, Input, Space} from "antd";

export const getTextSorter = (field: string) => (firstRecord: unknown, secondRecord: unknown) => {
    const firstRecordValue = get(firstRecord, field)
    const secondRecordValue = get(secondRecord, field)

    return firstRecordValue.length - secondRecordValue.length
}

export const getNumberSorter = (field: string) => (firstRecord: unknown, secondRecord: unknown) => {
    const firstRecordValue = Number(get(firstRecord, field))
    const secondRecordValue = Number(get(secondRecord, field))

    if (isNaN(firstRecordValue) && isNaN(secondRecordValue)) return 0
    if (isNaN(firstRecordValue) && !isNaN(secondRecordValue)) return -1
    if (!isNaN(firstRecordValue) && isNaN(secondRecordValue)) return 1

    return firstRecordValue - secondRecordValue
}

export type FilterContainerProps = {
    clearFilters: () => void
    showClearButton?: boolean
    style?: CSSProperties
}

export const FilterContainer: FC<FilterContainerProps> = (props) => {
    return (
        <div style={{ padding: 16 }}>
            <Space size={8} direction={'vertical'} align={'center'}>
                {props.children}
                {
                    props.showClearButton && (
                        <Button
                            size={'small'}
                            onClick={() => props.clearFilters()}
                            // type={'inlineLink'}
                        >
                            Сбросить
                        </Button>
                    )
                }
            </Space>
        </div>
    )
}

// eslint-disable-next-line react/display-name
export const getTextFilterDropdown = (placeholder: string) => ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
    <FilterContainer
        clearFilters={clearFilters}
        showClearButton={selectedKeys && selectedKeys.length > 0}>
        <Input
            placeholder={placeholder}
            // @ts-ignore
            value={selectedKeys}
            onChange={(e) => {
                // @ts-ignore
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
            }}
        />
    </FilterContainer>
)


export function getTextFilterColumnProperties <T> (dataIndex: string, placeholder: string) {
    return {
        filterDropdown: getTextFilterDropdown(placeholder),
        onFilter: (value: string | number | boolean, record: T) => {
            const recordValue = get(record, dataIndex)

            if (typeof value !== 'string') return

            return recordValue
                ? recordValue.toString().toLowerCase().includes(value.toLowerCase())
                : ''
        }
    }
}