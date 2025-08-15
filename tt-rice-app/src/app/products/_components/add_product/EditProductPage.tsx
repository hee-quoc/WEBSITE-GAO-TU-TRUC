"use client";
import React, { useState, useEffect} from "react";
import { TextCard} from  "../utils/TextCard";
import {type Image, type ProductForm} from "../utils/types";
import { api } from "~/trpc/react";
import {ProductImageSection} from "./components/ProductImage"
import {ProductInfoSection} from "./components/ProductInfo";
import {CertificateSection, ProductCertImageSection} from "./components/ProductCertificate";
import {GuideSection} from "./components/ProductGuide";
import {CookingSection} from "./components/ProductCooking";
import { useProductFormHandlers } from "./utils/useProductFormHandlers";
import {uploadFileToS3} from "./utils/s3Upload";

function mapImageUrlsToImageObjects(urls: string[] = []): Image[] {
  return urls.map((url) => ({
    file: null,
    preview: url,
    width: undefined,
    height: undefined,
  }));
}

// Nếu certificate có image là url:
function mapCertificates(certificates: Record<string, unknown>[] = []): ProductForm["certificates"] {
  return certificates.map((c) => ({
    name: c.name as string,
    image: c.image as Image
      ? { file: null, preview: c.image as string, width: undefined, height: undefined }
      : { file: null, preview: null, width: undefined, height: undefined },
    description: c.description as string
  }));
}

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



export function EditProductPage({ productSlug }: { productSlug: string }) {
    const initialFormState = {
        title: "",
        productImages: [{ file: null, preview: null, width: undefined, height: undefined }] as Image[],
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
            productCertImages: [{ file: null, preview: null, width: undefined, height: undefined }] as Image[],
      }
    const [form, setForm] = useState<ProductForm>(initialFormState);
    const [loading, setLoading] = useState(true);
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [onSave, setSave] = useState(false);
    // 1. Fetch product data
    const { data: productData, isLoading } = api.product.getBySlug.useQuery({ slug: productSlug });
    const convertWater = productData?.guide?.water.map((w) => w.toString());
    const {
            handleFieldChange,
            handleArrayFieldChange,
            handleNestedArrayFieldChange,
            handleNestedFieldChange,
            handleArrayObjectFieldChange,
            handleImageFileChange,
            } = useProductFormHandlers(setForm);


  useEffect(() => {
    if (productData) {
      // Chuyển đổi dữ liệu từ DB về đúng format ProductForm (nếu cần)
      setForm({
        ...productData,
        guide: {
          rice: productData.guide?.rice ?? ["", "", ""],
          water: convertWater ?? ["", "", ""],
          finger: productData.guide?.finger ?? ["", "", ""],
          step: productData.guide?.step ?? ["", "", ""],
        },
        cooking: productData.cooking
          ? {
              step: productData.cooking.step ?? ["", "", ""],
              description: productData.cooking.description ?? "",
            }
          : {
              step: ["", "", ""],
              description: "",
            },
        productImages: mapImageUrlsToImageObjects(productData.productImages),
        productCertImages: mapImageUrlsToImageObjects(productData.productCertImages),
        certificates: mapCertificates(productData.certificates),
      });
      setLoading(false);
    }
  }, [productData]);

  const updateProduct = api.product.update.useMutation();
  const createPresignedUrl = api.s3.createPresignedUrl.useMutation();

  const handleSubmit = async () => {
        try {
        setSave(true)
        function notEmpty<T>(value: T | null | undefined): value is T {
            return value != null;
            }
         // 1. Lấy danh sách tất cả file cần upload theo thứ tự:
        const productImageFiles = form.productImages.filter(p => p.file).map(p => p.file!);
        const remainProductImageUrls = mapImageUrlsToImageObjects(productData?.productImages).filter(p => {return (p.file == null && p.preview)}).map(p => p.preview!)
        const productCertImageFiles = form.productCertImages.filter(p => p.file).map(p => p.file!);
        const remainProductCertImageUrls = mapImageUrlsToImageObjects(productData?.productCertImages).filter(p => {return (p.file == null && p.preview)}).map(p => p.preview!)
        const certificateImageFiles = form.certificates
        .filter((c): c is typeof c & { image: { file: File } } => !!c.image?.file)
        .map(c => c.image.file);
        const remainCertificateImageFileUrls = mapCertificates(productData?.certificates)
        .filter((c): c is typeof c & { image: { file: File } } => {return (c.image?.file == null && !!c.image?.preview)})
        .map(c => c.image.preview!);

       

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

        const details = `<p>${form.detail.replace("\n","<br />")}</p>`

       const productImageUrls = form.productImages
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string"); // loại bỏ undefined

        const totalProductImageUrls = [...remainProductImageUrls,...productImageUrls]

        const productCertImageUrls = form.productCertImages
        .filter(p => p.file)
        .map(() => presignedResults[index++]?.fileUrl)
        .filter((url): url is string => typeof url === "string");

        const totalProductCertImageUrls = [...remainProductCertImageUrls, ...productCertImageUrls]

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

        const totalCertificateImagesUrls = [...remainCertificateImageFileUrls, ...certificateImagesUrls]

        const water = form.guide.water.map((w)=>{return Number(w)})
        // 5. Tạo payload gửi server (gán url/key cho certificate)
       
        const payload = {
        ...form,
        guide: {
            ...form.guide,
            water: water
        },
        detail: details,
        productImages: totalProductImageUrls,
        productCertImages: totalProductCertImageUrls,
        certificates: filteredCertificates.map((c, i) => ({
            name: c.name,
            description: c.description,
            image: totalCertificateImagesUrls[i] ?? null,
        })),
        };

        const response = await updateProduct.mutateAsync({ id: productData!.id , slug: productData!.slug ,form: payload });

        if (response.success) {
            setPopup({ show: true, message: "Cập nhật sản phẩm thành công", type: "success" });
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
  
  if (isLoading || !form) return ( <div className="flex flex-col items-center"><div className="pt-20 text-[32px]">Đang tải dữ liệu sản phẩm...</div>;</div>)
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
                  images={form.productImages}
                  onAdd={() =>
                  handleFieldChange("productImages", [
                      ...form.productImages,
                      { file: null, preview: null, width: undefined, height: undefined },
                  ])
                  }
                  onSetImageFile={(idx, file) => handleImageFileChange("productImages",idx, file)}
              />
               <CertificateSection
                  certificates={form.certificates}
                  setForm={setForm}
                  setImageFile={(idx, file, field, subField) => handleImageFileChange(field, idx!, file!, subField)}
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
                  images={form.productCertImages}
                  onAdd={() =>
                      handleFieldChange("productCertImages", [
                      ...form.productCertImages,
                      { file: null, preview: null, width: undefined, height: undefined },
                      ])
                  }
                  onSetImageFile={(idx, file) => handleImageFileChange("productCertImages", idx, file)}
                  />
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