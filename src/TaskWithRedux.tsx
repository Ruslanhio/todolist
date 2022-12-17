import React, {ChangeEvent, memo} from 'react';
import {TaskType} from './TodolistWithRedux';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {DeleteOutlineRounded} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';

export type TaskPropsType = {
    task: TaskType,
   todoListId: string
}

export const TaskWithRedux = memo(({task, todoListId}: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(task.id, todoListId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todoListId))
    }
    const editTaskHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todoListId))
    }

    return <ListItem key={task.id}
                     style={{
                         padding: '0px',
                         justifyContent: 'space-between',
                         textDecoration: task.isDone ? 'line-through' : 'none'
                     }}
                     className={task.isDone ? 'is-done' : ''}>
        <Checkbox size={'small'} color={'primary'} onChange={onChangeHandler} checked={task.isDone}/>
        <EditableSpan title={task.title} callback={(newTitle) => editTaskHandler(newTitle)}/>
        <IconButton onClick={onClickHandler} size={'small'}>
            <DeleteOutlineRounded/>
        </IconButton>
    </ListItem>
})

