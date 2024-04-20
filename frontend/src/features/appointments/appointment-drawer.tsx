import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAppointmentDrawerVisible, setAppointmentDrawerVisibility, useCreateAppointmentMutation, useUpdateAppointmentMutation } from "./appointment-slice";
import { AppointmentForm } from "./appointment-form";
import { Appointment } from "./appointment";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";

export const AppointmentDrawer = ({ data }: EntityDrawerProps<Appointment>) => {
  const dispatch = useDispatch();
  const isAppointmentDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  const handleHide = () => dispatch(setAppointmentDrawerVisibility(false));

  const [create, { isLoading: isCreating }] = useCreateAppointmentMutation();
  const [update, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

  const handleUpdate = async (item: Appointment) => {
    try {
      await update(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Appointment) => {
    try {
      await create(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: Appointment) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={undefined} isProcessing={isCreating || isUpdating} />
    </BaseDrawer>
  );
};
