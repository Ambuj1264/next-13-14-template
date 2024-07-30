import AddNewDeal from "@/components/deals/AddNewDeal";
import ButtonNewDeal from "@/components/ui/button/ButtonNewDeal";
import DealCard from "@/components/ui/CardContainer/DealCard";
import Modal from "@/components/ui/modal/Modal";
import React, { useState } from "react";

const ManuallyImport = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <DealCard heading="Manually import your first deal" index="2">
        <ButtonNewDeal onClick={handleOpen}>New deal</ButtonNewDeal>
      </DealCard>
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
    </>
  );
};

export default ManuallyImport;
