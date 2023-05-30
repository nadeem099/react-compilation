import styled from "styled-components";

const StyledBaseButton = styled.button`
  border: none;
  padding: 5px 10px;
  background-color: #3431e0;
  color: #f8f6f6;
  border-radius: 4px;
  box-shadow: 0 0 2px blue;
`;

const BaseButton = ({ className, children, ...props }) => {
  // console.log(props);
  return <StyledBaseButton className={className}>{children}</StyledBaseButton>;
};

export default BaseButton;
