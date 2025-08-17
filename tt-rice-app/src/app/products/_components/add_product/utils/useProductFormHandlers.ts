import { useCallback } from "react";
import { type ImageType, type ProductForm } from "../../utils/types";


export function useProductFormHandlers(setForm: React.Dispatch<React.SetStateAction<ProductForm>>) {
  // 1. Handler cho field primitive (string, number, ...)

  const handleFieldChange = useCallback((key: keyof ProductForm, value: string | number | string[] | number[] | ImageType |(ImageType)[] ) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  }, [setForm]);

  // 2. Handler cho field là array primitive (ví dụ: properties)
  const handleArrayFieldChange = useCallback((key: keyof ProductForm, value:  string | number , index: number) => {
      setForm(prev => {
          const arr = Array.isArray(prev[key]) ? [...(prev[key] as string[] | number[])] : [];
          arr[index] = value;
          return { ...prev, [key]: arr };
      });
  }, [setForm]);

  // 3. Handler cho object lồng (ví dụ: guide.water, guide.step, ...)
  const handleNestedArrayFieldChange = useCallback((
    section: keyof ProductForm,
    field: string,
    index: number,
    value: string | number
  ) => {
    setForm(prev => {
      const sectionValue = { ...(prev[section] as  Record<string, unknown>) };
      const arr = Array.isArray(sectionValue[field] as Array<number>| Array<string>) ? [...sectionValue[field] as Array<number>| Array<string>] : [];
      arr[index] = value;
      return {
        ...prev,
        [section]: { ...sectionValue, [field]: arr },
      };
    });
  }, [setForm]);

  // 4. Handler cho object lồng (field không phải array, ví dụ: guide.description)
  const handleNestedFieldChange = useCallback((
    section: keyof ProductForm,
    field: string,
    value: string | number
  ) => {
    setForm(prev => ({
      ...prev,
      [section]: { ...(prev[section] as  Record<string, unknown>), [field]: value },
    }));
  }, [setForm]);

  // 5. Handler cho array object (ví dụ: certificate)
  const handleArrayObjectFieldChange = useCallback((
    section: keyof ProductForm,
    field: string,
    index: number,
    value: string
  ) => {
    setForm(prev => {
      const arr = Array.isArray(prev[section]) ? [...(prev[section] as Record<string, unknown>[])] : [];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [section]: arr };
    });
  }, [setForm]);

  // 6. Handler cho image upload (array image hoặc object image trong array)
  const handleImageFileChange = useCallback((
    section: keyof ProductForm,
    index: number,
    file: File | null,
    subField?: string
  ) => {
    setForm(prev => {
      const arr = Array.isArray(prev[section]) ? [...(prev[section] as Record<string, unknown>[])] : [];
      if (subField) {
        arr[index] = {
          ...arr[index],
          [subField]: {
            ...(arr[index]?.[subField] ?? {}),
            file,
            preview: file ? URL.createObjectURL(file) : null,
          },
        };
      } else {
        arr[index] = {
          ...arr[index],
          file,
          preview: file ? URL.createObjectURL(file) : null,
        };
      }
      return { ...prev, [section]: arr };
    });
  }, [setForm]);

  return {
    handleFieldChange,
    handleArrayFieldChange,
    handleNestedArrayFieldChange,
    handleNestedFieldChange,
    handleArrayObjectFieldChange,
    handleImageFileChange,
  };
}