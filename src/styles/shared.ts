import {setBaseStyles} from 'lit-with-styles';
import globals from './stylesheets/globals.css?inline';
import sharedStyles from './stylesheets/shared.css?inline';

// console.log(sharedStyles);

setBaseStyles(sharedStyles);

const fontsStyleSheet = new CSSStyleSheet();
fontsStyleSheet.replaceSync(globals);
document.adoptedStyleSheets.push(fontsStyleSheet);
