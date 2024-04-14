import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsExpertDrawerVisible, setExpertDrawerVisibility } from "./expert-slice";
import { ExpertForm } from "./expert-form";

export const ExpertDrawer = () => {
  const dispatch = useDispatch();
  const isExpertDrawerVisible = useSelector(selectIsExpertDrawerVisible);
  const handleHide = () => dispatch(setExpertDrawerVisibility(false));

  const handleCancel = () => console.log("Cancel")
  const handleConfirm = () => console.log("Confirm")
  const isProcessing = false;
  return (
    <BaseDrawer isOpen={isExpertDrawerVisible} title="Expert" onHide={handleHide}>
      <ExpertForm onCancel={handleCancel} onConfirm={handleConfirm} data={undefined} isProcessing={isProcessing} />
    </BaseDrawer>
  );
};
