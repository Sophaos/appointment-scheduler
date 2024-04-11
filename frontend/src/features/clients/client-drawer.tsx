import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsClientDrawerVisible, setClientDrawerVisibility } from "./client-slice";
import { ClientForm } from "./client-form";

export const ClientDrawer = () => {
  const dispatch = useDispatch();
  const isClientDrawerVisible = useSelector(selectIsClientDrawerVisible);
  const handleHide = () => dispatch(setClientDrawerVisibility(false));

  const handleCancel = () => console.log("Cancel")
  const handleConfirm = () => console.log("Confirm")
  const isProcessing = false;

  return (
    <BaseDrawer isOpen={isClientDrawerVisible} title="Client" onHide={handleHide}>
      <ClientForm onCancel={handleCancel} onConfirm={handleConfirm} data={undefined} isProcessing={isProcessing} />
    </BaseDrawer>
  );
};
