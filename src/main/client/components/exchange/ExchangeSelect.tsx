import {Select as AntSelect, SelectProps, Typography} from "antd";

const SELECT_STYLE = { width: 400 }

const handleFilterOption = (input: string, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

export const ExchangeSelect = (props: SelectProps<string>) => {
    return (
        <>
            <Typography.Paragraph>{props.placeholder}</Typography.Paragraph>
            <AntSelect
                showSearch
                style={SELECT_STYLE}
                optionFilterProp="children"
                filterOption={handleFilterOption}
                {...props}
            />
        </>

    )
}
