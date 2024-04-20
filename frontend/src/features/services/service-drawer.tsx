import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsServiceDrawerVisible, setServiceDrawerVisibility, useCreateServiceMutation, useUpdateServiceMutation } from "./service-slice";
import { ServiceForm } from "./service-form";
import { Service } from "./service";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";

export const ServiceDrawer = ({ data }: EntityDrawerProps<Service>) => {
  const dispatch = useDispatch();
  const isServiceDrawerVisible = useSelector(selectIsServiceDrawerVisible);
  const handleHide = () => dispatch(setServiceDrawerVisibility(false));

  const [create, { isLoading: isCreating }] = useCreateServiceMutation();
  const [update, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const handleUpdate = async (item: Service) => {
    try {
      await update(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Service) => {
    try {
      await create(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: Service) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isServiceDrawerVisible} title="Service" onHide={handleHide}>
      <ServiceForm onCancel={handleHide} onConfirm={handleConfirm} data={undefined} isProcessing={isCreating || isUpdating} />
    </BaseDrawer>
  );
};
