import styled from 'styled-components';

const Tab = ({ tabs, activeTab, setActiveTab, tabWidth = '4.25rem' }) => {
  return (
    <TabContainer>
      <TabsWrapper>
        {tabs.map(tab => (
          <TabItem
            key={tab}
            onClick={() => setActiveTab(tab)}
            $isActive={activeTab === tab}
            $width={tabWidth}
          >
            {tab}
          </TabItem>
        ))}
        <Indicator $activeIndex={tabs.indexOf(activeTab)} $width={tabWidth} />
      </TabsWrapper>
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.div`
  border-bottom: 0.2rem solid var(--gray1);
`;

const TabsWrapper = styled.div`
  display: flex;
  position: relative;
`;

const TabItem = styled.div`
  ${({ theme, $isActive }) =>
    $isActive ? theme.fontStyles.semibold_16pt : theme.fontStyles.regular_16pt};
  color: ${({ $isActive }) =>
    $isActive ? 'var(--green1-100)' : 'var(--gray3)'};
  padding: 0.63rem 1.25rem 0.5rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  width: ${({ $width }) => $width};
  z-index: 1;
`;

const Indicator = styled.div`
  position: absolute;
  height: 0.2rem;
  width: ${({ $width }) => $width};
  background-color: var(--green1-100);
  bottom: -0.2rem;
  transition: transform 0.3s ease;
  z-index: 2;
  transform: translateX(
    ${({ $activeIndex }) => `calc(${$activeIndex} * 100%)`}
  );
`;
