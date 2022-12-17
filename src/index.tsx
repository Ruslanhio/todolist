import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import * as serviceWorker from './serviceWorker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {deepPurple, teal} from '@mui/material/colors';
import {CssBaseline} from '@mui/material';
import {AppWithRedux} from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './store/state';

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: deepPurple,
       mode: 'dark'

    }
})
ReactDOM.render(<Provider store = {store}> <ThemeProvider theme={theme}>
    <CssBaseline/>
    <AppWithRedux/>
</ThemeProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
