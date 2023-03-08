import React, { useCallback, useState } from "react";
import { Form } from "react-router-dom";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { StyledErrorMessage, StyledRow } from "./Create_Group";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useRecoilState } from "recoil";
import { groupMemberAtom } from "../state/groupMembers";

const Add_Memers = () => {
  const [validated, setValidated] = useState(false);
  const [groupMembers, setGroupMembers] = useRecoilState(groupMemberAtom);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
    setValidated(true);
  }, []);

  return (
    <div>
      <CenteredOverlayForm
        handleSubmit={handleSubmit}
        title="멤버를 추가해보세요"
        validated={validated}
      >
        <StyledRow>
          <div>
            <InputTags
              placeholder="이름 입력후 tab키로 멤버 추가"
              values={groupMembers}
              onTags={(value) => setGroupMembers(value.values)}
            ></InputTags>
            {validated && groupMembers.length == 0 && (
              <StyledErrorMessage>
                아니 멤버를 추가하셔야 한다니까요?
              </StyledErrorMessage>
            )}
          </div>
        </StyledRow>
      </CenteredOverlayForm>
    </div>
  );
};

export default Add_Memers;
