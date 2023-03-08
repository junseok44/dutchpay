import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { render, screen } from "@testing-library/react";
import Create_Group from "./Create_Group";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <Create_Group></Create_Group>
    </RecoilRoot>
  );

  const input = screen.getByPlaceholderText("멤버를 입력해주세요");
  const saveBtn = screen.getByText("저장");
  const errorMessage = screen.getByText("그룹 이름을 입력해주세요");

  return {
    input,
    saveBtn,
    errorMessage,
  };
};

describe("멤버 추가 페이지", () => {
  test("모든 것이 잘 렌더링 되었는가", () => {
    const { input, saveBtn, errorMessage } = renderComponent();

    expect(input).not.toBeNull();
    expect(saveBtn).not.toBeNull();
    expect(errorMessage).toBeNull();
  });

  test("멤버 안추가하고 엔터 누를 시 어캐되는가", () => {
    const { input, saveBtn, errorMessage } = renderComponent();

    userEvent.click(saveBtn);
    expect(errorMessage).toBeInTheDocument();
  });

  test("멤버 추가하고 확인 버튼 누를시 저장이 잘 되는가.", () => {
    const { input, saveBtn, errorMessage } = renderComponent();

    userEvent.type(input, "철수 영희 영수");
    userEvent.click(saveBtn);

    expect(errorMessage).toBeNull();
  });
});
