import { Sidebar } from "primereact/sidebar";

export const BaseDrawer = ({ isOpen, title, onHide, children }: {isOpen: boolean, title: string, onHide: () => void, children: JSX.Element}) => {
  return (
    <div>
      <Sidebar visible={isOpen} position="right"  onHide={onHide}>
        <div>
          <div>
            <div id="modal-modal-title">
              {title}
            </div>
          </div>
          <div>{children}</div>
        </div>
      </Sidebar>
    </div>
  );
};
