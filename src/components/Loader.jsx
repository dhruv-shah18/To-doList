import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height to center vertically as well */

  .loader {
    display: block;
    --height-of-loader: 6px;
    --loader-color: #080808ff;
    width: 200px; /* Increased width */
    height: var(--height-of-loader);
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .loader::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: moving 1s ease-in-out infinite;
  }

  @keyframes moving {
    50% {
      width: 100%;
    }
    100% {
      width: 0;
      right: 0;
      left: unset;
    }
  }
`;

export default Loader;
