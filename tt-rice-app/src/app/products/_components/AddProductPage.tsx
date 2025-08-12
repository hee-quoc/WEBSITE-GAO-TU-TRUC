
"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
// import { AddProductCard } from "./AddProductCard";
import { ImageCard } from  "./utils/ImageCard";
import { TextCard, TextCardObject } from  "./utils/TextCard";
import { ArrayCardInput } from  "./utils/ArrayCardInput";
import {TextAreaCard} from  "./utils/AreaCard"
import {Dropdown, MultiSelectDropdown} from "./utils/DropDownCard"
import {  X } from "lucide-react";
import { set } from "zod";
// import { api } from '../../utils/api';
import { api } from "~/trpc/react";
export type Image = {
	file?: File | null;
	preview?: string | null;
	width?: number;
	height?: number;
}

export type ProductForm = {
	title: string;
	productImage: { file?: File | null; preview?: string | null; caption?: string }[];
    tag: Array<string>; 
	description: string;
	price: string;
	detail:  string;
	properties: Array<number>;
	guide: Guide;
	package: string;
	parts: string;
	ingredients: string;
	grow: string;
	cooking: { step: Array<string> , description: string };
	wrapProcess: string;
	certificate: {name: string, image: Image ,description: string}[];
    productCertImage: { file?: File | null; preview?: string | null; caption?: string }[];
}


