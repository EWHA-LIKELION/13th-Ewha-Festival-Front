import { createGlobalStyle } from 'styled-components';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

div, span, h1, h2, h3, h4, h5, h6, p, a, dl, dt, dd, ol, ul, li, form, label, table{
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
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

// 최종 개발 이후 bg 설정 삭제 예정
html {
  background-color: var(--gray1);
}

body {
  font-family: 'Pretendard', sans-serif;
  background-color: white;
  position: relative;
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

@font-face {
    font-family: 'Pretendard';
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/Pretendard-Light.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/Pretendard-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/Pretendard-SemiBold.woff2') format('woff2');
  }

`;

export default GlobalStyle;
