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
    red: '#d3224f',
    blue: '#4054b2',
    white: '#ffffff',
    lightGray: '#f0f0f0',
    gray: '#e0e1e0',
    darkGray: '#7F7F7F',
    black: '#252625',
    pitchBlack: '#171717',
    lightTextColor: 'rgba(0,0,0, 0.87)'
}

ReactDOM.render((
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
), document.getElementById('root'));
