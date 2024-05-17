import { Button } from "primereact/button";
import { BaseBackdrop } from "./base-backdrop";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

interface FormActionsProps {
  onCancel: () => void;
  handleDelete?: () => void;
  isEnabled?: boolean;
  hasId: boolean;
  isProcessing: boolean;
  isDirty: boolean;
}

export const FormActions = ({ onCancel, handleDelete, isEnabled = false, hasId, isProcessing, isDirty }: FormActionsProps) => {
  const onDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: handleDelete,
    });
  };
  return (
    <div className="flex justify-between gap-3 mb-10">
      <ConfirmDialog />
      <Button type="button" outlined onClick={onCancel} label="Discard change" />
      <div className="flex gap-1">
        {handleDelete && hasId && <Button type="button" severity="danger" onClick={onDelete} label="Delete" />}
        <Button type="submit" disabled={!isDirty && !isEnabled} label={hasId ? "SAVE" : "ADD"} />
      </div>
      {isProcessing && <BaseBackdrop />}
    </div>
  );
};
