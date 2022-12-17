import {IconButton, TextField} from '@mui/material';
import React, {ChangeEvent, useState, KeyboardEvent, memo} from 'react';
import {AddCircleOutlineOutlined} from '@mui/icons-material';

type InputPropsType = {
    callback: (title: string) => void
}

export const Input: React.FC<InputPropsType> = memo((props) => {
    console.log('input')
        console.log('input')
        let [title, setTitle] = useState('')
        let [error, setError] = useState<boolean | null>(null )

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => error  ? setError(null) : e.key === 'Enter' && addTask()

        const addTask = () => {
            let newTitle = title.trim();
            if (newTitle !== '') {
                props.callback(newTitle)
            } else {
                setError(true)
            }
            setTitle('')
        }
        return (
            <div>
                <TextField
                    size={'small'}
                    variant={'outlined'}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    label={'Title'}
                    error={!!error}
                    helperText={error && 'Title is required'}
                />
                {/*<button onClick={addTask}>+</button>*/}
                <IconButton onClick={addTask} color={'primary'}><AddCircleOutlineOutlined/></IconButton>
                {/*  {error && <div className="error-message">{error}</div>}*/}
            </div>
        );
    })


export default Input;