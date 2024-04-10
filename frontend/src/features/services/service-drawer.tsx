import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsServiceDrawerVisible, setServiceDrawerVisibility } from "./service-slice";

export const ServiceDrawer = () => {
  const dispatch = useDispatch();
  const isServiceDrawerVisible = useSelector(selectIsServiceDrawerVisible);
  const handleHide = () => dispatch(setServiceDrawerVisibility(false));

  return (
    <BaseDrawer isOpen={isServiceDrawerVisible} title="Service" onHide={handleHide}>
      <div>Service Content</div>
    </BaseDrawer>
  );
};
