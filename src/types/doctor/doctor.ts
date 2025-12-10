export type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  specialisation: string;
  isActive: boolean;
};

export interface CustomModalProps {
  modalProps: {
    opened: boolean;
    onClose: () => void;
  };
  initialValues?: DoctorModalValues;
  onSubmit?: (values: DoctorModalValues) => Promise<void>;
  loading?: boolean;
}

export interface DoctorModalValues {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  specialisation: string;
  isActive: boolean;
}
