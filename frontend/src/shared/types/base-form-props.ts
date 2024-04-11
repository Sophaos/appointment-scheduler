export interface BaseFormProps<T> {
  onCancel: () => void;
  onConfirm: (data: T) => void;
  data?: T;
  isProcessing: boolean;
}
