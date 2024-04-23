import { setAppointmentDrawerVisibility } from "features/appointments/appointment-slice";
import { setClientDrawerVisibility } from "features/clients/client-slice";
import { setExpertDrawerVisibility } from "features/experts/expert-slice";
import { setServiceDrawerVisibility } from "features/services/service-slice";
import { SplitButton } from "primereact/splitbutton";
import { useDispatch } from "react-redux";

export const AddButton = () => {
  const dispatch = useDispatch();
  const openAppointmentDrawer = () => dispatch(setAppointmentDrawerVisibility(true));
  const openClientDrawer = () => dispatch(setClientDrawerVisibility(true));
  const openServiceDrawer = () => dispatch(setServiceDrawerVisibility(true));
  const openExpertDrawer = () => dispatch(setExpertDrawerVisibility(true));

  const items = [
    {
      label: "Add Client",
      icon: "pi pi-user-plus",
      command: () => {
        openClientDrawer();
      },
    },
    {
      label: "Add Expert",
      icon: "pi pi-graduation-cap",
      command: () => {
        openExpertDrawer();
      },
    },
    {
      label: "Add Service",
      icon: "pi pi-palette",
      command: () => {
        openServiceDrawer();
      },
    },
  ];
  return <SplitButton size="small" label="Add New" icon="pi pi-plus" onClick={openAppointmentDrawer} model={items} />;
};
