import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsClientDrawerVisible, setClientDrawerVisibility } from "./client-slice";

export const ClientDrawer = () => {
  const dispatch = useDispatch();
  const isClientDrawerVisible = useSelector(selectIsClientDrawerVisible);
  const handleHide = () => dispatch(setClientDrawerVisibility(false));

  return (
    <BaseDrawer isOpen={isClientDrawerVisible} title="Client" onHide={handleHide}>
      <div>Client Content</div>
    </BaseDrawer>
  );
};
