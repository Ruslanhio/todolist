import { TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolist-reducer';


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT


const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK' : {
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK' : {
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            }
        }
        case 'CHANGE-TASK-STATUS'  : {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE' : {
            return {
                ...state,
                [action.todoListId] : state[action.todoListId].map(t=>t.id === action.taskId ? {...t, title: action.title}: t)
            }
        }
        case 'ADD-TODOLIST' : {
            return {
                ...state,
               [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST' : {
            const {[action.id] : [], ...rest} = {...state}
            return rest
            }
        default :
           return state
    }
}


export const removeTaskAC = (taskId: string, todoListId: string) => (
    {type: 'REMOVE-TASK', taskId, todoListId
    } as const)
export const addTaskAC = (title: string, todoListId: string) => (
    {
        type: 'ADD-TASK', title, todoListId
    }as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => (
    {
        type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId
    } as const)
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => (
    {
    type: 'CHANGE-TASK-TITLE', taskId, title, todoListId
}as const)

