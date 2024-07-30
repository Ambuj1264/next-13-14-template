import React, { useEffect, useState } from "react";
import {
  blackColor,
  borderRadiusSmall,
  darkCharcoalColor,
  fontWeightNormal,
  greyColor,
  guttersPx,
  whiteColor,
} from "@/styles/variables";
import styled from "@emotion/styled";
import Dealdetails from "@/layouts/deals/dealdetails/Dealdetails";
import SmallButton from "@/components/ui/button/SmallButton";
import { css } from "@emotion/core";
import ContactByDeal from "@/layouts/deals/dealdetails/ContactByDeal";
import DealCheckBox from "@/components/ui/Checkbox/DealCheckBox";
import DealNotes from "@/layouts/deals/dealactions/DealNotes";
import DealTags from "@/layouts/deals/dealactions/DealTags";
import DealForm from "@/layouts/deals/dealactions/DealForm";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_DEAL_BY_ID } from "@/lib/graphql/queries/getDealById";
import { typographyH3, typographySubtitle2Normal } from "@/styles/typography";
import { GroupBadge } from "@/components/ui/avatar/Avatar";
import { formatDate, getStages } from "@/utils/helperUtils";
import { CrossIcon } from "@/utils/formUtils/InputSvg/InputSvg";
import DealProbability from "@/layouts/deals/dealactions/DealProbability";
import Assignee from "@/layouts/deals/dealactions/Assignee";
import { useFormik } from "formik";
import { UPDATE_DEAL } from "@/lib/graphql/mutation/updateDeal";
import { useQueryContext } from "@/context/query/queryContext";
import { successToast } from "@/styles/toaster";
import DealValues from "@/layouts/deals/dealactions/DealValues";

const ModalProfileWrapper = styled.div`
  display: flex;
  gap: 25px;
  padding: 10px 20px;
`;
const ModalProfileSeventy = styled.div`
  // width: 70%;
`;

const ModalProfileThirty = styled.div`
  // width: 30%;
`;

const ProfileName = styled.div`
  min-height: 96px;
  border-radius: ${borderRadiusSmall};
  background: ${darkCharcoalColor};
  color: ${whiteColor};
  padding: 12px;
  margin-bottom: 1rem;
`;
const Profiletext = styled.div(
  [typographyH3],
  `
  color: ${whiteColor};
  text-transform:capitalize
`,
);

const Profiledate = styled.div`
  color: ${whiteColor};
  font-size: 17px;
  font-weight: 300;
`;

const Socials = styled.div`
  border-radius: 4px 4px 0px 0px;
  background: rgba(168, 216, 204, 0.2);
  display: flex;
  justify-content: center;
  padding: ${guttersPx.medium};
  align-items: center;
  gap: ${guttersPx.medium};
`;

const Boxes = styled.div`
  margin: 1rem 0;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
`;

export const BoxeswidthoneText = styled.div`
  color: ${greyColor};
  font-size: 15px;
  font-weight: ${fontWeightNormal};
`;
const Progress = styled.div`
  margin: 1rem 0;
  display: block;
  width: 100%;
  div {
    margin-bottom: 2px;
    justify-content: space-between;
  }
`;
const Leads = styled.div(
  [typographySubtitle2Normal],
  `
  color: ${blackColor};
`,
);

const DivWrapper = styled.div`
  padding: 0 ${guttersPx.medium};
`;

const StatusButton = styled(SmallButton)<{
  bgcolor: string;
  color: string;
  opacity: boolean;
}>(
  ({ bgcolor, color, opacity }) => css`
    background: ${bgcolor};
    color: ${color};
    box-shadow: none;
    border-radius: 2px;
    opacity: ${opacity ? 1 : 0.5};
  `,
);
const LeftBoxes = styled.div`
  height: 100%;
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
`;

const CancelIconWrapper = styled.div`
  text-align: end;
  cursor: pointer;
`;

