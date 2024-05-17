import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAppointmentData,
  selectIsAppointmentDrawerVisible,
  setAppointmentData,
  setAppointmentDrawerVisibility,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} from "./appointment-slice";
import { AppointmentForm } from "./appointment-form";
import { Appointment, DEFAULT_APPOINTMENT, FormattedAppointment } from "./appointment";
import { useGetExpertsQuery } from "features/experts/expert-slice";
import { useGetServicesQuery } from "features/services/service-slice";
import { useGetClientsQuery } from "features/clients/client-slice";
import { selectIsMoving, setIsMoving } from "features/calendar/calendar-slice";

export const AppointmentDrawer = () => {
  const dispatch = useDispatch();
  const isAppointmentDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  const isMoving = useSelector(selectIsMoving);

  const data = useSelector(selectAppointmentData);
  const handleHide = () => {
    dispatch(setAppointmentDrawerVisibility(false));
    dispatch(setIsMoving(false));
    dispatch(setAppointmentData(DEFAULT_APPOINTMENT));
  };
  const { isFetching: areExpertsFetching } = useGetExpertsQuery(undefined, { skip: !isAppointmentDrawerVisible });
  const { isFetching: areServicesFetching } = useGetServicesQuery(undefined, { skip: !isAppointmentDrawerVisible });
  const { isFetching: areClientsFetching } = useGetClientsQuery(undefined, { skip: !isAppointmentDrawerVisible });

  const [create, { isLoading: isCreating }] = useCreateAppointmentMutation();
  const [update, { isLoading: isUpdating }] = useUpdateAppointmentMutation();
  const [remove, { isLoading: isDeleting }] = useDeleteAppointmentMutation();

  const isProcessing = isCreating || isUpdating || isDeleting;

  const formattedData: FormattedAppointment = { ...data, start: new Date(data.startTime) };
  const areFetching = areExpertsFetching || areClientsFetching || areServicesFetching;

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

  const handleDelete = async () => {
    try {
      await remove(data).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: FormattedAppointment) => {
    const item: Appointment = { ...data, ...formData, startTime: formData.start.toISOString() };
    item?.id ? handleUpdate(item) : handleAdd(item);
    dispatch(setAppointmentData(DEFAULT_APPOINTMENT));
  };

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      {areFetching ? (
        <div>Loading...</div>
      ) : (
        <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={formattedData} isProcessing={isProcessing} isEnabled={isMoving} onDelete={handleDelete} />
      )}
    </BaseDrawer>
  );
};
