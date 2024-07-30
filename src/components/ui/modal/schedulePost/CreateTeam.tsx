import React from "react";
import styled from "@emotion/styled";
import {
  darkCharcoalColor,
  darkblueColor,
  whiteColor,
} from "@/styles/variables";
import ModalHeader from "@/components/schedulePost/ModalHeader";
import ModalHeading from "@/components/schedulePost/ModalHeading";
import ModalFooter from "@/components/schedulePost/ModalFooter";
import ComboButtons from "@/components/schedulePost/ComboButtons";
import Modal from "../Modal";
import InputBox from "../../input/InputBox";
import ListBox from "../../input/AutoCompleteWithCheckbox";
import { InputWrapper } from "./addmember/MemberForm";
import { typographyParagraph } from "@/styles/typography";
import { borderStyle } from "@/styles/base";
import { useQueryContext } from "@/context/query/queryContext";
import { useFormik } from "formik";
import { createNewteamSchema } from "@/utils/formUtils/validations/ValidationUtils";
import { useMutation } from "@apollo/client";
import { CREATE_TEAM } from "@/lib/graphql/mutation/createTeam";
import { errorToast, successToast } from "@/styles/toaster";
import { listData } from "@/utils/helperUtils";
import { useScheduledContext } from "@/context/schedule/scheduledContext";

const ModalContainer = styled.form`
  width: 647px;
  padding: 20px;
`;

const Label = styled.div`
  color: ${darkCharcoalColor};
  ${typographyParagraph};
  margin: 10px 0;
`;

const FooterWrapper = styled.div`
  margin-top: 50px;
`;

const CreateTeam = ({
  open,
  onclose,
}: {
  open: boolean;
  onclose: () => void;
}) => {
  const { teammembers } = useQueryContext();
  const { teamsDataRefetch } = useScheduledContext();
  const [craeteTeam] = useMutation(CREATE_TEAM, {
    onCompleted: teamsDataRefetch,
  });

  const closeHandler = () => {
    onclose();
  };

  const handleCreateTeam = async (array: {
    teamName: string;
    teamMembers: any[];
  }) => {
    const newArr = {
      teamName: array.teamName,
      teamMembers: array.teamMembers.map((member: { id: string }) => member.id),
    };
    try {
      const { data } = await craeteTeam({
        variables: {
          input: newArr,
        },
      });
      if (data?.createTeam) {
        successToast("Team created successfully");
        closeHandler();
      }
    } catch (err: any) {
      errorToast(err.message);
    }
  };

  const { values, errors, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: { teamName: "", teamMembers: [] },
      validationSchema: createNewteamSchema,
      onSubmit: async () => {
        await handleCreateTeam(values);
      },
    });
  const buttonsConfig = [
    {
      backgroundColor: whiteColor,
      color: darkCharcoalColor,
      outline: true,
      buttonText: "Cancel",
      onclick: closeHandler,
    },
    {
      backgroundColor: darkblueColor,
      color: whiteColor,
      outline: false,
      buttonText: "Save",
      onclick: handleSubmit,
    },
  ];
  const listItem = listData(teammembers?.getTeamMembersByCompanyId);
  return (
    <>
      <Modal
        open={open}
        width="900"
        closeModal={closeHandler}
        maxWidth="xl"
        styles={borderStyle}
      >
        <ModalContainer>
          <ModalHeader
            component={<ModalHeading heading={"Create a new team"} />}
            showClose={true}
            onclose={closeHandler}
          />
          <InputWrapper inputStyle={typographyParagraph}>
            <Label>Name</Label>
            <InputBox
              fullborder
              type="text"
              placeholder={"Enter the team name"}
              name="teamName"
              value={values.teamName}
              onChange={handleChange}
              autocomplete="off"
              error={errors.teamName}
              Icon="none"
            />
            <ListBox
              error={errors?.teamMembers as never[]}
              setFieldValue={setFieldValue}
              name="teamMembers"
              listItem={listItem}
              label="Team members"
              placeholder="Select Members"
            />
          </InputWrapper>
          <FooterWrapper>
            <ModalFooter
              componentRight={<ComboButtons buttons={buttonsConfig} />}
            />
          </FooterWrapper>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default CreateTeam;
