import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
const CustomDialog = styled(Dialog)<{
  width: string;
}>(
  ({ width }) => css`
    max-width: ${width}px;
    width: 100%;
    display: block;
    margin: auto;
    border-radius: 0 !important;
  `,
);
type Style = {
  [key: string]: string;
};

export default function Modal({
  title,
  open,
  closeModal,
  width,
  children,
  sx,
  styles = { borderRadius: "0" },
  maxWidth = false,
  rounded,
}: {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  maxWidth: any;
  width: string;
  sx?: any;
  closeModal(): void;
  styles?: Style;
  rounded?: string;
}) {
  return (
    <>
      <CustomDialog
        width={width}
        open={open}
        maxWidth={maxWidth}
        onClose={closeModal}
        PaperProps={
          rounded
            ? { sx: { ...styles, borderRadius: rounded } }
            : { sx: styles }
        }
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent sx={...sx}>{children}</DialogContent>
      </CustomDialog>
    </>
  );
}
