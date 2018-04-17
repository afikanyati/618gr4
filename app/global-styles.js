import { injectGlobal }         from 'styled-components';

// Avenir
import avenirBlack              from './assets/fonts/avenir/Avenir-Black.ttf';
import avenirHeavy              from './assets/fonts/avenir/Avenir-Heavy.ttf';
import avenirMedium             from './assets/fonts/avenir/Avenir-Medium.ttf';
import avenirRoman              from './assets/fonts/avenir/Avenir-Roman.ttf';
import avenirBook               from './assets/fonts/avenir/Avenir-Book.ttf';
import avenirLight              from './assets/fonts/avenir/Avenir-Light.ttf';
import avenirItalicBlack        from './assets/fonts/avenir/Avenir-BlackOblique.ttf';
import avenirItalicHeavy        from './assets/fonts/avenir/Avenir-HeavyOblique.ttf';
import avenirItalicMedium       from './assets/fonts/avenir/Avenir-MediumOblique.ttf';
import avenirItalic             from './assets/fonts/avenir/avenir-Oblique.ttf';
import avenirItalicBook         from './assets/fonts/avenir/Avenir-BookOblique.ttf';
import avenirItalicLight        from './assets/fonts/avenir/Avenir-LightOblique.ttf';


injectGlobal`
    :root {

    }

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Avenir', 'Gill Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 16px;
        margin: 0;
        overflow: hidden;
    }

    a, a:visited, a:hover {
    	text-decoration: none;
    }

    textarea, input {
      transition: border .5s ease-in-out;
    }

    textarea:focus, input:focus {
    	border-color: none;
    }

    textarea:focus, input:focus, button:focus, button {
        outline: blue;
    }

    button {
    	border: none;
    }

    .event-item {
        display: flex !important;
        justify-content: center;
        align-items: center;
        background: #935999;
        color: #ffffff;
    }

    /* Avenir */
    @font-face {
    font-family: 'Avenir';
    src: url(${avenirBlack}) format('truetype');
    font-weight: 900;
    }

    @font-face {
    font-family: 'Avenir';
    src: url(${avenirHeavy}) format('truetype');
    font-weight: 700;
    }

    @font-face {
    font-family: 'Avenir';
    src: url(${avenirMedium}) format('truetype');
    font-weight: 500;
    }

    @font-face {
    font-family: 'Avenir';
    src: url(${avenirRoman}) format('truetype');
    font-weight: 400;
    }

    @font-face {
    font-family: 'Avenir';
    src: url(${avenirBook}) format('truetype');
    font-weight: 300;
    }

    @font-face {
    font-family: 'Avenir';
    src: url(${avenirLight}) format('truetype');
    font-weight: 200;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalicBlack}) format('truetype');
    font-weight: 900;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalicHeavy}) format('truetype');
    font-weight: 700;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalicMedium}) format('truetype');
    font-weight: 500;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalic}) format('truetype');
    font-weight: 400;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalicBook}) format('truetype');
    font-weight: 300;
    }

    @font-face {
    font-family: 'AvenirItalic';
    src: url(${avenirItalicLight}) format('truetype');
    font-weight: 200;
    }
`
