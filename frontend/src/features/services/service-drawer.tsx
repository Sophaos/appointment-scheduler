import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsServiceDrawerVisible, setServiceDrawerVisibility } from "./service-slice";
import { ServiceForm } from "./service-form";

export const ServiceDrawer = () => {
  const dispatch = useDispatch();
  const isServiceDrawerVisible = useSelector(selectIsServiceDrawerVisible);
  const handleHide = () => dispatch(setServiceDrawerVisibility(false));

  const handleConfirm = () => console.log("Confirm");
  const isProcessing = false;

  return (
    <BaseDrawer isOpen={isServiceDrawerVisible} title="Service" onHide={handleHide}>
      <ServiceForm onCancel={handleHide} onConfirm={handleConfirm} data={undefined} isProcessing={isProcessing} />
    </BaseDrawer>
  );
};
