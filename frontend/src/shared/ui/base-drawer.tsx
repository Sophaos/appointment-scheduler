import { Sidebar } from "primereact/sidebar";

export const BaseDrawer = ({ isOpen, title, setIsOpen, children }: {isOpen: boolean, title: string, setIsOpen: () => void, children: JSX.Element}) => {
  return (
    <div>
      <Sidebar visible={isOpen} position="right"  onHide={setIsOpen}>
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
