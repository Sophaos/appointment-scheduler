import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAppointmentDrawerVisible, setAppointmentDrawerVisibility } from "./appointment-slice";

export const AppointmentDrawer = () => {
  const dispatch = useDispatch();
  const isAppointmentDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  const handleHide = () => dispatch(setAppointmentDrawerVisibility(false));

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      <div>Appointment Content</div>
    </BaseDrawer>
  );
};
