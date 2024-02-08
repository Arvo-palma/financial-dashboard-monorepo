import styled from 'styled-components';

export const StyledSideBar = styled.aside`
  display: flex;
  margin: 0;
  flex-direction: row;
  width: 100vw;
  height: 1.25rem;

  @media (min-width: 820px) {
    flex-direction: column;
    width: fit-content;
    height: 100vh;
    padding: 10px 5px;
  }

  padding: 20px 15px 10px 15px;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  background-color: transparent;
  border-color: #f3f1f3;
`;

export const StyledSidebarButton = styled.button`
  padding: 1rem 0.5rem;
  align-content: center;
  border-width: 0;
  background-color: transparent;
  cursor: pointer;
  width: 50px;
`;
