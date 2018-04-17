// Libs
import React                            from 'react';
import ReactDOM                         from 'react-dom';
import App                              from './components/App.jsx';
import { ThemeProvider }  from 'styled-components';

// Styles
import './global-styles.js';

/**
 * RenderDOM connects the root JSX logic (App.jsx) to the root HTML id, and
 * imports render
 * @param  {[JSX File]} <App/> Root of the application
 */

const theme = {
    lightRed: '#ea5fa2',
    red: '#d3224f',
    darkRed: '#7f1631',
    lightPurple: '#935999',
    purple: '#65266d',
    darkPurple: '#3d1143',
    lightBlue: '#dff2fc',
    blue: '#b5d2ec',
    darkBlue: '#7192a4',
    lightGreen: '#aadcd6',
    green: '#69c4a8',
    darkGreen: '#33725b',
    lightYellow: '#fff7d3',
    yellow: '#f1ddac',
    darkYellow: '#9f8d65',
    white: '#ffffff',
    lightGray: '#f0f0f0',
    gray: '#e0e1e0',
    darkGray: '#7F7F7F',
    black: '#252625',
    pitchBlack: '#171717',
    creamTextColor: '#5f3e24',
    cream: '#f9f3e9',
    lightTextColor: 'rgba(0,0,0, 0.87)',
    darkTextColor: '#bebebe'
}

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
), document.getElementById('root'));
