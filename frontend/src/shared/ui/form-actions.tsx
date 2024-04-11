import { Button } from "primereact/button";
import { BaseBackdrop } from "./base-backdrop";

interface FormActionsProps {
    onCancel: () => void,
    handleDelete?: () => void,
    isEnabled?: boolean,
    hasId: boolean,
    isProcessing: boolean,
    isDirty: boolean,
}

export const FormActions = ({ onCancel, handleDelete, isEnabled = false, hasId, isProcessing, isDirty }: FormActionsProps) => {
  return (
    <div className="d-flex justify-content-between gap-3 mt-3">
      <Button type="button" color="error" outlined onClick={onCancel} label="Discard change" />
      {handleDelete && hasId && (
        <Button type="button" color="error" onClick={handleDelete} label="Delete"/>
      )}
      <Button type="submit" disabled={!isDirty && !isEnabled} label={hasId ? "SAVE" : "ADD"} />
      {isProcessing && <BaseBackdrop />}
    </div>
  );
};
