import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onClickHandler = () => {
        setEdit(!edit)
        props.callback(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ? <TextField
               variant={'standard'} value={newTitle} autoFocus onBlur={onClickHandler} onChange={onChangeHandler}
            /> :
            <span onDoubleClick={onClickHandler}>{props.title}</span>
    );
};

