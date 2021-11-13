import get from 'lodash/get'
import isNaN from 'lodash/isNaN'

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