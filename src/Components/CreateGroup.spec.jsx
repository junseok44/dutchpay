import { render, screen } from "@testing-library/react";
import Create_Group from "./Create_Group";
import userEvent from "@testing-library/user-event";
import { RecoilRoot } from "recoil";
import React from "react";

const renderComponent = () => {
  render(
    <RecoilRoot>
      <Create_Group></Create_Group>
    </RecoilRoot>
  );

  const input = screen.getByPlaceholderText("2022 제주도 여행");
  const saveBtn = screen.getByText("저장");
  const errorMessage = screen.getByText("그룹 이름을 입력해주세요");

  return {
    input,
    saveBtn,
    errorMessage,
  };
};

describe("그룹 생성 페이지", () => {
  test("그룹 이름 입력 컴포넌트 렌더링", async () => {
    const { input, saveBtn, errorMessage } = renderComponent();
    expect(input).not.toBeNull();
    expect(saveBtn).not.toBeNull();
    // userEvent.click(saveBtn);

    // expect(errorMessage).not.toBeNull();
  });

  test("그룹 입력 입력하지 않고 '저장'버튼 클릭시 에러 메시지를 노출", async () => {
    const { saveBtn, errorMessage } = renderComponent();

    userEvent.click(saveBtn);
    expect(errorMessage).not.toBeNull();
  });

  test("그룹 이름 입력후 저장버튼시, 저장 성공", async () => {
    const { input, saveBtn, errorMessage } = renderComponent();

    userEvent.type(input, "일본 여행 가즈아");
    userEvent.click(saveBtn);

    expect(errorMessage).not.toBeNull();
  });
});

// 지금이라는것에 만족하고.
// 지금과 싸우고. 투쟁하고. 바꿔나가지 않고
// 어떻게든 만들어진 우상에 기대고
// 헛된 희망을 걸고. 그건 정말 달콤하면서도.
// 마약과도 같다. 삶을 안에서부터 허문다.
