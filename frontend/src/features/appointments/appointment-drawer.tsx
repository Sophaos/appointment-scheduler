import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAppointmentDrawerVisible, setAppointmentDrawerVisibility } from "./appointment-slice";
import { AppointmentForm } from "./appointment-form";

export const AppointmentDrawer = () => {
  const dispatch = useDispatch();
  const isAppointmentDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  const handleHide = () => dispatch(setAppointmentDrawerVisibility(false));

  const handleCancel = () => console.log("Cancel");
  const handleConfirm = () => console.log("Confirm");
  const isProcessing = false;

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      <AppointmentForm onCancel={handleCancel} onConfirm={handleConfirm} data={undefined} isProcessing={isProcessing} />
    </BaseDrawer>
  );
};
