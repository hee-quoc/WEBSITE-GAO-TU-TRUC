
"use client";
import React, { useState} from "react";
// import { AddProductCard } from "./AddProductCard";
// import { ImageCard } from  "./utils/ImageCard";
import { TextCard, TextCardObject } from  "../utils/TextCard";
// import { ArrayCardInput } from  "./utils/ArrayCardInput";
// import {Dropdown, MultiSelectDropdown} from "./utils/DropDownCard"
// import {  X } from "lucide-react";
import {type Image, type ProductForm} from "../utils/types";
import { api } from "~/trpc/react";
import {ProductImageSection} from "./components/ProductImage"
import {ProductInfoSection} from "./components/ProductInfo";
import {CertificateSection, ProductCertImageSection} from "./components/ProductCertificate";
import {GuideSection} from "./components/ProductGuide";
import {CookingSection} from "./components/ProductCooking";
// import { t } from "node_modules/framer-motion/dist/types.d-D0HXPxHm";


export function AddProductPage(){
    const initialFormState = {
		title: "",
		productImage: [{ file: null, preview: null, width: undefined, height: undefined }] as Image[],
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
		certificate: [{name:"",image:{ file: null, preview: null, width: undefined, height: undefined },description:""}],
        productCertImage: [{ file: null, preview: null, width: undefined, height: undefined }] as Image[],
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
        {label:"Gạo ăn",value:"gao-an"},
        {label:"Gạo thông dụng",value:"gao-thong-dung"},
        {label:"Gạo nguyên liệu",value:"gao-nguyen-lieu"},
        {label:"Phụ phẩm",value:"phu-pham"},
        
    ]


    // 1. Handler cho field primitive (string, number, ...)
    const handleFieldChange = (key: keyof ProductForm, value: any) => {
        setForm(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    // 2. Handler cho field là array primitive (ví dụ: properties)
    const handleArrayFieldChange = (key: keyof ProductForm, index: number, value: any) => {
        setForm(prev => {
            const arr = Array.isArray(prev[key]) ? [...(prev[key] as any[])] : [];
            arr[index] = value;
            return { ...prev, [key]: arr };
        });
    };

    // 3. Handler cho object lồng (ví dụ: guide.water, guide.step, ...)
    const handleNestedArrayFieldChange = (
        section: keyof ProductForm,
        field: string,
        index: number,
        value: any
    ) => {
        setForm(prev => {
            const sectionValue = { ...(prev[section] as any) };
            const arr = Array.isArray(sectionValue[field]) ? [...sectionValue[field]] : [];
            arr[index] = value;
            return {
                ...prev,
                [section]: { ...sectionValue, [field]: arr },
            };
        });
    };

    // 4. Handler cho object lồng (field không phải array, ví dụ: guide.description)
    const handleNestedFieldChange = (
        section: keyof ProductForm,
        field: string,
        value: any
    ) => {
        setForm(prev => ({
            ...prev,
            [section]: { ...(prev[section] as any), [field]: value },
        }));
    };

    // 5. Handler cho array object (ví dụ: certificate)
    const handleArrayObjectFieldChange = (
        section: keyof ProductForm,
        field: string,
        index: number,
        value: any
    ) => {
        setForm(prev => {
            const arr = Array.isArray(prev[section]) ? [...(prev[section] as any[])] : [];
            arr[index] = { ...arr[index], [field]: value };
            return { ...prev, [section]: arr };
        });
    };

    // 6. Handler cho image upload (array image hoặc object image trong array)
    const handleImageFileChange = (
        section: keyof ProductForm,
        index: number,
        file: File | null,
        subField?: string
    ) => {
        setForm(prev => {
            const arr = Array.isArray(prev[section]) ? [...(prev[section] as any[])] : [];
            if (subField) {
                // object image trong array object (vd: certificate.image)
                arr[index] = {
                    ...arr[index],
                    [subField]: {
                        ...arr[index][subField],
                        file,
                        preview: file ? URL.createObjectURL(file) : null,
                    },
                };
            } else {
                // array image trực tiếp (vd: productImage)
                arr[index] = {
                    ...arr[index],
                    file,
                    preview: file ? URL.createObjectURL(file) : null,
                };
            }
            return { ...prev, [section]: arr };
        });
    };



    const createProduct = api.product.create.useMutation();

    async function uploadFileToS3(url:string, file:File){
        const uploadResponse = await fetch(url, {
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
         // 1. Lấy danh sách tất cả file cần upload theo thứ tự:
        const productImageFiles = form.productImage.filter(p => p.file).map(p => p.file!);
        const productCertImageFiles = form.productCertImage.filter(p => p.file).map(p => p.file!);
        const certificateImageFiles = form.certificate
        .filter(c => c.image?.file)
        .map(c => c.image!.file!);

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
        presignedResults.map((res, i) => uploadFileToS3(res.url, allFiles[i] as File))
        );

        

        // 4. Map lại key tương ứng theo từng phần
        let index = 0;

        const details = `<p>${form.detail.replace("\n","<br />")}</p>`

       const productImageUrls = form.productImage
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string"); // loại bỏ undefined

        const productCertImageUrls = form.productCertImage
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string");

        const filteredCertificates = form.certificate
        .filter(
            (c) =>
            c.name?.trim() !== "" ||
            c.description?.trim() !== "" ||
            (c.image && c.image.file)
        );

        const certificateImagesUrls = filteredCertificates
        .filter(c => c.image?.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string");

     
        // 5. Tạo payload gửi server (gán url/key cho certificate)
       
        const payload = {
        ...form,
        detail: details,
        productImage: productImageUrls,       
        productCertImage: productCertImageUrls, 
        certificate: filteredCertificates.map((c, i) => ({
            name: c.name,
            description: c.description,
            image: certificateImagesUrls[i] ?? null,
        })),
        };

        const response = await createProduct.mutateAsync({ form: payload });

        if (response.success) {
            setPopup({ show: true, message: "Lưu sản phẩm thành công", type: "success" });
            // Delay 5 giây sau đó reset form và refresh page
            setTimeout(() => {
                setForm(initialFormState); // reset form
                window.location.reload(); // refresh trang
            }, 5000);
        } else {
            setPopup({ show: true, message: "Có lỗi khi thêm sản phẩm!", type: "error" });
        }

    } catch (error) {
        console.error(error);
    }
    };



	return(
    <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1440px]  pt-8">
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
                images={form.productImage}
                onAdd={() =>
                handleFieldChange("productImage", [
                    ...form.productImage,
                    { file: null, preview: null, width: undefined, height: undefined },
                ])
                }
                onSetImageFile={(idx, file) => handleImageFileChange("productImage",idx, file)}
            />
             <CertificateSection
                certificates={form.certificate}
                setForm={setForm}
                setImageFile={(idx, file, field, subField) => handleImageFileChange(field, idx as number, file ?? null, subField)}
                handleArrayObjectFieldChange={handleArrayObjectFieldChange}
                />
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
                showStep={form.tag.includes("gao-an")}
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
            <ProductCertImageSection
                images={form.productCertImage}
                onAdd={() =>
                    handleFieldChange("productCertImage", [
                    ...form.productCertImage,
                    { file: null, preview: null, width: undefined, height: undefined },
                    ])
                }
                onSetImageFile={(idx, file) => handleImageFileChange("productCertImage", idx, file)}
                />
            <div className="w-full flex justify-center mt-10">
                <button
                type="button"
                onClick={handleSubmit}
                // disabled={onSave}
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
                </button>
            </div>
            {/* Popup thông báo */}
           
        </div>
         {popup.show && (
                <div
                className={`fixed top-[50%] right-[50%] px-6 py-3 rounded-lg shadow-lg text-white transition-opacity duration-500 ${
                    popup.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
                >
                {popup.message}
                </div>
             )}
       </div>
       
	)
}