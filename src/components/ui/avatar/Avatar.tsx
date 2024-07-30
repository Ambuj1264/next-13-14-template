import {
  darkblueColor,
  darkRedColor,
  GreenTeal,
  lightGreenColor,
  lightGrayishBlue,
  fontFamily,
  fontWeightSemibold,
} from "@/styles/variables";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import Badge from "@mui/material/Badge";
import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { ErrorMessage } from "../input/InputBox";
import Image from "next/image";

interface Member {
  name: string;
  background: string;
  value?: string;
  profilePicture?: string;
}

interface AvtarProps {
  data: Member[];
  isCollapse?: boolean;
  handleCheked?(): void;
  name?: string;
  dimension: string;
  imgDimension?: number;
  selectable?: boolean;
  error?: string;
}

const borderColor = lightGrayishBlue;
const paddingValue = "1px";
const borderStyle = `border:2px solid ${borderColor};padding:${paddingValue}`;

export const SmallAvatar = styled(Avatar)<{
  dimension: string;
  isCollapse: boolean;
  bgColor: string;
  checked?: boolean;
}>(
  ({ dimension, isCollapse = false, bgColor, checked = false }) => css`
    width: ${dimension}px !important;
    height: ${dimension}px !important;
    border: 0 important;
    background: ${bgColor};
    color: white;
    font-size: 7px;
    font-weight: 600;
    margin-left: ${isCollapse ? "-5px" : "0px"};
    ${checked && borderStyle};
  `,
);

const BadgeContainer = styled.div<{ isWrap: boolean }>(
  ({ isWrap }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: ${isWrap ? "wrap" : "norwap"};
    gap: 2px;
    width: ${isWrap ? "100%" : "auto"};
    margin: 35px 20px 20px ${isWrap ? 0 : "20px"};
  `,
);

const AvatarComponent = styled(Avatar)<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  background-color: ${darkblueColor} !important;
  font-weight: ${fontWeightSemibold} !important;
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "16px !important"};
  font-family: ${fontFamily} !important;
  height: ${(props) => (props.height ? props.height : "24px")};
  width: ${(props) => (props.width ? props.width : "24px")};
`;
const ProfileComponent = styled(Avatar)<{
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  font-weight: ${fontWeightSemibold} !important;
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "16px !important"};
  font-family: ${fontFamily} !important;
  height: ${(props) => (props.height ? props.height : "24px")};
  width: ${(props) => (props.width ? props.width : "24px")};
`;

const StyledImage = styled(Image)<{ checked?: boolean }>`
  border-radius: 50px;
  ${(props) => props.checked && borderStyle};
`;

export const GroupBadge = ({
  data,
  isCollapse = false,
  handleCheked,
  name,
  dimension,
  imgDimension = 21,
  selectable = false,
  error,
}: AvtarProps) => {
  const renderBadge = (
    item: {
      profilePicture: string;
      name: string;
      background: string;
      value?: string;
      id: string | number;
    },
    index: number,
  ) => {
    if (selectable) {
      return (
        <>
          <Checkbox
            name={name}
            onChange={handleCheked}
            value={item.value ?? item.id}
            sx={{ p: 0 }}
            icon={
              !item?.profilePicture ? (
                <SmallAvatar
                  dimension={dimension}
                  isCollapse={isCollapse}
                  key={index}
                  bgColor={item.background}
                  alt={item.name}
                  sx={{ opacity: 0.5 }}
                >
                  {item.name}
                </SmallAvatar>
              ) : (
                <StyledImage
                  src={item?.profilePicture}
                  alt="sas"
                  width={imgDimension}
                  height={imgDimension}
                />
              )
            }
            checkedIcon={
              !item?.profilePicture ? (
                <SmallAvatar
                  dimension={dimension}
                  isCollapse={isCollapse}
                  key={index}
                  bgColor={item.background}
                  sx={{ opacity: 1 }}
                  alt={item.name}
                  checked
                >
                  {item.name}
                </SmallAvatar>
              ) : (
                <StyledImage
                  src={item?.profilePicture}
                  alt="sas"
                  width={imgDimension}
                  height={imgDimension}
                  checked
                />
              )
            }
          />
        </>
      );
    } else {
      return !item?.profilePicture ? (
        <SmallAvatar
          dimension={dimension}
          isCollapse={isCollapse}
          key={index}
          bgColor={item.background}
          alt={item.name}
        >
          {item.name}
        </SmallAvatar>
      ) : (
        <StyledImage
          src={item?.profilePicture}
          alt="sas"
          width={imgDimension}
          height={imgDimension}
        />
      );
    }
  };
  const members = getTeamMembers(data);
  return (
    <div>
      <BadgeContainer isWrap={members?.length > 4}>
        {members?.map(renderBadge)}
      </BadgeContainer>{" "}
      {error && (
        <>
          <ErrorMessage>{error}</ErrorMessage>
        </>
      )}
    </div>
  );
};

const AvatarUI = ({
  teammembers,
  image,
}: {
  teammembers: any;
  image: string;
}) => {
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <GroupBadge data={teammembers} dimension="18" isCollapse />
        }
      >
        <Avatar
          alt="image"
          src={image}
          sx={{ width: "70px", height: "70px" }}
        />
      </Badge>
    </>
  );
};

export default AvatarUI;

interface AvatarInitialsProps {
  w: string;
  h: string;
  name: string;
  textSize: string;
  profilePicture?: string;
}

export const AvatarInitials = ({
  w,
  h,
  name,
  textSize,
  profilePicture,
}: AvatarInitialsProps) => {
  return (
    <>
      {profilePicture ? (
        <ProfileComponent width={w} height={h} fontSize={textSize}>
          <Image
            src={profilePicture || ""}
            alt="profile"
            width={30}
            height={30}
          />
        </ProfileComponent>
      ) : (
        <AvatarComponent width={w} height={h} fontSize={textSize}>
          {getInitials(name) || ""}
        </AvatarComponent>
      )}
    </>
  );
};

export const colors = [darkRedColor, lightGreenColor, darkblueColor, GreenTeal];

export const getInitials = (fullName: string) => {
  if (!fullName) {
    return "";
  }
  const [firstName, lastName] = fullName.split(" ");
  return `${firstName?.charAt(0)?.toUpperCase()}${
    lastName ? lastName?.charAt(0)?.toUpperCase() : ""
  }`;
};

const getTeamMembers = (teamMembers: any) => {
  let colorIndex = 0;
  return teamMembers?.map(
    (
      item: {
        profilePicture?: string;
        fullName: string;
        id: number | string;
      },
      index: number,
    ) => {
      colorIndex = (index + 1) % colors.length;
      return {
        name: getInitials(item?.fullName),
        background: colors[colorIndex] ? colors[colorIndex] : colors[1],
        id: item.id,
        profilePicture: item.profilePicture,
      };
    },
  );
};
