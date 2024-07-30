"use client";
import CalendarPage from "@/components/schedulePost/ScheduleCalender";
import { GroupBadge } from "@/components/ui/avatar/Avatar";
import Dropdown from "@/components/ui/input/DropDown";
import AddMemberSocial from "@/components/ui/modal/schedulePost/addmember/AddMemberSocial";
import CreateTeam from "@/components/ui/modal/schedulePost/CreateTeam";
import TeamsAccount from "@/components/ui/modal/schedulePost/TeamsAccount";
import { useQueryContext } from "@/context/query/queryContext";
import ScheduledContextProvider from "@/context/schedule/ScheduledContextProvider";
import { darkblueColor, fontFamily } from "@/styles/variables";
import { AddIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";

const Page = () => {
  const { accountActionType, teammembers, handleAccountActionType } =
    useQueryContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    handleAccountActionType("");
  };

  const handleItemClick = (item: string) => {
    setIsOpen(true);
    handleAccountActionType(item);
  };

  console.log(accountActionType, "assignment");

  const getModal = useMemo(() => {
    if (accountActionType === "Add member") {
      return <AddMemberSocial open={isOpen} onclose={handleClose} />;
    } else if (accountActionType === "Create a new team") {
      return <CreateTeam open={isOpen} onclose={handleClose} />;
    } else {
      return <TeamsAccount open={isOpen} onclose={handleClose} />;
    }
  }, [accountActionType, isOpen]);

  return (
    <ScheduledContextProvider>
      <MainContainer>
        <BudgeWrapper>
          <IconWrapper>
            <Dropdown items={options} onItemClick={handleItemClick}>
              <AddIcon width={"41"} height={"41"} />
            </Dropdown>
          </IconWrapper>
          <GroupBadge
            data={teammembers?.getTeamMembersByCompanyId || []}
            dimension={"43"}
            imgDimension={43}
          />
        </BudgeWrapper>
        <CalendarPage />
      </MainContainer>
      {getModal}
    </ScheduledContextProvider>
  );
};

export default Page;

const MainContainer = styled.div`
  font-family: ${fontFamily};
`;
const BudgeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  & :nth-child(1) {
    margin: 0;
  }
`;
const IconWrapper = styled.div`
  border-radius: 100px;
  border: 1px solid ${darkblueColor};
  width: 43px;
  height: 43px;
`;

const options = [
  {
    id: 1,
    name: "Add member",
    value: "Add member",
  },
  {
    id: 2,
    name: "Create a new team",
    value: "Create a new team",
  },
  {
    id: 3,
    name: "Team Acounds",
    value: "Team Acounds",
  },
];
