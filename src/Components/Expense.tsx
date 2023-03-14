import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Add_Expense from "./Add_Expense";
import ExpenseResult from "./ExpenseResult";
import ExpenseTable from "./ExpenseTable";

const Expense = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={4} lg={4}>
          <Row>
            <Add_Expense></Add_Expense>
          </Row>
          <Row>
            <ExpenseResult></ExpenseResult>
          </Row>
        </Col>
        <Col md={8} lg={8}>
          <StyledContainer>
            <Row>
              <h2>리스트</h2>
            </Row>
            <Row>
              <ExpenseTable></ExpenseTable>
            </Row>
          </StyledContainer>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <div>
    //   </div>
    //   <div>
    //   </div>
    // </div>
  );
};

const StyledContainer = styled(Container)`
  padding: 100px 31px 100px 31px;
`;
export default Expense;
