import React from 'react';
import 'antd/dist/antd.css';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import styled from "@emotion/styled";

const antIcon = <LoadingOutlined spin/>

export const Loader = (props: unknown) => (
    <Spin
        indicator={antIcon}
        {...props}
    />
)

export const MainLoader = styled(Loader)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  & .ant-spin-dot {
    font-size: 50px;
  }
`