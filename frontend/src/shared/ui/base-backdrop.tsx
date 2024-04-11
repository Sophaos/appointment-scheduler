
import { ProgressSpinner } from 'primereact/progressspinner';
export const BaseBackdrop = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
        display: "flex",
      }}
    >
      <div style={{ width: "100%" }}>
        <div className="d-flex align-items-center justify-content-center" style={{ width: "100%", height: "100%" }}>
          <ProgressSpinner/>
        </div>
      </div>
    </div>
  );
};
