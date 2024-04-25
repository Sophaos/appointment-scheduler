import { Sidebar } from "primereact/sidebar";

export interface BaseDrawerProps {
  isOpen: boolean;
  title: string;
  width?: number;
  onHide: () => void;
  children: JSX.Element;
  icon?: string;
}
export const BaseDrawer = ({ isOpen, title, onHide, children, width = 500, icon }: BaseDrawerProps) => {
  const customHeader = (
    <div className="flex gap-5 content-center">
      {icon && (
        <div>
          <i className={icon} style={{ fontSize: "1.5rem" }}></i>
        </div>
      )}
      <div className="text-lg font-semibold">{title}</div>
    </div>
  );
  return (
    <div>
      <Sidebar header={customHeader} visible={isOpen} position="right" onHide={onHide} style={{ width: `${width}px` }}>
        <div className="h-full overflow-y-hidden">
          <div className="h-full overflow-y-hidden">{children}</div>
        </div>
      </Sidebar>
    </div>
  );
};
