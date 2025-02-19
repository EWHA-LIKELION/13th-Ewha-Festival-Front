import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --gray1: #F2F2F2;
  --gray2: #CDCDCD;
  --gray3: #787878;
  --green1-10: #E8F8F2;
  --green1-50: #8BDDBC;
  --green1-100: #18BB7A;
  --green2-60: rgba(0, 124, 74, 0.60);
  --green2-100: #007C4A;
  --red-20: #FFE0DF;
  --red-100: #FF635E;
}

body {
  height: 100dvh; 
  max-width: 440px; 
  margin: 0 auto; 

  scrollbar-width: none;  
  -ms-overflow-style: none;
}

body::-webkit-scrollbar {
  display: none; 
}

a {
  text-decoration: none;
  color: inherit;
}

ol, ul{
  list-style: none;
}

button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

`;

export default GlobalStyle;
