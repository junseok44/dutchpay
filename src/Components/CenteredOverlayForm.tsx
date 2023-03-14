import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import CenteredOverlay from "./CenteredOverlay";
import styled from "styled-components";
import { StyledRow } from "./Create_Group";
import { Link } from "react-router-dom";

const CenteredOverlayForm = ({
  title,
  children,
  validated,
  handleSubmit,
  to,
}: {
  children: JSX.Element;
  title: string;
  validated: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  to: string;
}) => {
  return (
    <CenteredFormContainer>
      <h1>dutchpay</h1>
      <CenteredOverlay>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow className="justify-content-md-center">
            <h2>{title}</h2>
          </StyledRow>
          {children}
          <StyledRow>
            <div>
              <StyledSubmitButton variant="primary" type="submit">
                저장
              </StyledSubmitButton>
            </div>
          </StyledRow>
        </Form>
      </CenteredOverlay>
    </CenteredFormContainer>
  );
};

const CenteredFormContainer = styled(Container)`
  width: 40vw;
  margin: 0 auto;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSubmitButton = styled(Button).attrs({
  type: "submit",
})`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  background-color: #6610f2;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;

export default CenteredOverlayForm;
