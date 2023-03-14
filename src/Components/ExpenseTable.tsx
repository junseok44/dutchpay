import React from "react";
import { Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { ExpenseListAtom } from "../state/expenseList";
import CenteredOverlay from "./CenteredOverlay";

const ExpenseTable = () => {
  const expenseList = useRecoilValue(ExpenseListAtom);
  return (
    <>
      <CenteredOverlay>
        <Table striped data-testid="expenseTable">
          <thead>
            <tr>
              <th>날짜</th>
              <th>설명</th>
              <th>결제자</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            {expenseList.map((item) => (
              <tr>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td>{item.user}</td>
                <td>{item.expense}원</td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </Table>
      </CenteredOverlay>
    </>
  );
};

export default ExpenseTable;
