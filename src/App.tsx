import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import Input from './components/input';
import AppBar from '@mui/material/AppBar';
import {Menu} from '@mui/icons-material';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Meet', isDone: false}
        ]
    })

    const editTask = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map((el) => el.id === taskId ? {...el, title: newTitle} : el)
        })
    }

    const editTodolist = (todoListId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todoListId ? {...el, title: newTitle} : el))
    }


    function removeTask(id: string, todoListId: string) {
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todoListId] = todolistTasks.filter(t => t.id !== id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todoListId:
        let todoListTasks = tasks[todoListId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todoListId] = [task, ...todoListTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        //достанем нужный массив по todoListId:
        let todolistTasks = tasks[todoListId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id !== id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    const addTodolist = (newTitle: string) => {
        const newTodoListID:string = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: newTitle, filter: 'all'}
        // setTodolists([...todolists, newTodoList])
        // setTasks({...tasks, [newTodoListID]: []})
        const newState = [...todolists, newTodoList]
        setTodolists(newState)
        setTasks({...tasks, [newTodoListID]: []})
    }

    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodolist = t;
        if (f === 'active') {
            tasksForTodolist = t.filter(t => !t.isDone);
        }
        if (f === 'completed') {
            tasksForTodolist = t.filter(t => t.isDone);
        }
        return tasksForTodolist
    }
    const todoListComponents = todolists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item key={tl.id}>
                <Paper
                    variant={'outlined'}
                    // elevation={8}
                    style={{width: '310px', padding: '20px'}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        editTask={editTask}
                        editTodolist={editTodolist}
                    />
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

export default App;
