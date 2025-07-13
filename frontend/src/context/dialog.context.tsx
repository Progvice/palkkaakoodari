import { createContext } from "react";
import { useState, useContext } from "react";
import type { ReactElement, ReactNode } from "react";

interface DialogContextType {
  dialog: ReactNode|undefined,
  openDialog: (dialog: ReactNode) => void,
  closeDialog: () => void,
  isDialogOpen: boolean,
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider : React.FC<{children: ReactElement}> = ({children}) => {
  const [dialog, setDialog] = useState<ReactNode|undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = (d: ReactNode) => {
    setDialog(d);
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    setDialog(undefined);
    setIsDialogOpen(false);
  }

  return (
  <DialogContext.Provider value={{dialog, openDialog, closeDialog, isDialogOpen}}>
    {children}
    {isDialogOpen && dialog ? dialog : null}
  </DialogContext.Provider>)
}

export const useDialog = () => {
  try {
    const ctx = useContext(DialogContext);
    if (!ctx) throw new Error("Could not load DialogContext");
    return ctx;
  }
  catch (err) {
    throw new Error("Could not load LangContext" + err);
  }
}
