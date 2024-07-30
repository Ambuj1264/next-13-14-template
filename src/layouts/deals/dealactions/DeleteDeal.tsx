import DealModal from "@/components/deals/DealModal";
import { useQueryContext } from "@/context/query/queryContext";
import ProfileCard from "@/layouts/userprofile/ProfileCard";
import { greyColor, gutters, whiteColor } from "@/styles/variables";
import styled from "@emotion/styled";
import React from "react";

export const ProfileWrapper = styled.div`
padding:${gutters.small}px 0;
width: 275px;
&>div {
  height: 160px !important;

}
}
`;

const DeleteDeal = ({ id, profileData }: { id: string; profileData: any }) => {
  const { dealactions, dealActionsClose, onDealActionSubmit, refetch } =
    useQueryContext();

  const handleSubmit = async () => {
    onDealActionSubmit({ isDeleted: true, dealId: id }, refetch);
  };

  return (
    <div>
      <DealModal
        open={dealactions?.delete}
        close={dealActionsClose}
        handleSubmit={handleSubmit}
        firstButtonText="Cancel"
        secondButtonText="DELETE"
        modalHeadig="Delete"
        subText="Are you sure?"
        firstButtonColor={whiteColor}
        secondButtonColor={greyColor}
      >
        <ProfileWrapper>
          <ProfileCard data={profileData} />
        </ProfileWrapper>
      </DealModal>
    </div>
  );
};

export default DeleteDeal;
