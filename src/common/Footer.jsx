import styled from 'styled-components';
import { LionsLogo, InstaLogo, GitLogo } from '@/assets/icons';

const Footer = () => {
  const handleLinkClick = url => {
    window.open(url, '_blank');
  };

  // 아이콘 및 링크
  const links = [
    { icon: <LionsLogo />, url: 'https://linktr.ee/likelion.ewha' },
    { icon: <InstaLogo />, url: 'https://www.instagram.com/likelion_ewha' },
    { icon: <GitLogo />, url: 'https://github.com/EWHA-LIKELION' }
  ];

  return (
    <FooterWrapper>
      <Title>
        멋쟁이사자처럼 12기 | Likelion Ewha - 12th
        <br />
        <span
          onClick={() => handleLinkClick('http://pf.kakao.com/_htxexfd')}
          style={{ cursor: 'pointer' }}
        >
          http://pf.kakao.com/_htxexfd
        </span>
      </Title>
      <Logos>
        {links.map(({ icon, url }, index) => (
          <Icon key={index} onClick={() => handleLinkClick(url)}>
            {icon}
          </Icon>
        ))}
      </Logos>
      <Copyright>
        Copyright ⓒ Likelion Ewha 12th. All Rights Reserved.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  height: 10rem;
  background: linear-gradient(180deg, #fff 0%, #6db291 127.94%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding-top: 1.3rem;
`;

const Title = styled.h3`
  ${({ theme }) => theme.fontStyles.medium_10pt};
  color: var(--green2-100);
  text-align: center;
`;

const Logos = styled.div`
  display: flex;
  gap: 1rem;
`;

const Icon = styled.div`
  cursor: pointer;
  display: flex;
`;

const Copyright = styled.p`
  ${({ theme }) => theme.fontStyles.light_10pt}
  color: var(--green2-100)
`;
