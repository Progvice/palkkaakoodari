import { Dialog as DialogOrignal } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../shadcn/Dialog";
import { ReactNode } from "react";
import { useDialog } from "../../context/dialog.context";

type DialogProps = {
  title?: string,
  description?: string,
  component: ReactNode,
  className: string
};

const Dialog : React.FC<DialogProps> = (props) => {

  const {openDialog, isDialogOpen, closeDialog} = useDialog();
  const {title, description, component} = props;

  return (
    <DialogOrignal open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="bg-white max-w-7xl min-h-[90%]" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
          {component}
      </DialogContent>
    </DialogOrignal>
  )
}

export default Dialog;
