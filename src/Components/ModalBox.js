import React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import { Outlet } from "react-router";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid lightgray",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ModalBox = ({ open, handleClose, event, eventId }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Outlet />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalBox;
