export interface BaseFormProps<T> {
  onCancel: () => void;
  onConfirm: (data: T) => void;
  isEnabled?: boolean;
  data?: T;
  isProcessing: boolean;
}
