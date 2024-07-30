import { Comment, Eye } from "@/utils/formUtils/InputSvg/InputSvg";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { greyColor, darkblueColor, guttersPx } from "@/styles/variables";
const IconWrapper = () => {
  const [active] = useState(false);
  const Flex = styled.div`
    display: flex;
    gap: ${guttersPx.medium};
    align-items: center;
  `;

  return (
    <Flex>
      <Eye color={active ? darkblueColor : greyColor} />
      <Comment color={active ? darkblueColor : greyColor} />
    </Flex>
  );
};

export default IconWrapper;
