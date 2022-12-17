import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from './components/input';
import AppBar from '@mui/material/AppBar';
import {Menu} from '@mui/icons-material';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from './store/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/state';
import {TodolistWithRedux} from './TodolistWithRedux';
import {tasksSelector, todolistSelector} from './store/selectors';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(todolistSelector)
   const tasks = useSelector<AppRootStateType, TasksStateType>(tasksSelector)
    const dispatch = useDispatch()
 /*   const editTask = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId,taskId, newTitle))
    },[dispatch])
    const editTodolist = useCallback((todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    },[dispatch])


   const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    },[dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
           dispatch(changeTaskStatusAC(id, isDone, todoListId))
        },[dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId))

    },[dispatch])
    const removeTodolist = useCallback((id: string) => {
        let action = removeTodoListAC(id)
       dispatch(action)
    }, [dispatch])*/
    const addTodolist = useCallback((newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }, [dispatch])






    const todoListComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper
                    variant={'outlined'}
                    // elevation={8}
                    style={{width: '310px', padding: '20px'}}>
                    <TodolistWithRedux todolist={tl}/>
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu onClick={()=>alert('sdsadasd')}/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0', justifyContent: 'center'}}>
                    <Input callback={addTodolist}/>
                </Grid>
                <Grid container style={{justifyContent: 'center'}} spacing = {6}  >
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    )
}


