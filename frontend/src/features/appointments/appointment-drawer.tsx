import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectAppointmentData, selectIsAppointmentDrawerVisible, setAppointmentDrawerVisibility, useCreateAppointmentMutation, useUpdateAppointmentMutation } from "./appointment-slice";
import { AppointmentForm } from "./appointment-form";
import { Appointment, FormattedAppointment } from "./appointment";
import { useGetExpertsQuery } from "features/experts/expert-slice";
import { useGetServicesQuery } from "features/services/service-slice";
import { useGetClientsQuery } from "features/clients/client-slice";

export const AppointmentDrawer = () => {
  const dispatch = useDispatch();
  const isAppointmentDrawerVisible = useSelector(selectIsAppointmentDrawerVisible);
  const data = useSelector(selectAppointmentData);
  const handleHide = () => dispatch(setAppointmentDrawerVisibility(false));
  const { isFetching: areExpertsFetching } = useGetExpertsQuery(undefined, { skip: !isAppointmentDrawerVisible });
  const { isFetching: areServicesFetching } = useGetServicesQuery(undefined, { skip: !isAppointmentDrawerVisible });
  const { isFetching: areClientsFetching } = useGetClientsQuery(undefined, { skip: !isAppointmentDrawerVisible });

  const [create, { isLoading: isCreating }] = useCreateAppointmentMutation();
  const [update, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

  const formattedData: FormattedAppointment = { ...data, start: new Date(data.startTime), end: new Date(data.endTime) };
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

  const handleConfirm = (formData: FormattedAppointment) => {
    const item: Appointment = { ...data, ...formData, startTime: formData.start.toISOString(), endTime: formData.end.toISOString() };
    console.log(item);
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isAppointmentDrawerVisible} title="Appointment" onHide={handleHide}>
      {areFetching ? <div>Loading...</div> : <AppointmentForm onCancel={handleHide} onConfirm={handleConfirm} data={formattedData} isProcessing={isCreating || isUpdating} />}
    </BaseDrawer>
  );
};
