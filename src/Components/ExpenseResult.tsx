import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { memberAccountAtom, totalExpenseAtom } from "../state/expenseList";
import { groupMemberAtom } from "../state/groupMembers";
import { StyledWrapper } from "./Add_Expense";
import CenteredOverlay from "./CenteredOverlay";
import { produce } from "immer";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { CloudArrowDown } from "react-bootstrap-icons";
import * as htmlToImage from "html-to-image";

const ExpenseResult = () => {
  const totalExpense = useRecoilValue(totalExpenseAtom);
  const groupMemberArr = useRecoilValue(groupMemberAtom);
  const memberAccountObj = useRecoilValue(memberAccountAtom);
  const [transAction, setTransAction] = useState<
    { sender: string; receiver: string; expense: number }[]
  >([]);
  const [isTransActionMode, setIsTransActionMode] = useState(false);

  const expense123 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const result = calculateTransaction();
    setTransAction(result);
  }, [groupMemberArr, memberAccountObj]);

  const calculateTransaction = () => {
    let transaction: { sender: string; receiver: string; expense: number }[] =
      [];

    produce(memberAccountObj, (draft) => {
      groupMemberArr.forEach((currentMember) => {
        const otherMemberArr = groupMemberArr.filter(
          (member) => member != currentMember
        );
        otherMemberArr.forEach((other) => {
          const expense = draft[currentMember][other];
          if (expense == 0) return;
          transaction.push({
            receiver: expense > 0 ? currentMember : other,
            sender: expense > 0 ? other : currentMember,
            expense: Math.abs(Math.floor(expense)),

            // expense: Math.abs(Math.floor(expense - (expense % 10))),
          });
          draft[currentMember][other] = 0;
          draft[other][currentMember] = 0;
        });
      });

      return draft;
    });

    return transaction;
  };

  const handleDownload = async () => {
    if (expense123.current) {
      const dataUrl = await htmlToImage.toJpeg(expense123.current, {
        cacheBust: true,
      });
      const linkNode = document.createElement("a");
      linkNode.download = "myResult.jpeg";
      linkNode.href = dataUrl;
      linkNode.click();
    }
  };

  return (
    <StyledWrapper ref={expense123}>
      <CenteredOverlay>
        <div style={{ position: "relative" }}>
          <StyledH2>정산은 이렇게</StyledH2>
          <StyledDownloadBtn onClick={handleDownload}></StyledDownloadBtn>
          <span>
            총 {groupMemberArr.length}명 - {totalExpense}원 지출
            {totalExpense != 0 && (
              <div>
                한사람당 {Math.floor(totalExpense / groupMemberArr.length)} 원
              </div>
            )}
          </span>
          {isTransActionMode ? (
            <div>
              {transAction.map((item) => (
                <li>
                  {item.sender}은 {item.receiver}에게 {item.expense}원 줘야됨
                </li>
              ))}
            </div>
          ) : (
            <div>
              {groupMemberArr.map((currentMember) => {
                const otherMemberArr = groupMemberArr.filter(
                  (member) => member != currentMember
                );
                return (
                  <div>
                    {currentMember}이는
                    <ul>
                      {otherMemberArr.map((otherMember) => (
                        <div>
                          {memberAccountObj[currentMember][otherMember] != 0 ? (
                            <div>
                              {otherMember}에게
                              {Math.abs(
                                Math.floor(
                                  memberAccountObj[currentMember][otherMember]
                                )
                              )}
                              원
                              {memberAccountObj[currentMember][otherMember] > 0
                                ? "받아야 됨"
                                : "줘야 됨"}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          <Button onClick={() => setIsTransActionMode(false)}>
            각자 계산할 것 보기
          </Button>
          <Button onClick={() => setIsTransActionMode(true)}>
            거래별로 보기
          </Button>
        </div>
      </CenteredOverlay>
    </StyledWrapper>
  );
};

export default ExpenseResult;

export const StyledH2 = styled.h2`
  text-align: center;
`;

const StyledDownloadBtn = styled(CloudArrowDown)`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5rem;
  cursor: pointer;
`;
