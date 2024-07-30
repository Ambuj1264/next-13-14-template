import { typographyH4 } from "@/styles/typography";
import {
  borderRadiusSmall,
  darkCharcoalColor,
  fontWeightNormal,
  greyColor,
  guttersPx,
  redColor,
  rosePinkColor,
  whiteColor,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_DEAL } from "@/lib/graphql/mutation/updateDeal";
import { useQueryContext } from "@/context/query/queryContext";
import { errorToast, successToast } from "@/styles/toaster";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const DetailCardWrapper = styled.div`
  width: 255px;
  min-height: 116px;
  border-radius: ${borderRadiusSmall};
  background: ${whiteColor};
  box-shadow: 0px 0.5px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 12px;
  margin-bottom: 10px;
`;
const RectangleFlex = styled.div``;
const LeftTopContentWrapper = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  & > div {
    justify-content: end;
    align-items: center;
  }
`;

export const SubTitle = styled.h1<{
  isValues: boolean;
}>(
  ({ isValues }) => css`
    ${typographyH4}
    color: ${!isValues ? darkCharcoalColor : rosePinkColor};
    word-break: break-word;
  `,
);

const Title = styled.p`
  color: ${greyColor};
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: ${fontWeightNormal};
`;
const Assignee = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  div {
    margin: 0;
  }
`;
const ViewBtn = styled.button`
  text-align: end;
  display: block;
  background: transparent;
  border: none;
  margin: 0 0 0 auto;
  color: ${redColor};
  cursor: pointer;
`;
const Dealdetails = ({
  heading,
  values,
  icon,
  isBudge,
  content,
  type,
  id,
  handleProfileModal,
  handleForm,
}: {
  heading: string;
  values?: string | string[];
  icon?: any;
  type?: string;
  handleProfileModal?: any;
  id?: string;
  isBudge?: React.ReactNode;
  content?: React.ReactNode;
  handleForm?: (arg1: any, value: boolean) => void;
}) => {
  const isValues = !values || values === "" || values?.length === 0;
  const subTitle = isValues ? "To complete" : values;
  const isArr = Array.isArray(subTitle);
  const [number, setNumber] = useState(3);
  const showmore = () => {
    setNumber(subTitle.length);
  };

  const showless = () => {
    setNumber(3);
  };

  const View =
    isArr &&
    subTitle.length > 3 &&
    (number === 3 ? (
      <ViewBtn onClick={showmore}>Show More</ViewBtn>
    ) : (
      <ViewBtn onClick={showless}>Show Less</ViewBtn>
    ));

  const nameWtihComma = (arr: any[]) => {
    return arr
      .slice(0, number)
      .map(
        (item: { fullName: string | number }, index: number) =>
          item.fullName + (index === arr.length - 1 ? "" : ","),
      );
  };
  return (
    <>
      <DetailCardWrapper>
        <LeftTopContentWrapper>
          {!isBudge ? (
            <>
              <IconComponent
                handleForm={handleForm as any}
                type={type}
                Icon={icon}
                id={id}
                handleProfileModal={handleProfileModal}
              />
            </>
          ) : (
            <Assignee>{isBudge}</Assignee>
          )}
        </LeftTopContentWrapper>
        <RectangleFlex>
          <Title>{heading}</Title>
          {subTitle && !content && (
            <SubTitle isValues={isValues}>
              {isArr ? nameWtihComma(subTitle) : subTitle}
              {View}
            </SubTitle>
          )}
          {content}
        </RectangleFlex>
      </DetailCardWrapper>
    </>
  );
};

export default Dealdetails;

const Container = styled.div`
  position: relative;
  float: left;
  max-height: ${guttersPx.medium};
`;

const InputBoxContainer = styled.div`
  opacity: 0;
  opacity: 0;
  margin-top: -24px;
  margin-right: -11px;
  input {
    height: auto;
  }
`;

const OpenButton = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #fff;
  pointer-events: none;
`;

const IconComponent = ({
  Icon,
  type,
  id,
  handleProfileModal,
  handleForm,
}: {
  Icon: any;
  type?: string;
  id?: string;
  handleProfileModal: (arg1: boolean) => void;
  handleForm: (arg1: any, arg2: boolean) => void;
}) => {
  const { listData } = useQueryContext();

  const [handleDealupdate] = useMutation(UPDATE_DEAL, {
    onCompleted: listData,
  });

  const UpdateForm = async (date: string) => {
    try {
      const { data } = await handleDealupdate({
        variables: {
          input: {
            id: id,
            expectedCloseDate: date,
          },
        },
      });
      if (data?.updateDeal) {
        successToast("Deal updated successfully.");
        handleProfileModal(false);
      }
    } catch (err: any) {
      errorToast(err?.message || "Something went wrong");
    }
  };

  const handleDate = (value: Dayjs) => {
    const getDate =
      `${value?.month()}-${value?.date()}-${value?.year()}`.toString();
    UpdateForm(getDate);
  };

  return (
    <>
      {type !== "date" ? (
        <Image src={Icon} width={17} height={17} alt={""} />
      ) : (
        <Container>
          <InputBoxContainer>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  onChange={(date: any) => {
                    handleDate(date);
                  }}
                  onOpen={() => {
                    handleForm("date", true);
                  }}
                  disablePast
                />
              </DemoContainer>
            </LocalizationProvider>
          </InputBoxContainer>
          <OpenButton>
            <Image src={Icon} width={17} height={17} alt={""} />
          </OpenButton>
        </Container>
      )}
    </>
  );
};
