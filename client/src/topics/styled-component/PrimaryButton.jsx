import styled from "styled-components";
import BaseButton from "./BaseButton";

export const StyledPrimaryButton = styled(BaseButton)`
  background-color: #db0d30;
`;

export const PrimaryButton = ({ className, children, ...props }) => {
  console.log(props);
  return (
    <StyledPrimaryButton className={className}>{children}</StyledPrimaryButton>
  );
};
