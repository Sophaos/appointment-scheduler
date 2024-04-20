import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsClientDrawerVisible, setClientDrawerVisibility, useCreateClientMutation, useUpdateClientMutation } from "./client-slice";
import { ClientForm } from "./client-form";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";
import { Client } from "./client";

export const ClientDrawer = ({ data }: EntityDrawerProps<Client>) => {
  const dispatch = useDispatch();
  const isClientDrawerVisible = useSelector(selectIsClientDrawerVisible);
  const handleHide = () => dispatch(setClientDrawerVisibility(false));

  const [create, { isLoading: isCreating }] = useCreateClientMutation();
  const [update, { isLoading: isUpdating }] = useUpdateClientMutation();

  const handleUpdate = async (item: Client) => {
    try {
      await update(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Client) => {
    try {
      await create(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormConfirm = (formData: Client) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isClientDrawerVisible} title="Client" onHide={handleHide} icon={"pi pi-user-plus"}>
      <ClientForm onCancel={handleHide} onConfirm={handleFormConfirm} data={undefined} isProcessing={isCreating || isUpdating} />
    </BaseDrawer>
  );
};
