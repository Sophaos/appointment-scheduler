import { Sidebar } from "primereact/sidebar";

export interface BaseDrawerProps {
  isOpen: boolean,
  title: string,
  width?: number
  onHide: () => void,
  children: JSX.Element
}
export const BaseDrawer = ({ isOpen, title, onHide, children, width = 400 }: BaseDrawerProps) => {
  return (
    <div>
      <Sidebar visible={isOpen} position="right"  onHide={onHide} style={{width: `${width}px`}}>
        <div className="h-full overflow-y-hidden">
          <div>
            <div id="modal-modal-title">
              {title}
            </div>
          </div>
          <div className="h-full overflow-y-hidden">{children}</div>
        </div>
      </Sidebar>
    </div>
  );
};
