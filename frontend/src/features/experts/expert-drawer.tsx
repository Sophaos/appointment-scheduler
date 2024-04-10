import { BaseDrawer } from "shared/ui/base-drawer";
import { useDispatch, useSelector } from "react-redux";
import { selectIsExpertDrawerVisible, setExpertDrawerVisibility } from "./expert-slice";

export const ExpertDrawer = () => {
  const dispatch = useDispatch();
  const isExpertDrawerVisible = useSelector(selectIsExpertDrawerVisible);
  const handleHide = () => dispatch(setExpertDrawerVisibility(false));

  return (
    <BaseDrawer isOpen={isExpertDrawerVisible} title="Expert" onHide={handleHide}>
      <div>Expert Content</div>
    </BaseDrawer>
  );
};
