import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const CenteredOverlay = ({ children }: { children: JSX.Element }) => {
  return <OverlayContainer>{children}</OverlayContainer>;
};

const OverlayContainer = styled(Container)`
  background: #dfe6e9;
  padding: 20px;
  min-height: 20rem;
  border-radius: 15px;
`;

export default CenteredOverlay;
