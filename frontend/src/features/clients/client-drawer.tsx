import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsClientDrawerVisible, setClientDrawerVisibility, useCreateClientMutation, useDeleteClientMutation, useUpdateClientMutation } from "./client-slice";
import { ClientForm } from "./client-form";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";
import { Client } from "./client";

export const ClientDrawer = ({ data }: EntityDrawerProps<Client>) => {
  const dispatch = useDispatch();
  const isClientDrawerVisible = useSelector(selectIsClientDrawerVisible);
  const handleHide = () => dispatch(setClientDrawerVisibility(false));

  const [create, { isLoading: isCreating }] = useCreateClientMutation();
  const [update, { isLoading: isUpdating }] = useUpdateClientMutation();
  const [remove, { isLoading: isDeleting }] = useDeleteClientMutation();

  const isProcessing = isCreating || isUpdating || isDeleting;

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

  const handleDelete = async () => {
    try {
      await remove(data).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: Client) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isClientDrawerVisible} title="Client" onHide={handleHide} icon={"pi pi-user-plus"}>
      <ClientForm onCancel={handleHide} onConfirm={handleConfirm} data={data} isProcessing={isProcessing} onDelete={handleDelete} />
    </BaseDrawer>
  );
};
