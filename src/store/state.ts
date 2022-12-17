import {todolistsReducer} from './todolist-reducer';

import { tasksReducer } from './tasks-reducer'

import {combineReducers, compose, legacy_createStore} from 'redux'


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, composeEnhancers())
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

