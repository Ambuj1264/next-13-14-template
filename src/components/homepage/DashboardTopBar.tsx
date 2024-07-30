import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  darkCharcoalColor,
  greyColor,
  gutters,
  guttersPx,
  navboxshadow,
  whiteColor,
  zIndex,
} from "@/styles/variables";
import { container } from "@/styles/base";
import Profile from "@/layouts/userprofile/Profile";
import ButtonNewDeal from "../ui/button/ButtonNewDeal";
import { typographyParagraph } from "@/styles/typography";
import { useAuth } from "@/context/auth/authContext";
import Modal from "../ui/modal/Modal";
import AddNewDeal from "../deals/AddNewDeal";
import { AvatarInitials } from "../ui/avatar/Avatar";
import { useQueryContext } from "@/context/query/queryContext";
import { usePathname } from "next/navigation";
import { ROUTE_NAMES } from "@/shared/routeNames";
import { allRoutes } from "@/utils/helperUtils";
import SearchBarInput from "../ui/input/SearchBarInput";

const Navbar = styled.div<{ isShadow: boolean }>(
  [container],
  ({ isShadow }) => css`
    ${styledNav(isShadow)};
    color: ${whiteColor};
    padding: 0 ${gutters.large * 3}px !important;
    background: ${whiteColor};
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: ${zIndex.z2};
    min-width: 100vw;
  `,
);

const NavContent = styled.div<{ contentPosition: boolean }>(
  ({ contentPosition }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: ${guttersPx.medium};
    gap: ${contentPosition ? "auto" : guttersPx.smallHalf};
  `,
);

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${guttersPx.smallHalf};
`;

const DashboardTopBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { isDashboard } = useAuth();
  const pathname = usePathname();
  const { profiledata, profileRefecth, searchData } = useQueryContext();
  const { fullName, company, profilePicture } =
    profiledata?.getUserDetailsById || {};
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSeach = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleReset = () => {
    setSearch("");
  };

  useEffect(() => {
    profileRefecth();
    searchData();
  }, []);

  const navContentContainer = () => {
    const routeName = allRoutes.find((item) => item.route === pathname);
    const isDealsPage = pathname === ROUTE_NAMES.DEALS;
    return (
      <NavContent contentPosition={isDealsPage}>
        <RouteName>{routeName?.title}</RouteName>
        {isDealsPage && (
          <>
            <SearchBarInput
              search={search}
              handleSearch={handleSeach}
              handleReset={handleReset}
              isReset={search.length >= 1}
            />
            <ButtonNewDeal onClick={handleOpen}>New deal</ButtonNewDeal>
          </>
        )}
        {!isDealsPage && (
          <ProfileSection>
            <AvatarInitials
              w={"30px"}
              h={"30px"}
              name={fullName}
              profilePicture={profilePicture}
              textSize={"12px"}
            />
            <Profile fullName={fullName} companyName={company?.name} />
          </ProfileSection>
        )}
      </NavContent>
    );
  };

  return (
    <Navbar isShadow={isDashboard}>
      {navContentContainer()}
      <Modal
        sx={{ p: 0, width: "817px" }}
        maxWidth={false}
        width="1000"
        open={open}
        title=""
        closeModal={() => {
          setOpen(true);
        }}
      >
        <AddNewDeal onClose={handleClose} />
      </Modal>
    </Navbar>
  );
};
export default DashboardTopBar;

const RouteName = styled.h3(
  [typographyParagraph],
  `
  color:${darkCharcoalColor}
`,
);

const styledNav = (value: boolean) => {
  let style: string = "";
  if (value) {
    style += `border-bottom:2px solid ${greyColor}`;
  } else {
    style += `box-shadow:${navboxshadow}`;
  }
  return style;
};
