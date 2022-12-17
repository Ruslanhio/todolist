import React, {ChangeEvent, memo} from 'react';
import {TaskType} from './TodolistWithRedux';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {DeleteOutlineRounded} from '@mui/icons-material';

export type TaskPropsType = {
    task: TaskType,
    removeTask: (taskId: string, ) => void
    changeTaskStatus: (id: string, isDone: boolean, ) => void
    editTask: ( taskId: string, newTitle: string) => void
}

export const Task = memo(({task, removeTask, changeTaskStatus, editTask}: TaskPropsType) => {
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue);
    }
    const editTaskHandler = (newTitle: string) => {
        editTask(task.id, newTitle)
    }

    return <ListItem key={task.id}
                     style={{
                         padding: '0px',
                         justifyContent: 'space-between',
                         textDecoration: task.isDone ? 'line-through' : 'none'
                     }}
                     className={task.isDone ? 'is-done' : ''}>
        <Checkbox size={'small'} color={'primary'} onChange={onChangeHandler} checked={task.isDone}/>
        {/* <span>{t.title}</span>*/}
        <EditableSpan title={task.title} callback={editTaskHandler}/>
        <IconButton onClick={onClickHandler} size={'small'}>
            <DeleteOutlineRounded/>
        </IconButton>
    </ListItem>
})

