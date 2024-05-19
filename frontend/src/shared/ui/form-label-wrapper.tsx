interface FormLabelWrapperProps {
  label: string;
  children: React.ReactNode;
}

export const FormLabelWrapper = ({ label, children }: FormLabelWrapperProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="start" className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
};
