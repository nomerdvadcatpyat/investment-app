import React, {FC} from "react";
import {Typography} from "antd";

type KeyValueParagraphProps = {
    keyStr: string | JSX.Element,
    value: string | JSX.Element
}

const KEY_VALUE_DELIMITER = ':'

export const KeyValueParagraph: FC<KeyValueParagraphProps> = ({ keyStr, value }) => (
    <Typography.Paragraph>
        <Typography.Text strong>{keyStr}</Typography.Text>{KEY_VALUE_DELIMITER} <Typography.Text>{value}</Typography.Text>
    </Typography.Paragraph>
)