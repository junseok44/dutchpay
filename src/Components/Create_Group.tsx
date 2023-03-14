import React, { useCallback, useState } from "react";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import { redirect, useNavigate } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ROUTES } from "../routes";
import { GroupNameAtom } from "../state/groupName";
import CenteredOverlay from "./CenteredOverlay";
import CenteredOverlayForm from "./CenteredOverlayForm";

const Create_Group = () => {
  const [groupName, setGroupName] = useRecoilState<string>(GroupNameAtom);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setGroupName(e.target.value);
    },
    [setGroupName]
  );

  const handleSubmit = (event: any) => {
    const form = event.target;
    event.preventDefault();
    if (groupName) {
      console.log("hello");
      navigate(ROUTES.ADD_MEMBERS);
    }

    setValidated(true);
  };

  return (
    <>
      <CenteredOverlayForm
        title="그룹 이름을 입력해보세요"
        validated={validated}
        handleSubmit={handleSubmit}
        to="/members"
      >
        <StyledRow>
          <Form.Group controlId="validationGroupName">
            <Form.Control
              type="text"
              required
              placeholder="2022 제주도 여행"
              onChange={onChange}
              value={groupName}
            ></Form.Control>
            <Form.Control.Feedback type="invalid" data-valid={validated}>
              그룹 이름을 입력해주세요
            </Form.Control.Feedback>
          </Form.Group>
        </StyledRow>
      </CenteredOverlayForm>
    </>
  );
};

export const StyledRow = styled(Row)`
  min-height: 5rem;
`;

export const StyledErrorMessage = styled.span`
  color: red;
`;

export default Create_Group;
