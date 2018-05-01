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
        background: #d3224f;
        color: #ffffff;
    }

    .edit-profile-avatar-wrapper {
        padding: 10px;
        height: 200px;
        width: 200px;
        background: #f4f6f7;
        border: 2px dashed #d6d3ce;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
    }

    .edit-avatar-no-avatar-icon {
    	width: 90px;
        border-radius: 5px;
    }

    .uploaded-avatar {
    	height: 100%;
    	width: auto;
    	margin-bottom: 0;
    	border-radius: 5px;
    }

    .Select-placeholder,
    .Select--single > .Select-control .Select-value {
        bottom: 0;
        font-size: 0.9em;
    	background-color: #f4f6f7;
        color: #aaaaaa;
        left: 0;
        line-height: 43.19px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        right: 0;
        top: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: context-menu;
    }

    .Select-control{
      background-color: #f4f6f7;
      color: #000;
      outline: none;
      height: 43.19px;
    }

    .Select-placeholder {
      	font-size: 0.9em;
      	color: #aaaaaa;
    }

    .country-selector .is-focused > .Select-control,
    .country-selector .is-focused:not(.is-open) > .Select-control {
    	border: 1px solid #ccc;
    }

    .Select-menu-outer {
    	position: absolute;
      	background-color: #fff;
      	border: none;
    	border-top: solid 1px #dddddd;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    	width: 200px;
    	box-shadow: 0 2px 10px rgba(0,0,0,0.42);
        cursor: pointer;
    }

    .Select-clear-zone:hover {
      color: #e73827;
    }

    .Select-option.is-selected {
      background-color: #4054b2;
      color: #fff;
    }

    .Select-option.is-focused {
      background-color: #aaaaaa;
      color: #fff;
    }

    .Select.has-value.Select--single > .Select-control .Select-value .Select-value-label,
    .Select.has-value.is-pseudo-focused.Select--single > .Select-control .Select-value .Select-value-label {
        color: #333;
    }

    .Select-arrow-zone {
        cursor: pointer;
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 25px;
        padding-right: 5px;
    }

    .Select-arrow {
        border-color: #999 transparent transparent;
        border-style: solid;
        border-width: 5px 5px 2.5px;
        display: inline-block;
        height: 0;
        width: 0;
        position: relative;
    }

    .Select-menu {
        width: 200px;
    }

    .Select-option {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;

        &:last-child {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
        }
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
