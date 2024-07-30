import React from "react";
import ArrowRightUp from "../../../public/assets/icons/arrowRightUp.svg";
import CloseMoreText from "@/layouts/CloseMoreDealsText/CloseMoreText";
import { linkedinURL } from "@/layouts/dealimport/linkedinImport/LinkedinImport";

const WantToCloseMoreDeals: React.FC = () => {
  return (
    <CloseMoreText
      showTitle={"Do you want close more deals?"}
      src={ArrowRightUp}
      width={12}
      height={12}
      alt={"ArrowIcon"}
      route={linkedinURL}
      linkText={"Go to LinkedIn"}
    />
  );
};

export default WantToCloseMoreDeals;
