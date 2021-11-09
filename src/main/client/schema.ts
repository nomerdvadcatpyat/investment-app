import {NextApiRequest} from "next";

export type NextApiRequestWithUser = NextApiRequest & {
    user?: { id: number, roles: string[] }
    token?: string
}

export type IUser = {
    id: number
    email: string
    password: string
    EmployeeId?: number | null
    ParentId?: number | null
    StudentId?: number | null
}

export type IClassFromDatabase = {
    ID: number
    StudyYear: number
    Letter: string
    ClassroomTeacher: number
    deleted: boolean
}

export type IStudentFormState = {
    email: string
    password?: string
    fio: string
    dob: string
    class: number
    existingAccount?: boolean
}

export type IStudentFromDatabase = {
    ID: string
    FIO: string
    DOB: string
    Class: number
    deleted: boolean,
    Class_ClassToStudent?: IClassFromDatabase
}

export type IEmployee = {
    id: number
    fio: string
    dob: string
    job: string
    isTeacher: boolean
    isDirectorate: boolean
    laborContract: number
    hiringDate: string
    dismissalDate: string
    userId: number
}

export type IEmployeeFormState = {
    fio: string
    dob: string
    job: string
    accessCheckboxes: []
    laborContract: number
    contractDates: string[]
    userId: number
    existingAccount?: boolean
    email: string
    password?: string
}

export type IChildFormState = {
    dob: string
    id: number
}

export type IParentFormState = {
    fio: string
    dob: string
    job: string
    phone: string
    address: string
    children: IChildFormState[]
    existingAccount?: boolean
    email: string
    password?: string
}

export type IParentFromDatabase = {
    ID: number
    FIO: string
    DOB: string
    Contacts: string
    Adress: string
    Job: string
    deleted: boolean
}

export enum UserRoles {
    Teacher,
    Directorate,
    Parent,
    Student,
}

export type IErrorStatusResponse = {
    error: string
}

export type IAuthedItem = {
    userId: number
    roles: UserRoles[]
}

export type IAuthedItemWithToken = IAuthedItem & {
    token: string
}