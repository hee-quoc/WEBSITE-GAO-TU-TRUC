import { type Image, type ProductForm, } from "../AddProductPage";

export interface BaseFieldProps {
  title?: string;
  value?: string | string[] | number | Image | unknown[] | undefined;
  index?: number | null;
  disabled?: boolean;
  error?: string;
}

export interface ImageUploadFieldProps extends BaseFieldProps {
  field:  keyof ProductForm;
  subField:   keyof ProductForm[keyof ProductForm] | string;
  type: 'image' | 'logo';
  onSetImageFile: (index: number | null, f: File | null ,field: keyof ProductForm, subField: keyof ProductForm[keyof ProductForm] | string) => void;
  form: ProductForm
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>
}

export interface TextFieldProps extends BaseFieldProps {
  field: string | number | Image | unknown[];
  onUpdateField?: (field: keyof ProductForm, value: string) => void;
}
 

export interface NumberArrayFieldProps extends BaseFieldProps {
  field: string | number | Image | unknown[];
  section: string
  onChange: (section: keyof ProductForm, field?: string, index?: number, value?: number|string) => void;
}


export interface TextCardObjectProps extends BaseFieldProps {
  field: string | number | Image | unknown[];
  section: string
  onChange: (section: keyof ProductForm, field?: string, index?: number, value?: number|string) => void;
}


export interface TextAreaFieldProps extends BaseFieldProps {
  field: string | number | Image | unknown[];
  onUpdateField?: (field: keyof ProductForm, value: string) => void;
}

interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps extends BaseFieldProps {
  field: string | number | Image | unknown[];
  options: DropdownOption[];
  onChange: (field: keyof ProductForm,  value: string | number , index?:number ) => void;
  disabled?: boolean;
  placeholder?: string;
}

export interface MultiSelectDropdownProps extends BaseFieldProps {
  field: keyof ProductForm;
  options: DropdownOption[];
  value: string[] ;
  // onChange: (field: keyof ProductForm, value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>
}