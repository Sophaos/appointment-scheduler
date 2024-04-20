import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsExpertDrawerVisible, setExpertDrawerVisibility, useCreateExpertMutation, useUpdateExpertMutation } from "./expert-slice";
import { ExpertForm } from "./expert-form";
import { Expert } from "./expert";
import { EntityDrawerProps } from "shared/types/entity-drawer-props";

export const ExpertDrawer = ({ data }: EntityDrawerProps<Expert>) => {
  const dispatch = useDispatch();
  const isExpertDrawerVisible = useSelector(selectIsExpertDrawerVisible);
  const handleHide = () => dispatch(setExpertDrawerVisibility(false));

  const [create, { isLoading: isCreating }] = useCreateExpertMutation();
  const [update, { isLoading: isUpdating }] = useUpdateExpertMutation();

  const handleUpdate = async (item: Expert) => {
    try {
      await update(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: Expert) => {
    try {
      await create(item).unwrap();
      handleHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = (formData: Expert) => {
    const item = { ...data, ...formData };
    item?.id ? handleUpdate(item) : handleAdd(item);
  };

  return (
    <BaseDrawer isOpen={isExpertDrawerVisible} title="Expert" onHide={handleHide}>
      <ExpertForm onCancel={handleHide} onConfirm={handleConfirm} data={undefined} isProcessing={isCreating || isUpdating} />
    </BaseDrawer>
  );
};
