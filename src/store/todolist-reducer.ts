import {FilterValuesType, TodoListType} from '../AppWithRedux';
import {v1} from "uuid";




export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string
}

export type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const initialState: Array<TodoListType> = []
export const  todolistsReducer = (state  = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [...state, { id: action.todoListId, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=>tl.id === action.todoListId ? {...tl, filter: action.filter}: tl)
        case 'CHANGE-TODOLIST-TITLE' :
            return state.map(tl=>tl.id===action.todoListId ? {...tl, title: action.title}: tl)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodoListAT => (
    {type: 'REMOVE-TODOLIST', id: todoListId})
export const addTodoListAC = (title: string): AddTodoListAT => (
    {type: 'ADD-TODOLIST', title: title, todoListId: v1()})
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string):ChangeTodoListFilterAT => (
    {type: 'CHANGE-TODOLIST-FILTER', filter:filter, todoListId: id})
export const changeTodoListTitleAC = (title: string, id: string):ChangeTodoListTitleAT => (
    {type: 'CHANGE-TODOLIST-TITLE', title:title, todoListId: id})
