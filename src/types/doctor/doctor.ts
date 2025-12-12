export type Doctor = {
  idDoctor: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  specialization: string;
  isActive: boolean;
};

export type DoctorTableData = {
  doctorsData: Doctor[];
  isLoading: boolean;
  updateDoctor?: (values: DoctorModalValues) => Promise<void>;
  deleteDoctor?: (id: number) => Promise<void>;
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
  specializationId: number;
  isActive: boolean;
}
