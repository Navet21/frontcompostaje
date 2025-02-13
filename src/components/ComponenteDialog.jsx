import { Button, Dialog, DialogBody, Typography } from "@material-tailwind/react";

const ComponenteDialog = ({ open, handleOpen, title, content }) => {
  return (
    <Dialog className="bg-gray-900" open={open} handler={handleOpen}>
      <DialogBody className="grid place-items-center gap-4 rounded-lg p-6 sm:pb-20 max-h-[90vh] overflow-y-auto">
        <Typography color="red" variant="h4">
          {title}
        </Typography>
        <Typography color="white" className="text-center font-normal">
          {content}
        </Typography>
        <Button variant="gradient" onClick={handleOpen}>
          Entendido
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default ComponenteDialog;
