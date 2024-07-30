import React from "react";
import { SideBarData } from "@/utils/constant";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { css } from "@emotion/react";
import { blackColor } from "@/styles/variables";

const DashboardSideBar: React.FC = () => {
  return (
    <Sidebar>
      {SideBarData.map((item, index) => (
        <SideBarLinks
          href={item.routerPath}
          key={index}
          isClassName={index == 0}
          isBottom={index === SideBarData.length - 1}
        >
          <SideBarIconsContainer
            isClassName={index == 0}
            data-title={item.title}
          >
            <SideBarIcons
              src={item.url}
              alt="SideBarIcons"
              width={34}
              height={34}
            />
          </SideBarIconsContainer>
        </SideBarLinks>
      ))}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  background-color: ${blackColor};
  width: 75px;
  height: 100vh;
  position: fixed;
  z-index: 999;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SideBarLinks = styled(Link)<{
  isClassName: boolean;
  isBottom: boolean;
}>(
  ({ isClassName, isBottom }) => css`
    position: ${isBottom ? "fixed" : "relative"};
    bottom: ${isBottom ? "0px" : "inherit"};
    height: min-content;
    padding: 16px;
    width: ${isBottom ? "inherit" : "100%"};
    text-align: center;
    border-bottom: ${isClassName ? "2px solid white" : "none"};
    height: ${isClassName ? "61px" : "auto"};
  `,
);

const SideBarIconsContainer = styled.div<{
  isClassName: boolean;
}>(
  ({ isClassName }) => css`
    transition: transform 0.5s ease;
    &:hover {
      background-color: ${isClassName ? "inherit" : "#0277B6"};
      scale: ${isClassName ? "inherit" : "1.2"};
      border-radius: ${isClassName ? "inherit" : "4px"};
      padding: ${isClassName ? "" : "2px 0"};
    }

    &:hover::after {
      content: ${isClassName ? '""' : "attr(data-title)"};
      background-color: ${isClassName ? "inherit" : "#333"};
      color: ${isClassName ? "inherit" : "#fff"};
      padding: ${isClassName ? "" : "5px 10px 5px 11px"};
      border-radius: ${isClassName ? "" : "2px"};
      position: absolute;
      top: 30%;
      left: 55px;
      width: fit-content;
      font: 11px Montserrat;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  `,
);

const SideBarIcons = styled(Image)(css``);
export default DashboardSideBar;
