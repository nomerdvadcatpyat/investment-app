import isNil from 'lodash/isNil'
import lodashGet from 'lodash/get'

import {EMPTY_CELL_SYMBOL} from "../constants/common"

export const isNull = (obj: any) => obj === 'null' || isNil(obj)

export const get = (obj: any, key: string | string[]) => {
    const value = lodashGet(obj, key)

    if (isNull(obj) || isNull(value)) return null

    return value
}

export const getOrEmptySymbol = (obj: any, key: string | string[]) => get(obj, key) || EMPTY_CELL_SYMBOL