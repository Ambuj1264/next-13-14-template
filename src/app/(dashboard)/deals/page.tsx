"use client";
import DealList, {
  convertArrayToKanbanBoards,
} from "@/components/deals/DealList";
import { GroupBadge } from "@/components/ui/avatar/Avatar";
import Modal from "@/components/ui/modal/Modal";
import { useQueryContext } from "@/context/query/queryContext";
import LinkedinImport from "@/layouts/dealimport/linkedinImport/LinkedinImport";
import ManuallyImport from "@/layouts/dealimport/manuall/ManuallyImport";
import { GET_BOARD_DATA_BY_ID } from "@/lib/graphql/queries/getBoardDataByID";
import {
  typographyCaptionSmall,
  typographyH2,
  typographyParagraph,
} from "@/styles/typography";
import { blackColor, darkblueColor, guttersPx } from "@/styles/variables";
import { checkEmptydataArray } from "@/utils/helperUtils";
import { useLazyQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

interface User {
  id: string;
  content: string;
}
interface Data {
  name: string;
  title: string;
  price: string;
  profiles: any[];
  item: User[];
}

export interface AllData {
  leads: Data;
  contactmade: Data;
  demoscheduled: Data;
  proposalmade: Data;
  negotiationsstarted: Data;
}

const Users = styled.div`
  display: flex;
  justify-content: start;
  padding-bottom: ${guttersPx.medium};
  & div {
    margin: 0;
  }
`;

const Title = styled.h2(
  [typographyH2],
  `
  color:${darkblueColor};
  text-align:center;
  margin-bottom:7px;
`,
);
const SubTitle = styled.p(
  [typographyParagraph],
  `
color:${blackColor};
text-align:center

`,
);
const Content = styled.div`
  padding: 30px 40px;
`;
const ImportWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px;
  padding: 60px 30px 30px 30px;
`;
const BottomContent = styled.p(
  [typographyCaptionSmall],
  `
  color:${blackColor};
  text-align:center
`,
);

const Page = () => {
  const [welcome, setWelcome] = useState(false);
  const {
    data: kanbanBoardvalue,
    teammembers,
    listData,
    setDealListData,
  } = useQueryContext();
  const handleWelcomPopup = () => {
    setWelcome(true);
  };

  let isEmptyDeal = checkEmptydataArray(kanbanBoardvalue?.kanbanBoard || []);
  console.log(kanbanBoardvalue, isEmptyDeal);
  useEffect(() => {
    if (kanbanBoardvalue?.kanbanBoard && isEmptyDeal) {
      handleWelcomPopup();
    } else {
      setWelcome(false);
    }
  }, [kanbanBoardvalue, isEmptyDeal]);
  const { values, handleChange }: any = useFormik({
    initialValues: {
      teammembers: [],
    },
    onSubmit: () => {
      console.log("test");
    },
  });

  const [handlelistDatabyID] = useLazyQuery(GET_BOARD_DATA_BY_ID, {
    fetchPolicy: "no-cache",
  });
  const getDataByID = async (teammembersID: never[]) => {
    const { data: databyID } = await handlelistDatabyID({
      variables: { memberIds: teammembersID },
    });
    const list = convertArrayToKanbanBoards(
      databyID?.getKanbanBoardByMemberID || [],
    );
    setDealListData(list);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (values.teammembers?.length !== 0) {
        await getDataByID(values.teammembers);
      } else {
        await listData();
      }
    };
    fetchData();
  }, [values.teammembers?.length]);

  return (
    <>
      <Users>
        <GroupBadge
          handleCheked={handleChange}
          name="teammembers"
          selectable
          data={teammembers?.getTeamMembersByCompanyId || []}
          dimension="22"
        />
      </Users>
      <DealList />
      <Modal
        open={welcome}
        width="711px"
        closeModal={handleWelcomPopup}
        maxWidth="md"
      >
        <Content>
          <Title>Welcome</Title>
          <SubTitle>Thank you for being part of socialmotion</SubTitle>
          <ImportWrapper>
            <LinkedinImport />
            <ManuallyImport />
          </ImportWrapper>
          <BottomContent>
            If you need it, contact us at wamarir@insurgente.es
          </BottomContent>
        </Content>
      </Modal>
    </>
  );
};

export default Page;
