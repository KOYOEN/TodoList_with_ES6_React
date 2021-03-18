export enum enumList {
    dbName = "todos-reactjs",
    sectionClassName = "todoapp",
}

export interface Item {
    id: number,
    title: string,
    completed: boolean,
    editing: boolean
}

export interface Count {
    active: number,
    completed: number,
    total: number
}