export type Guide = {
	water: Array<string>;
	rice: Array<string>;
	finger: Array<string>;
	step: Array<string>;
}

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
	// Hàm cập nhật từng trường
	// const handleChange = (key: keyof ProductForm , value: any) => {
	// 	setForm((prev) => ({ ...prev, [key]: value }));
	// 	console.log("Updated form:", { ...form, [key]: value });
	// };
    const handleChange = (
        key: keyof ProductForm,
        value: any,
        index?: number,
    ) => {
        setForm((prev) => {
            let updatedField = prev[key] as unknown;;

            // Nếu field là mảng và có index
            if (Array.isArray(updatedField) && index !== undefined) {
                const newArray = [...updatedField];

              
                // Nếu chỉ là mảng giá trị nguyên thủy
                newArray[index] = value;
                

                updatedField = newArray;
                console.log("2")
            } else {
                // Field là giá trị đơn hoặc object
                updatedField = value;
                console.log(updatedField)
            }
            console.log({
                ...prev,
                [key]: updatedField,
            })
            return {
                ...prev,
                [key]: updatedField,
            };
        });
        
    //    console.log(form)
    };

   

	// Hàm cập nhật mảng thuộc tính
    const handleNestedChange = (
    section: keyof ProductForm,       // ví dụ 'guide' hoặc 'wrapProcess' hoặc 'productImage'...
    field?: string,           // ví dụ 'water' | 'step' | 'description' (undefined nếu muốn thay cả section)
    index?: number,           // nếu cập nhật phần tử cụ thể trong array
    value?: any               // giá trị mới
    ) => {
    setForm(prev => {
        // shallow copy của toàn bộ form
        const next: any = { ...prev };

        // --- nếu không có field => thay cả section (ví dụ replace toàn bộ productImage)
        if (!field) {
            next[section] = value;
            return next;
        }

        // lấy giá trị hiện tại của section (có thể là object hoặc array)
        const sectionValue = (prev as any)[section];

        // nếu section là null/undefined, khởi tạo object rỗng
        if (sectionValue == null) {
        // khởi tạo tùy theo field là array hay primitive: chúng ta giả định object
        (next as any)[section] = { [field]: Array.isArray(value) ? value : value };
        return next;
        }

        // nếu field hiện tại là một array (vd: guide.water, wrapProcess.step)
        const fieldValue = (sectionValue as any)[field];

        if (Array.isArray(fieldValue)) {
        const newArr = [...fieldValue];
        if (typeof index === 'number') {
            newArr[index] = value;
        } else {
            // nếu không truyền index mà value là array => thay toàn bộ mảng
            if (Array.isArray(value)) {
            // replace whole array
            (next as any)[section] = { ...(sectionValue as any), [field]: value };
            return next;
            } else {
            // nếu không phải array và không có index => push value
            newArr.push(value);
            }
        }
        (next as any)[section] = { ...(sectionValue as any), [field]: newArr };
        return next;
        }

        // nếu field không phải array => cập nhật trực tiếp (ví dụ description)
        (next as any)[section] = { ...(sectionValue as any), [field]: value };
        return next;
    });
    console.log(form)
    };
	
    const setImageFile = <K extends keyof ProductForm>(
        indexImage: number | null,
        fileOrUndefined: File | null | undefined,
        field: K,
        subField?: keyof ProductForm[K] | string
    ) => {
        if (indexImage === null || indexImage < 0) {
            console.error("Invalid index provided to setImageFile");
            return;
        }

        setForm(prev => {
            const file = fileOrUndefined ?? null;
            const currentValue = prev[field] as unknown;

            // helper to revoke old preview and set new one
            const createPreview = (oldPreview?: string | null) => {
                if (oldPreview) URL.revokeObjectURL(oldPreview);
                return file ? URL.createObjectURL(file) : null;
            };

            // case: array of images directly (productImage, productCertImage...)
            if (Array.isArray(currentValue) && currentValue.every(item => typeof item === 'object' && 'file' in item)) {
                const updated = [...(currentValue as { file?: File | null; preview?: string | null; caption?: string }[])];
                updated[indexImage] = {
                    ...updated[indexImage],
                    file,
                    preview: createPreview(updated[indexImage]?.preview)
                };
                return {
                    ...prev,
                    [field]: updated as any
                };
            }

            // case: array of objects with subField as image (certificate.image)
            if (Array.isArray(currentValue)) {
                const updatedItems = [...(currentValue as any[])];
                if (!updatedItems[indexImage]) return prev;

                const targetItem = { ...updatedItems[indexImage] };
                if (subField && targetItem[subField]) {
                    const oldImage = targetItem[subField];
                    targetItem[subField] = {
                        ...oldImage,
                        file,
                        preview: createPreview(oldImage?.preview)
                    };
                    updatedItems[indexImage] = targetItem;

                    return {
                        ...prev,
                        [field]: updatedItems as any
                    };
                } else {
                    console.error(`Subfield ${String(subField)} not found in ${String(field)}`);
                    return prev;
                }
            }

            console.error(`Unsupported field type for ${String(field)}`);
            return prev;
        });
    };

    // Hàm cập nhật name hoặc description của một certificate theo index
    const handleFieldChange = (
        section: keyof ProductForm, // tên field cấp 1 của ProductForm
        field: string | undefined,  // tên field con (nếu có)
        index: number | undefined,  // index nếu field con là mảng
        value: any                   // giá trị mới
    ) => {
        setForm(prev => {
            const next = { ...prev } as any;
            const sectionValue = next[section];

            // Nếu section không tồn tại thì bỏ qua
            if (sectionValue === undefined) return prev;

            // Nếu là mảng ở cấp section
            if (Array.isArray(sectionValue)) {
                const newArray = [...sectionValue];
                if (typeof index === 'number' && index >= 0 && index < newArray.length) {
                    if (field) {
                        // Phần tử là object => cập nhật field con
                        newArray[index] = {
                            ...newArray[index],
                            [field]: value
                        };
                    } else {
                        // Thay trực tiếp phần tử
                        newArray[index] = value;
                    }
                }
                next[section] = newArray;
                return next;
            }

            // Nếu section là object có field là mảng
            if (field && Array.isArray(sectionValue[field])) {
                const newArray = [...sectionValue[field]];
                if (typeof index === 'number' && index >= 0 && index < newArray.length) {
                    newArray[index] = value;
                }
                next[section] = {
                    ...sectionValue,
                    [field]: newArray
                };
                return next;
            }

            // Nếu section là object thường => cập nhật trực tiếp field
            if (field) {
                next[section] = {
                    ...sectionValue,
                    [field]: value
                };
                return next;
            }

            // Nếu không có field => thay cả section
            next[section] = value;
            return next;
        });
        console.log(form)
    };

    const createProduct = api.product.create.useMutation();
    // const createProduct = trpc.product.create.useMutation({
    //     onSuccess: () => {
    //     alert("Thêm sản phẩm thành công!");
    //     utils.product.list.invalidate();
    //     },
    //     onError: (err) => {
    //     console.error(err);
    //     alert("Có lỗi khi thêm sản phẩm!");
    //     },
    // });


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
        // const processedForm = await convertImagesInForm(form);
        // console.log(processedForm)
        // // Debug kiểm tra file trước khi gửi
        // // console.log(processedForm.productImage[0]?.file instanceof File); // true
        // // console.log(form.productCertImage[0]?.file instanceof File); // true
        // await createProduct.mutateAsync({form:processedForm});
         // 1. Lấy danh sách tất cả file cần upload theo thứ tự:
    // productImage, productCertImage, certificate images
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
        console.log(presignedResults)

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
        console.log(payload)

        // const response = await createProduct.mutateAsync({ form: payload });

        // if (response.success) {
        //     setPopup({ show: true, message: "Lưu sản phẩm thành công", type: "success" });
        //     // Delay 5 giây sau đó reset form và refresh page
        //     setTimeout(() => {
        //         setForm(initialFormState); // reset form
        //         window.location.reload(); // refresh trang
        //     }, 5000);
        // // Có thể redirect tới trang chi tiết sản phẩm
        // // router.push(`/product/${response.slug}`);
        // } else {
        //     setPopup({ show: true, message: "Có lỗi khi thêm sản phẩm!", type: "error" });
        // }

    } catch (error) {
        console.error(error);
    }
    };



	return(
    <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1440px] items-center pt-8">
            <div className="mx-auto max-w-5xl px-4 py-6">
            <h1 className="text-[56px] font-semibold">Thêm sản phẩm</h1>
            </div>
            <div className="flex flex-row w-full ">
                <div className="w-2/3">
                    <div className="text-[20px] font-bold w-full px-4">Tên sản phẩm</div>
                    <TextCard
                        field="title"
                        value={form.title}
                        title=""
                        onUpdateField={(field, value) => handleChange(field, value)}
                        />
                </div>
                <div className="px-12">
                    <div className="text-[20px] font-bold w-full px-4">Loại gạo</div>
                    {/* <Dropdown
                        field="tag"
                        options = {riceTypeOptions}
                        value={form.tag}
                        index={null}
                        onChange={(field, value) => handleChange(field, value)}
                    /> */}
                    <MultiSelectDropdown
                        field="tag"
                        options = {riceTypeOptions}
                        value={form.tag}
                        setForm = {setForm}
                        placeholder="Loại gạo"
                    />
                </div>
                <div className="px-4">
                    <div className="text-[20px] font-bold w-full px-4">Giá</div>
                    <TextCard
                        field="price"
                        value={form.price}
                        title=""
                        onUpdateField={(field, value) => handleChange(field, value)}
                    />
                </div>
            </div>
            <div className="w-full">
                    <div className="text-[20px] font-bold w-full px-4">Mô tả về gạo</div>
                    <TextAreaCard
                        field="description"
                        value={form.description}
                        title=""
                        onUpdateField={(field, value) => handleChange(field, value)}
                        />
            </div>
             <div className="w-full">
                    <div className="text-[20px] font-bold w-full px-4">Chi tiết sản phẩm</div>
                    <TextAreaCard
                        field="detail"
                        value={form.detail}
                        title=""
                        onUpdateField={(field, value) => handleChange(field, value)}
                        />
            </div>
            <div className="text-[20px] font-bold w-full px-4">Đặc tính sản phẩm</div>
            <div className="w-full flex justify-around rounded-2xl border border-gray-300 shadow-sm bg-white p-4 m">
                <div className="flex">
                    <div className="text-[20px] font-bold w-full px-2">Độ thơm</div>
                    <Dropdown
                        field="properties"
                        options = {scoreOptions}
                        index={0}
                        value={form.properties[0]}
                        onChange={(field, value, index?:number) => handleChange(field, Number(value), index)}
                    />
                </div>
                <div className="flex">
                    <div className="text-[20px] font-bold w-full px-2">Độ dẻo</div>
                    <Dropdown
                        field="properties"
                        options = {scoreOptions}
                        index={1}
                        value={form.properties[1]}
                        onChange={(field, value, index?:number) => handleChange(field, Number(value), index)}
                    />
                </div>
                <div className="flex">
                    <div className="text-[20px] font-bold w-full px-2">Độ mềm</div>
                    <Dropdown
                        field="properties"
                        options = {scoreOptions}
                        index={2}
                        value={form.properties[2]}
                        onChange={(field, value, index?:number) => handleChange(field, Number(value), index)}
                    />
                </div>
                <div className="flex">
                    <div className="text-[20px] font-bold w-full px-2">Độ nở</div>
                    <Dropdown
                        field="properties"
                        options = {scoreOptions}
                        index={3}
                        value={form.properties[3]}
                        onChange={(field, value, index?:number) => handleChange(field, Number(value), index)}
                    />
                </div>

            </div>
            <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh sản phẩm</div>
            <div className="w-full mt-5 flex flex-row overflow-x-auto">
            {form.productImage.map((img, idx) => (
                <div key={idx} className="flex-shrink-0">
                    <ImageCard
                        field="productImage"
                        subField= ""
                        type="image"
                        value={img}
                        index={idx}
                        onSetImageFile={<K extends keyof ProductForm>(indexImage:number | null, fileOrUndefined:File | null, field:K, subField: keyof ProductForm[K] | string) => setImageFile(indexImage, fileOrUndefined, field ,subField)}
                        setForm={setForm}
                        form={form}
                    />
                   
                </div>
            ))}
                <button
                    type="button"
                    className=" flex items-center flex-shrink-0 gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition "
                    onClick={() => handleChange('productImage', [...form.productImage, { file: null, preview: null, width: undefined, height: undefined }])}
                >
                    <span>+ Thêm ảnh sản phẩm</span>
                </button>
            </div>
            
            <div className="text-[20px] font-bold w-full px-4 mt-5">Chứng nhận quốc tế</div>
             <div className="w-full space-y-4 flex flex-row overflow-x-auto">
                    {form.certificate.map((cer, idx) => (
                        <div key={idx} className="items-center relative rounded-2xl border border-gray-300 shadow-sm bg-white p-6 m-4 shadow-sm">
                            <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh chứng nhận</div>
                            <ImageCard
                                key={idx}
                                field="certificate"
                                subField= "image"
                                type="image"
                                value={cer.image}
                                index={idx}
                                onSetImageFile={<K extends keyof ProductForm>(indexImage:number | null, fileOrUndefined:File | null, field:K, subField: keyof ProductForm[K] | string) => setImageFile(indexImage, fileOrUndefined, field ,subField)}
                                setForm={setForm}
                                form={form}
                            />
                            <div className="text-[20px] font-bold w-full px-4 mt-5">Tên chứng nhận</div>
                            <TextCardObject
                                section="certificate"
                                field= "name"
                                value={cer.name}
                                index = {idx}
                                title=""
                                onChange={(section,field,index, value) => handleFieldChange(section,field,index, value)}
                                />
                            <div className="text-[20px] font-bold w-full px-4 mt-5">Chi tiết chứng nhận</div>
                            <TextCardObject
                                section="certificate"
                                field= "description"
                                value={cer.description}
                                index = {idx}
                                title=""
                                onChange={(section,field,index, value) => handleFieldChange(section,field,index, value)}
                                />
                            <button
                                onClick={() => {
                                setForm((prev) => ({
                                    ...prev,
                                    certificate: prev.certificate.filter((_, i) => i !== idx), 
                                }));
                                }}
                                className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
                                >
                                <X className="h-4 w-4" />
                                </button>
                        </div>
                    ))}
                <div className="pb-6 pt-2">
                    <button
                        type="button"
                        className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition h-full"
                        onClick={() => handleChange('certificate', [...form.certificate, {name:"", image:{ file: null, preview: null, width: undefined, height: undefined } ,description:""}])}
                    >
                        <span>+ Thêm chứng nhận</span>
                    </button>
                </div>
             </div>
           
            <div className="flex flex-col items-center rounded-2xl border border-gray-300 shadow-sm bg-white p-6 my-4 shadow-sm w-full">
                <div className="text-[56px]">Hướng dẫn sử dụng</div>
                <div className="md:w-[1080px]">
                    <div className="text-[20px] font-bold w-full">Bước 1</div>
                        <div className=" w-full">
                            <ArrayCardInput
                                section="guide"
                                field="step"
                                value={form.guide.step[0]}
                                title=""
                                index = {0}
                                numericOnly = {false}
                                onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                />
                        </div>
                        {/* border border-gray-300 rounded-lg shadow-sm  */}
                    <div className="mt-5"> 
                        <div className="text-[20px] font-bold w-full px-4 py-4">Bước 2</div>
                        <ArrayCardInput
                                section="guide"
                                field="step"
                                value={form.guide.step[1]}
                                title=""
                                index = {1}
                                numericOnly = {false}
                                onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                />
                        <div className="flex flex-row ">
                            <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
                            {form.guide.water.map((_, index) => (
                                <div className="flex flex-row gap-2" key={index}> 
                                    <span className="text-center ">Lượng nước</span>
                                     <ArrayCardInput
                                        section="guide"
                                        field="water"
                                        value={form.guide.water[index]}
                                        title=""
                                        index = {index}
                                        onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                        />
                                </div>
                            ))}
                            </div>
                            <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
                            {form.guide.rice.map((_, index) => (
                                <div className="flex flex-row gap-2" key={index}>
                                    <span className="text-center ">Cơm sau nấu</span>
                                    <ArrayCardInput
                                        section="guide"
                                        field="rice"
                                        value={form.guide.rice[index]}
                                        title=""
                                        index = {index}
                                        numericOnly = {false}
                                        onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                        />
                                </div>
                            ))}
                            </div>
                            <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
                            {form.guide.finger.map((name, index) => (
                                <div className="flex flex-row gap-2" key={index}>
                                    <span className="text-center ">Tương đương <br/> "lóng tay"</span>
                                    <ArrayCardInput
                                        section="guide"
                                        field="finger"
                                        value={form.guide.finger[index]}
                                        title=""
                                        index = {index}
                                        numericOnly = {false}
                                        onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                        />
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="text-[20px] font-bold w-full px-4 mt-4">Bước 3</div>
                        <div className=" w-full">
                            <ArrayCardInput
                                section="guide"
                                field="step"
                                value={form.guide.step[2]}
                                title=""
                                index = {2}
                                numericOnly = {false}
                                onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                />
                    </div>
                    <div className="text-[20px] font-bold w-full px-4 mt-4">Bước 4</div>
                        <div className=" w-full">
                            <ArrayCardInput
                                section="guide"
                                field="step"
                                value={form.guide.step[3]}
                                title=""
                                index = {3}
                                numericOnly = {false}
                                onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                                />
                    </div>
                </div>
            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Quy cách đóng gói</div>
                <TextCard
                    field="package"
                    value={form.package}
                    title=""
                    onUpdateField={(field, value) => handleChange(field, value)}
                    />
            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Thành phần</div>
                <TextCard
                    field="parts"
                    value={form.parts}
                    title=""
                    onUpdateField={(field, value) => handleChange(field, value)}
                    />
            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Vùng ngyên liệu</div>
                <TextCard
                    field="ingredients"
                    value={form.ingredients}
                    title=""
                    onUpdateField={(field, value) => handleChange(field, value)}
                    />
            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Quy trình canh tác</div>
                <div className="mb-2 text-sm text-gray-600 px-4">Mô tả cách quy trình canh tác</div>
                    <TextAreaCard
                    field="grow"
                    value={form.grow}
                    title=""
                    onUpdateField={(field, value) => handleChange(field, value)}
                    />
            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Quy trình chế biến và bảo quản</div>
                <div className="mb-2 text-sm text-gray-600 px-4">Mô tả cách chế biến và bảo quản</div>
                 {form.tag.includes("gao-an") && (
                  <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={() => {
                            setForm((prev) => ({
                                ...prev,
                                cooking: {
                                ...prev.cooking,
                                step: [...prev.cooking.step, ""]
                                }
                            }));
                            }}
                            className="mt-2 ml-4 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            Thêm bước
                        </button>
                    </div>
                   <div className="space-y-3">
                        {form.cooking.step.map((_, index) => (
                        <div key={index} className="flex w-full items-center gap-3">
                            <div className="w-3/4">
                            <ArrayCardInput
                                section="cooking"
                                field="step"
                                value={form.cooking.step[index]}
                                title=""
                                index={index}
                                numericOnly = {false}
                                onChange={(section: keyof ProductForm, field: string | undefined, index: number | undefined, value: string | number | undefined) =>
                                handleNestedChange(section, field, index, value)
                                }
                            />
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                setForm((prev) => ({
                                    ...prev,
                                    cooking: {
                                    ...prev.cooking,
                                    step: prev.cooking.step.filter((_, i) => i !== index)
                                    }
                                }));
                                }}
                                className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .563c.34-.059.68-.114 1.022-.165m0 0L5.84 19.673a2.25 2.25 0 002.244 2.077h7.832a2.25 2.25 0 002.244-2.077L19.228 5.79m-14.456 0a48.11 48.11 0 013.478-.397m4.5 0v-.916c0-1.18.91-2.164 2.09-2.2a51.964 51.964 0 013.32 0c1.18.036 2.09 1.02 2.09 2.2v.916"
                                    />
                                </svg>
                            </button>

                        </div>
                    ))}
                    
                    </div>
                  </div>
                 )}
                  <div className="my-2">
                    <ArrayCardInput
                        section="cooking"
                        field="description"
                        value={form.cooking.description}
                        title=""
                        index = {null}
                        isArea = {true}
                        numericOnly = {false}
                        onChange={(section: keyof ProductForm,field: string|undefined,index:number|undefined, value:string | number |undefined) => handleNestedChange(section,field,index ,value)}
                        />
                    </div>

            </div>
            <div className="w-full mb-5">
                <div className="text-[20px] font-bold w-full px-4">Quy trình đóng gói</div>
                <TextAreaCard
                    field="wrapProcess"
                    value={form.wrapProcess}
                    title=""
                    onUpdateField={(field, value) => handleChange(field, value)}
                    />
            </div>
            <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh chứng nhận</div>
            <div className="w-full mt-5 space-y-4 flex flex-row overflow-x-auto">
            {form.productCertImage.map((img, idx) => (
                // <ImageCard
                // key={idx}
                // type="logo"
                // field={img}
                // index={idx}
                // onSetImageFile={(indexImage:number | null, fileOrUndefined:File | null) => setImageFile(indexImage, fileOrUndefined)}
                // />
                 <div key={idx} className="flex-shrink-0">
                    <ImageCard
                        field="productCertImage"
                        subField= ""
                        type="logo"
                        value={img}
                        index={idx}
                        onSetImageFile={<K extends keyof ProductForm>(indexImage:number | null, fileOrUndefined:File | null, field:K, subField: keyof ProductForm[K] | string) => setImageFile(indexImage, fileOrUndefined, field ,subField)}
                        setForm={setForm}
                        form={form}
                    />
                </div>
                
            ))}
                <div className="pb-4">
                    <button
                            type="button"
                            className=" flex items-center flex-shrink-0 gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition h-full"
                            onClick={() => handleChange('productCertImage', [...form.productCertImage, { file: null, preview: null, width: undefined, height: undefined }])}
                        >
                            <span>+ Thêm ảnh chứng nhận</span>
                        </button>
                </div>
            </div>
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