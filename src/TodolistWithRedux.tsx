import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {FilterValuesType, TodoListType} from './AppWithRedux';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
import {EditableSpan} from './components/EditableSpan';
import {DeleteOutlineRounded} from '@mui/icons-material';
import Input from './components/input';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store/state';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reducer';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './store/todolist-reducer';
import {TaskWithRedux} from './TaskWithRedux';

export type TodolistWithReduxPropsType = {
    todolist: TodoListType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistWithRedux: FC<TodolistWithReduxPropsType> = memo(({todolist}) => {
        const {id, title, filter} = todolist
        let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
        const dispatch = useDispatch()
        const removeTodolist = useCallback(() => dispatch(removeTodoListAC(id)),[dispatch, id])
        const onAllClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('all', id)), [dispatch, id])
        const onActiveClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('active', id)),[dispatch, id])
        const onCompletedClickHandler = useCallback(() => dispatch(changeTodoListFilterAC('completed', id)),[dispatch, id]);
        const addTaskHandler = useCallback((newTitle: string) => dispatch(addTaskAC(newTitle, id)),[dispatch, id])

    type ButtonWithMemoType = {
        color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
        onClick: () => void
        title: 'All' | 'Active' | 'Completed'
        style: React.CSSProperties
    }

    type ButtonGroupWithMemo = {
        variant: 'contained'
        fullWidth?: boolean
        size?: 'small' | 'medium' | 'large'
        disableElevation?: boolean
    }

    const ButtonWithMemo = (props: ButtonWithMemoType) => {
        return <Button
            color={props.color}
            onClick={props.onClick}
            style ={props.style}
        > {props.title}
        </Button>
    }


    const ButtonGroupWithMemo = (props: ButtonGroupWithMemo) => {
            return <ButtonGroup
                fullWidth={props.fullWidth}
                variant={props.variant}
                size={props.size}
                disableElevation={props.disableElevation}>
                <ButtonWithMemo color={filter === 'all' ?'secondary' : 'primary'} onClick={onAllClickHandler} title={'All'} style={{fontSize: '0.7em'}}/>
                <ButtonWithMemo color={filter === 'active' ?'secondary' : 'primary'} onClick={onActiveClickHandler} title={'Active'} style={{fontSize: '0.7em'}}/>
                <ButtonWithMemo color={filter === 'completed' ?'secondary' : 'primary'} onClick={onCompletedClickHandler} title={'Completed'} style={{fontSize: '0.7em'}}/>
            </ButtonGroup>
        }

        if (filter === 'active') {
            tasks = tasks.filter(t => t.isDone === false)
        }
        if (filter === 'completed') {
            tasks = tasks.filter(t => t.isDone === true)
        }
        const editTodolistHandler = useCallback((newTitle: string) => {
            dispatch(changeTodoListTitleAC(newTitle, id))
        },[dispatch, id])
        const editTaskHandler = useCallback((newTitle: string) => {
            dispatch(changeTaskTitleAC(id, newTitle, id))
        },[dispatch, id])
    const onClickHandler = () => dispatch(removeTaskAC(id, id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(id, newIsDoneValue, id));
    }
        return <div>
            <Typography
                variant={'h5'}
                align={'center'}
                style={{fontWeight: 'bold', marginBottom: '15px'}}
                // color={'ActiveBorder'}
            >
                <EditableSpan title={title} callback={editTodolistHandler}/>
                <IconButton onClick={removeTodolist} size={'small'} color={'warning'}><DeleteOutlineRounded/></IconButton>
            </Typography>

            <Input callback={addTaskHandler}/>
            <List>
                {
                    tasks.map(t => {
                        return <TaskWithRedux task={t} todoListId={id}/>
                    })
                }
            </List>
            <div>


              {/*  <ButtonGroup
                    fullWidth
                    variant={'contained'}
                    size={'small'}
                    disableElevation>
                </ButtonGroup>*/}

                <ButtonGroupWithMemo
                    variant = {'contained'}
                    size = {'small'}
                    fullWidth
                    disableElevation/>

                    {/* <Button
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        style={{fontSize: '0.7em'}}
                        className={props.filter === 'all' ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                    </Button>*/}



                 {/*   <Button
                        style={{fontSize: '0.7em'}}
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                    </Button>*/}

                    {/*<Button
                        style={{fontSize: '0.7em'}}
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>*/}

            </div>
        </div>
    })













