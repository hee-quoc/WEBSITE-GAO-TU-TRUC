
"use client";
import React, { useState} from "react";
// import { AddProductCard } from "./AddProductCard";
// import { ImageCard } from  "./utils/ImageCard";
import { TextCard} from  "../utils/TextCard";
// import { ArrayCardInput } from  "./utils/ArrayCardInput";
// import {Dropdown, MultiSelectDropdown} from "./utils/DropDownCard"
// import {  X } from "lucide-react";
import {type ImageType, type ProductForm} from "../utils/types";
import { api } from "~/trpc/react";
import {ProductImageSection} from "./components/ProductImage"
import {ProductInfoSection} from "./components/ProductInfo";
import {CertificateSection, ProductCertImageSection} from "./components/ProductCertificate";
import {GuideSection} from "./components/ProductGuide";
import {CookingSection} from "./components/ProductCooking";
import { useProductFormHandlers } from "./utils/useProductFormHandlers";
import { productFormSchema } from "~/shared/product-schema";
// import { t } from "node_modules/framer-motion/dist/types.d-D0HXPxHm";


export function AddProductPage(){
    const initialFormState = {
		title: "",
		productImages: [{ file: null, preview: null, width: undefined, height: undefined }] as ImageType[],
        tag:[],
		description: "",
		price: "",
		detail: "",
		properties: [0,0,0,0],
		guide: { water: ["","",""], rice: ["","",""], finger: ["","",""], step: ["","","",""] },
		package: "",
		parts: "",
		ingredients: "",
		grow: "",
		cooking: {step:[],description:""},
		wrapProcess: "",
		certificates: [{name:"",image:{ file: null, preview: null, width: undefined, height: undefined },description:""}],
        productCertImages: [{ file: null, preview: null, width: undefined, height: undefined }] as ImageType[],
	}
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [onSave,setSave] = useState<boolean>(false)
	const [form, setForm] = useState<ProductForm>(initialFormState);
    const scoreOptions= [
        {label:"0",value:"0"},
        {label:"1",value:"1"},
        {label:"2",value:"2"},
        {label:"3",value:"3"},
        {label:"4",value:"4"},
        {label:"5",value:"5"}
    ]
    const riceTypeOptions = [
        {label:"Gạo đặc sản",value:"gao-dac-san"},
        {label:"Gạo thông dụng",value:"gao-thong-dung"},
        {label:"Gạo nguyên liệu",value:"gao-nguyen-lieu"},
        {label:"Phụ phẩm",value:"phu-pham"},
        
    ]


    // // 1. Handler cho field primitive (string, number, ...)
    // const handleFieldChange = (key: keyof ProductForm, value: string | number | string[] | number[] | Image |(Image)[] ) => {
    //     setForm(prev => ({
    //         ...prev,
    //         [key]: value,
    //     }));
    // };

    // 2. Handler cho field là array primitive (ví dụ: properties)
    // const handleArrayFieldChange = (key: keyof ProductForm,  value:  string | number , index: number) => {
    //     setForm(prev => {
    //         const arr = Array.isArray(prev[key]) ? [...(prev[key] as string[] | number[])] : [];
    //         arr[index] = value;
    //         return { ...prev, [key]: arr };
    //     });
    // };

    // // 3. Handler cho object lồng (ví dụ: guide.water, guide.step, ...)
    // const handleNestedArrayFieldChange = (
    //     section: keyof ProductForm,
    //     field: string,
    //     index: number,
    //     value: string | number
    // ) => {
    //     setForm(prev => {
    //         const sectionValue = { ...(prev[section] as  Record<string, unknown>) };
    //         const arr = Array.isArray(sectionValue[field] as Array<number>| Array<string>) ? [...sectionValue[field] as Array<number>| Array<string>] : [];
    //         arr[index] = value;
    //         return {
    //             ...prev,
    //             [section]: { ...sectionValue, [field]: arr },
    //         };
    //     });
    // };

    // // 4. Handler cho object lồng (field không phải array, ví dụ: guide.description)
    // const handleNestedFieldChange = (
    //     section: keyof ProductForm,
    //     field: string,
    //     value: string | number
    // ) => {
    //     setForm(prev => ({
    //         ...prev,
    //         [section]: { ...(prev[section] as  Record<string, unknown>), [field]: value },
    //     }));
    // };

    // // 5. Handler cho array object (ví dụ: certificate)
    // const handleArrayObjectFieldChange = (
    //     section: keyof ProductForm,
    //     field: string,
    //     index: number,
    //     value: string
    // ) => {
    //     setForm(prev => {
    //         const arr = Array.isArray(prev[section]) ? [...(prev[section] as Record<string, unknown>[])] : [];
    //         arr[index] = { ...arr[index], [field]: value };
    //         return { ...prev, [section]: arr };
    //     });
    // };

    // // 6. Handler cho image upload (array image hoặc object image trong array)
    // const handleImageFileChange = (
    //     section: keyof ProductForm,
    //     index: number,
    //     file: File | null,
    //     subField?: string
    // ) => {
    //     setForm(prev => {
    //         const arr = Array.isArray(prev[section]) ? [...(prev[section] as Record<string, unknown>[])] : [];
    //         if (subField) {
    //             // object image trong array object (vd: certificate.image)
    //             arr[index] = {
    //                 ...arr[index],
    //                 [subField]: {
    //                     ...(arr[index]?.[subField] ?? {}),
    //                     file,
    //                     preview: file ? URL.createObjectURL(file) : null,
    //                 },
    //             };
    //         } else {
    //             // array image trực tiếp (vd: productImage)
    //             arr[index] = {
    //                 ...arr[index],
    //                 file,
    //                 preview: file ? URL.createObjectURL(file) : null,
    //             };
    //         }
    //         return { ...prev, [section]: arr };
    //     });
    // };

    const {
        handleFieldChange,
        handleArrayFieldChange,
        handleNestedArrayFieldChange,
        handleNestedFieldChange,
        handleArrayObjectFieldChange,
        handleImageFileChange,
        } = useProductFormHandlers(setForm);



    const createProduct = api.product.create.useMutation();

    async function uploadFileToS3(url:string, file:File){
        await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
    }
    const createPresignedUrl = api.s3.createPresignedUrl.useMutation();

    const handleSubmit = async () => {
        try {
        setSave(true)
        // function notEmpty<T>(value: T | null | undefined): value is T {
        //     return value != null;
        //     }
         // 1. Lấy danh sách tất cả file cần upload theo thứ tự:
        const productImageFiles = form.productImages.filter(p => p.file).map(p => p.file!);
        const productCertImageFiles = form.productCertImages.filter(p => p.file).map(p => p.file!);
        const certificateImageFiles = form.certificates
        .filter((c): c is typeof c & { image: { file: File } } => !!c.image?.file)
        .map(c => c.image.file);

       

        const allFiles = [...productImageFiles, ...productCertImageFiles, ...certificateImageFiles];

        // 2. Lấy presigned URLs cho tất cả file
        const presignedResults = await Promise.all(
        allFiles.map(file =>
            createPresignedUrl.mutateAsync({
            fileName: file.name,
            fileType: file.type,
            })
        )
        );

        // 3. Upload file lên S3 theo thứ tự
        await Promise.all(
            presignedResults.map((res, i) => uploadFileToS3(res.url, allFiles[i]!))
        );

        

        // 4. Map lại key tương ứng theo từng phần
        let index = 0;

        //const details = `<p>${form.detail.replace(/\n/g,"<br />")}</p>`

       const productImageUrls = form.productImages
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string"); // loại bỏ undefined

        const productCertImageUrls = form.productCertImages
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string");

        const filteredCertificates = form.certificates
        .filter(
            (c) =>
            c.name?.trim() !== "" ||
            c.description?.trim() !== "" ||
            (c.image?.file)
        );

        const certificateImagesUrls = filteredCertificates
        .filter(c => c.image?.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string");

        const water = form.guide.water.map((w)=>{return Number(w)})
        // 5. Tạo payload gửi server (gán url/key cho certificate)
       
        const payload = {
        ...form,
        guide: {
            ...form.guide,
            water: water
        },
        detail: form.detail,
        productImages: productImageUrls,
        productCertImages: productCertImageUrls,
        certificates: filteredCertificates.map((c, i) => ({
            name: c.name,
            description: c.description,
            image: certificateImagesUrls[i] ?? null,
        })),
        };
        const validationResult = productFormSchema.safeParse(payload);

        if (!validationResult.success) {
            // If validation fails, format the error messages and show the popup
            const errorMessages = validationResult.error.issues.map(issue => issue.message);
            
            setPopup({
                show: true,
                message: errorMessages.join("\n"), // Join messages with a newline
                type: "error"
            });
            
            // Hide the popup after 5 seconds
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "success" });
            }, 5000);
            setSave(false);
            return; // Stop the submission process
        }
        const response = await createProduct.mutateAsync({ form: payload });

        if (response.success) {
            setPopup({ show: true, message: "Lưu sản phẩm thành công", type: "success" });
            setSave(false);
            // Delay 5 giây sau đó reset form và refresh page
            setTimeout(() => {
                setForm(initialFormState); // reset form
                window.location.reload(); // refresh trang
            }, 5000);
        } else {
            setPopup({ show: true, message: "Có lỗi khi thêm sản phẩm!", type: "error" });
            setTimeout(() => {
               setPopup({ show: false, message: "", type: "success" });
               setSave(false);
            }, 3000);
        }

    } catch (error) {
        console.error(error);
    }
    };

    const handleRemoveImage = (section: keyof ProductForm, index: number | undefined) => {
            setForm((prev) => {
                const currentImages = prev[section] as ImageType[];
                return {
                ...prev,
                [section]: currentImages.filter((_, i) => i !== index),
                };
            });
        };

	return(
    <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1440px]  pt-8 md:w-[1080px]">
            <div className="mx-auto max-w-5xl px-4 py-6">
            <h1 className="text-[56px] font-semibold">Thêm sản phẩm</h1>
            </div>
            <ProductInfoSection
                form={form}
                riceTypeOptions={riceTypeOptions}
                scoreOptions={scoreOptions}
                onChange={handleFieldChange}
                onArrayChange={handleArrayFieldChange}
                setForm={setForm}
                />
            <ProductImageSection
                images={form.productImages}
                onAdd={() =>
                handleFieldChange("productImages", [
                    ...form.productImages,
                    { file: null, preview: null, width: undefined, height: undefined },
                ])
                }
                onSetImageFile={(idx, file) => handleImageFileChange("productImages",idx, file)}
                onRemove={(idx) => handleRemoveImage("productImages", idx)}
            />
             {
                !form.tag.includes("phu-pham")&&(
                    <>
                        <GuideSection
                            guide={form.guide}
                            handleNestedChange={handleNestedArrayFieldChange}
                            />
                        <div className="w-full mb-5">
                            <div className="text-[20px] font-bold w-full px-4">Quy cách đóng gói</div>
                            <TextCard
                                field="package"
                                value={form.package}
                                title=""
                                onUpdateField={(field, value) => handleFieldChange(field, value)}
                                />
                        </div>
                        <div className="w-full mb-5">
                            <div className="text-[20px] font-bold w-full px-4">Thành phần</div>
                            <TextCard
                                field="parts"
                                value={form.parts}
                                title=""
                                onUpdateField={(field, value) => handleFieldChange(field, value)}
                                />
                        </div>
                        <div className="w-full mb-5">
                            <div className="text-[20px] font-bold w-full px-4">Vùng ngyên liệu</div>
                            <TextCard
                                field="ingredients"
                                value={form.ingredients}
                                title=""
                                onUpdateField={(field, value) => handleFieldChange(field, value)}
                                />
                        </div>
                        <div className="w-full mb-5">
                            <div className="text-[20px] font-bold w-full px-4">Quy trình canh tác</div>
                            <div className="mb-2 text-sm text-gray-600 px-4">Mô tả cách quy trình canh tác</div>
                                <TextCard
                                field="grow"
                                value={form.grow}
                                title=""
                                isArea={true}
                                onUpdateField={(field, value) => handleFieldChange(field, value)}
                                />
                        </div>
                        <CookingSection
                            cooking={form.cooking}
                            showStep={form.tag.includes("gao-dac-san")}
                            setForm={setForm}
                            handleNestedArrayFieldChange={handleNestedArrayFieldChange}
                            handleNestedFieldChange={handleNestedFieldChange}
                            />
                        <div className="w-full mb-5">
                            <div className="text-[20px] font-bold w-full px-4">Quy trình đóng gói</div>
                            <TextCard
                                field="wrapProcess"
                                value={form.wrapProcess}
                                title=""
                                isArea={true}
                                onUpdateField={(field, value) => handleFieldChange(field, value)}
                                />
                        </div>
                        {/* <ProductCertImageSection
                            images={form.productCertImages}
                            onAdd={() =>
                                handleFieldChange("productCertImages", [
                                ...form.productCertImages,
                                { file: null, preview: null, width: undefined, height: undefined },
                                ])
                            }
                            onSetImageFile={(idx, file) => handleImageFileChange("productCertImages", idx, file)}
                            onRemove={(idx) => handleRemoveImage("productCertImages", idx)}
                            /> */}
                        <CertificateSection
                            certificates={form.certificates}
                            setForm={setForm}
                            setImageFile={(idx, file, field, subField) => handleImageFileChange(field, idx!, file!, subField)}
                            handleArrayObjectFieldChange={handleArrayObjectFieldChange}
                            onRemove={(idx) => handleRemoveImage("productImages", idx)}
                            />
                    </>
                )
             }
            
            <div className="w-full flex justify-center mt-10">
                <button
                type="button"
                onClick={handleSubmit}
                disabled={onSave || popup.show}
                className="flex flex-row rounded-lg bg-green-600 text-white px-6 py-3 text-lg font-semibold shadow hover:bg-green-700 disabled:opacity-50"
                >
                {onSave && (
                <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                )}
                {onSave ? "Đang lưu..." : "Lưu sản phẩm"} 
                {/* {(popup.show) && (popup.type == "success") &&( "Lưu thành công") } */}
                </button>
            </div>
            {/* Popup thông báo */}
           
        </div>
         {popup.show && (
                <div
                    className={`fixed top-20 right-20 max-w-sm w-full flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-black transition-all duration-500 transform ${
                        popup.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                    >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        {popup.type === "success" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        )}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <p className="font-semibold text-sm">
                        {popup.type === "success" ? "Thành công" : "Lỗi"}
                        </p>
                        <p className="text-sm opacity-90">{popup.message || "Lưu thành công"}</p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={() => setPopup({ ...popup, message: "" })}
                        className="text-white opacity-70 hover:opacity-100"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
             )} 
       </div>
       
	)
}