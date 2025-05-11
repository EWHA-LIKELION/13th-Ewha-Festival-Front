# 🎡 2025 이화여대 대동제 : 부스 통합 안내 서비스 🎡

#### 💚 [사이트 바로가기](https://www.ewhafesta.co.kr/) 💚 <br>

해방이화 139주년 대동제 <2025 Liberte : Dreamin'>를 맞아 이화여대 멋쟁이사자처럼 13기와 (준)축제준비위원회가 협업하여 **대동제 부스 통합 안내 웹사이트**를 제작하였습니다.
<br/>
<br>

## 🎉 기능

**Liberte 홈페이지**가 제공하는 기능은 다음과 같습니다.

1. 모든 부스 및 공연을 카테고리, 위치, 요일 별로 조회
2. 부스 및 공연 이름, 메뉴 검색
3. 각 부스 및 공연의 운영일 및 시간, 상세 위치, 연락처, 실시간 공지사항, 메뉴 정보 및 솔드아웃 여부, 영업 중/영업 종료 상태 등의 정보 제공
4. 관심 부스 스크랩
5. 익명 방명록을 통해 부스 이용 경험 공유
6. 대동제 내 주요 시설 위치, 배리어프리 관련 정보 제공
7. (준)축제준비위원회 공지사항, 대동제 주요 행사 일정 소개
8. 마이페이지
9. 부스 및 공연 관리자 전용 기능 등

<br>

## 🎉 프론트엔드 팀원 소개

<table align="center">
    <tr align="center">
        <td style="min-width: 150px;">
            <a href="https://github.com/s-uxun">
              <img src="https://avatars.githubusercontent.com/s-uxun" width="150" height="150" style="object-fit :cover">
            </a>
        </td>
        <td style="min-width: 150px;">
            <a href="https://github.com/3olly">
              <img src="https://avatars.githubusercontent.com/3olly" width="150" height="150" style="object-fit :cover">
            </a>
        </td>
      <td style="min-width: 150px;">
            <a href="https://github.com/yeeeww">
              <img src="https://avatars.githubusercontent.com/yeeeww" width="150" height="150" style="object-fit :cover">
            </a>
        </td>
    </tr>
    <tr align="center">
        <td>
            송유선<br/>
      </td>
        <td>
            김채연<br />
        </td>
       <td>
            김예원<br />
        </td>
    </tr>
     <tr align="center">
        <td>
            프로젝트 세팅 <br />
            로그인 및 유저 인증 | 배포 <br />
            전체 부스 및 공연 목록 | 검색 <br />
            메인 페이지 및 팝업 | 사이드바 <br />
            스크랩북 | 축제일정 | 만든이들 <br />
        </td>
        <td>
            마이페이지 <br />
            공지사항 페이지 <br />
            부스 상세 페이지 <br />
            공연 상세 페이지 <br />
            주요 시설 페이지 <br />
        </td>
        <td>
            부스 수정 페이지 <br />
            공연 수정 페이지 <br />
            관리자 코드 페이지 <br />
            부스 공지 및 메뉴 추가 페이지 <br />
        </td>
    </tr>
</table>
<br/>

## 🎉 프로젝트 시작

```
git clone https://github.com/EWHA-LIKELION/13th-Ewha-Festival-Front.git
npm install
npm start
```

<br/>

## 🎉 기술 스택

- Frontend : <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-3578E5?style=flat-square&logo=zustand&logoColor=white"> <img src="https://img.shields.io/badge/styled_components-DB7093?style=flat-square&logo=styled-components&logoColor=white">
- Package Manager : <img src="https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white">
- Code Formmater : <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=React&logoColor=white">
- ETC :
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Google Analytics-F7B93E?style=flat-square&logo=Google&logoColor=white">
  </br>

## 🎉 라이브러리

```
"dependencies": {
  "@tanstack/react-query": "^5.75.5",
  "axios": "^1.9.0",
  "cra-template": "1.2.0",
  "js-cookie": "^3.0.5",
  "lottie-react": "^2.4.1",
  "normalize.css": "^8.0.1",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.5.3",
  "react-scripts": "5.0.1",
  "styled-components": "^6.1.18",
  "web-vitals": "^4.2.4",
  "zustand": "^5.0.3"
  },

"devDependencies": {
  "@eslint/js": "^9.20.0",
  "@svgr/webpack": "^8.1.0",
  "eslint": "^8.57.1",
  "eslint-config-prettier": "^10.0.1",
  "eslint-plugin-react": "^7.37.4",
  "eslint-plugin-simple-import-sort": "^12.1.1",
  "globals": "^15.15.0",
  "prettier": "^3.5.1",
  "react-app-rewired": "^2.2.1"
  }
```
