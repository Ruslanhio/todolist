import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import Input from './components/input';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
import {CheckCircleOutline, DeleteOutlineRounded} from '@mui/icons-material';
import {Task} from './Task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
    editTodolist: (todolistId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    const removeTodolist = () => props.removeTodolist(props.id)
    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const editTodolistHandler = (newTitle: string) => {
        props.editTodolist(props.id, newTitle)
    }


    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id),[props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, status: boolean) => {

        props.changeTaskStatus(taskId, status, props.id);
    },[props.changeTaskStatus, props.id])
    const editTask = useCallback((taskId: string, newTitle: string) => {
        props.editTask(taskId, newTitle, props.id)
    },[props.editTask, props.id])
    return <div>
        <Typography
            variant={'h5'}
            align={'center'}
            style={{fontWeight: 'bold', marginBottom: '15px'}}
            // color={'ActiveBorder'}
        >
            <EditableSpan title={props.title} callback={editTodolistHandler}/>
            <IconButton onClick={removeTodolist} size={'small'} color={'warning'}><DeleteOutlineRounded/></IconButton>
        </Typography>
        <Input callback={addTaskHandler}/>
        <List>
            {
                props.tasks.map(t => {

                    return <Task key={t.id} task={t} removeTask={removeTask} changeTaskStatus={changeTaskStatus} editTask={editTask}/>
                })
            }
        </List>
        <div>
            <ButtonGroup
                fullWidth
                variant={'contained'}
                size={'small'}
                disableElevation>
                <Button
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    style={{fontSize: '0.7em'}}
                    /*className={props.filter === 'all' ? "active-filter" : ""}*/
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{fontSize: '0.7em'}}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}   /*className={props.filter === 'active' ? "active-filter" : ""}*/
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    style={{fontSize: '0.7em'}}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}  /*className={props.filter === 'completed' ? "active-filter" : ""}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


