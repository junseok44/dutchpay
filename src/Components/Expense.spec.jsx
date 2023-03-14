import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ExpenseTable from "./ExpenseTable";
import React from "react";
import { screen } from "@testing-library/dom";

const renderComponent = () => {
  render(
    <RecoilRoot initializeState={(snapShot) => snapShot}>
      <ExpenseTable></ExpenseTable>
    </RecoilRoot>
  );

  const expenseList = screen.getByTestId("expenseTable");
  return { expenseList };
};

describe("비용 리스트 로직", () => {
  const { expenseList } = renderComponent();
  test("잘 렌더링 되었는가??", () => {
    expect(expenseList).not.toBeNull();
  });

  test("비용 리스트가 잘 보이는가?", () => {});
});