const DealDetailByUsers = ({
  id,
  handleProfileModal,
}: {
  id: string;
  handleProfileModal: (arg1: boolean) => void;
}) => {
  const [inputName, setInputName] = useState<string | null>(null);
  const [stageId, setStageId] = useState<string>("");
  const [formOpen, setFormOpen] = useState({
    probability: false,
    socail: false,
    value: false,
    assignee: false,
    tags: false,
    date: false,
  });

  const handleDealActions = (name: keyof typeof formOpen, value: boolean) => {
    const updatedFormOpen: any = { ...formOpen, [name]: value };
    if (name !== "socail") {
      setInputName(null);
    }
    Object.keys(formOpen).forEach((key) => {
      if (key !== name) {
        updatedFormOpen[key] = false;
      }
    });
    setFormOpen(updatedFormOpen);
  };

  const { listData, dealId, data: kanbanBoardvalue } = useQueryContext();

  const [getDealDetalById, { data }] = useLazyQuery(GET_DEAL_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [handleDealupdate] = useMutation(UPDATE_DEAL, {
    onCompleted: listData,
  });

  useEffect(() => {
    getDealDetalById({ variables: { getDealByIdId: id } });
  }, [id]);

  const formattedDate = formatDate(data?.getDealById?.createdAt || "");
  const { errors, handleChange, setFieldValue, handleSubmit }: any = useFormik({
    initialValues: { stage: [] },
    onSubmit: async () => {
      const { data: updateData } = await handleDealupdate({
        variables: { input: { stage: stageId, id: dealId } },
      });
      if (updateData?.updateDeal) {
        successToast("Stage updated successfully");
      }
    },
  });

  const handleUpdate = (name: string, fieldUpdateData: string[]) => {
    setFieldValue(name, fieldUpdateData);
    const Id = getStages(
      fieldUpdateData?.length,
      kanbanBoardvalue?.kanbanBoard,
    );
    setStageId(Id);
    handleSubmit();
  };

  return (
    <div>
      <CancelIconWrapper
        onClick={() => {
          handleProfileModal(false);
        }}
      >
        <CrossIcon />
      </CancelIconWrapper>
      <ModalProfileWrapper>
        <ModalProfileSeventy>
          <ProfileName>
            <Profiletext>{data?.getDealById?.name}</Profiletext>
            <Profiledate>Created {formattedDate}</Profiledate>
          </ProfileName>
          <Socials>
            <ContactByDeal
              handleForm={handleDealActions}
              setName={setInputName}
              data={data}
            />
          </Socials>
          <DivWrapper>
            {!inputName ? (
              <Boxes>
                <LeftBoxes>
                  <DealProbability
                    isForm={formOpen?.probability}
                    handleForm={handleDealActions}
                    data={data}
                  />
                  <DealTags
                    setName={setInputName}
                    data={data?.getDealById?.tags}
                  />
                </LeftBoxes>
                <DealNotes
                  onUpdate={handleDealupdate}
                  handleForm={handleDealActions}
                  id={dealId}
                  dealdata={data?.getDealById?.notes}
                />
              </Boxes>
            ) : (
              <DealForm
                name={inputName}
                data={inputName && data?.getDealById?.[inputName]}
                id={id}
                handleProfileModal={handleProfileModal}
              />
            )}
            <Progress>
              <DealCheckBox
                width={75}
                data={data?.getDealById?.stage?.boardName}
                error={errors.stage || ""}
                handleChecked={handleChange}
                setFieldValue={handleUpdate}
                name="stage"
              />
              <Leads>{data?.getDealById?.stage?.boardName}</Leads>
            </Progress>
          </DivWrapper>
        </ModalProfileSeventy>

        <ModalProfileThirty>
          <Dealdetails
            heading="Value"
            icon="/assets/icons/Person.svg"
            content={
              <DealValues
                isOpen={formOpen?.value}
                handleForm={handleDealActions}
                onUpdate={handleDealupdate}
                id={dealId}
                dealValue={data}
              />
            }
          />
          <Dealdetails
            heading="Assigned"
            values={data?.getDealById?.teamMembers}
            isBudge={
              <AssigniContent
                handleForm={handleDealActions}
                data={data?.getDealById?.teamMembers}
              />
            }
          />
          <Dealdetails
            heading="Estimate"
            icon="/assets/icons/estimate.png"
            content={
              <StatusContent
                onUpdate={handleDealupdate}
                id={dealId}
                dealValue={data}
              />
            }
          />
          <Dealdetails
            heading="Expected close date"
            values={data?.getDealById?.expectedCloseDate}
            icon="/assets/icons/calender.svg"
            type="date"
            id={id}
            handleForm={handleDealActions}
            handleProfileModal={handleProfileModal}
          />
        </ModalProfileThirty>
      </ModalProfileWrapper>
    </div>
  );
};

export default DealDetailByUsers;

const StatusContent = ({ onUpdate, dealValue, id }: any) => {
  const handleClick = async (e: React.SyntheticEvent<any>) => {
    const { innerText } = e.target as HTMLButtonElement;
    const { data } = await onUpdate({
      variables: { input: { estimate: innerText, id: id } },
    });
    if (data?.updateDeal) {
      successToast("Estimate updated suceesfully");
    }
  };

  return (
    <>
      <StatusWrapper>
        <StatusButton
          onClick={handleClick}
          color="#21680F"
          bgcolor="rgba(103, 214, 75, 0.70)"
          opacity={dealValue?.getDealById?.estimate === "Won"}
        >
          Won
        </StatusButton>
        <StatusButton
          onClick={handleClick}
          color="#8A0C0C"
          opacity={dealValue?.getDealById?.estimate === "Lost"}
          bgcolor="rgba(214, 75, 75, 0.70)"
        >
          Lost
        </StatusButton>
      </StatusWrapper>
    </>
  );
};

const AssigniContent = ({ data, handleForm }: any) => {
  return data?.length !== 0 ? (
    <GroupBadge data={data || []} dimension="22" />
  ) : (
    <Assignee handleForm={handleForm} />
  );
};
const StatusWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
