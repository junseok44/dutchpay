import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDate } from "util/types";
import { ExpenseListAtom } from "../state/expenseList";
import { groupMemberAtom } from "../state/groupMembers";

const Add_Expense = () => {
  const addExpenseListItem = useSetRecoilState(ExpenseListAtom);
  const groupMembers = useRecoilValue(groupMemberAtom);

  const today = new Date();
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    [today.getFullYear(), today.getMonth() + 1, today.getDay()].join("-")
  );
  const [expense, setExpense] = useState(0);

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isExpenseValid, setIsExpenseValid] = useState(false);

  const [validate, setValidate] = useState(false);

  useEffect(() => {
    setValidate(false);
    setIsUsernameValid(username != "");
    setIsExpenseValid(expense > 0);
    setIsDateValid(date != null);
  }, [username, expense, date]);

  const checkValidity = () => {
    return isExpenseValid && isDateValid && isUsernameValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkValidity()) {
      // 리스트에 추가.
      addExpenseListItem((list) => [
        ...list,
        {
          user: username,
          expense,
          description,
          date,
        },
      ]);
      setUsername("");
      setDescription("");
      setExpense(0);
    } else {
      console.log("not valid");
    }
    setValidate(true);
  };

  return (
    <StyledWrapper>
      <h3>add expense</h3>
      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
                isInvalid={!isDateValid && validate}
              />
              <Form.Control.Feedback type="invalid">
                아니 날짜 입력하시라고
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="비용에 대한 설명"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Select
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                isInvalid={!isUsernameValid && validate}
              >
                <option selected disabled value="">
                  누가 결제했나요?
                </option>
                {groupMembers.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                아니 누가 계산했냐고요
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              {/* <Form.Label>얼마나</Form.Label> */}
              <Form.Control
                type="number"
                placeholder="얼마나 결제"
                value={expense}
                onChange={({ target }) => setExpense(parseInt(target.value))}
                isInvalid={!isExpenseValid && validate}
              />
              <Form.Control.Feedback type="invalid">
                아니 얼마 결제하셨나고요
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="d-grid gap-2">
              <Button type="submit" size="lg">
                add
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </StyledWrapper>
  );
};

export const StyledWrapper = styled.div`
  padding: 2rem;
`;

export default Add_Expense;
