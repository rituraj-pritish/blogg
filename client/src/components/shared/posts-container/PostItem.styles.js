import styled from 'styled-components';
import sizes from 'src/sizes';

export const StyledPostItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr repeat(3, 1fr);
  grid-template-rows: 1fr 1.5fr 0.5fr;
  grid-gap: 10px;
  padding: 1rem 1rem 1rem 0;
  transition: 0.2s;
  background: #fff;
  min-height: 220px;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 0 10px 10px #00000033;
  }

  &:hover > p {
    transition: 0.2s;
  }

  & > div > p:first-child:hover,
  p:last-child span:hover {
    transition: 0.2s;
    color: ${({ theme }) => theme.colors.primary};
  }

  .post-item-bg {
    grid-row: 1/4;
  }

  .post-item-title {
    grid-row: 1;
    grid-column: 2/5;
  }

  .post-item-content {
    grid-row: 2;
    grid-column: 2/5;
  }

  .post-item-details {
    grid-row: 3;
    grid-column: 2/5;
  }

  @media ${sizes.md1} {
    grid-template-columns: 1fr;
    grid-template-rows: 4fr 1fr 1fr 0.5fr;
    padding: 1rem;

    .post-item-bg {
      grid-row: unset;
      margin-bottom: 2rem;
    }

    .post-item-title {
      grid-row: unset;
      grid-column: unset;
    }

    .post-item-content {
      grid-row: unset;
      grid-column: unset;
    }

    .post-item-details {
      grid-row: unset;
      grid-column: unset;
    }
  }
`;

export const Divider = styled.div`
  height: 2px;
  background: grey;
  width: 100%;
`;

export const StyledLikes = styled.div`
  background: #ffffffba;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  position: absolute;
  right: -8px;
  bottom: -8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`