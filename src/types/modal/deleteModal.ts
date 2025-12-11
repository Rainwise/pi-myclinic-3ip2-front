export interface DeleteModalProps {
  modalProps: {
    opened: boolean;
    onClose: () => void;
  };
  modalTitle?: string;
  modalDescription?: string;
  objectId?: number;
  onSubmit?: (id: number) => Promise<void>;
  loading?: boolean;
}
