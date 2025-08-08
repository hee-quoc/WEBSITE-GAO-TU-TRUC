// src/app/products/[slug]/page.tsx
import { ProductInfo } from "../_components/ProductInfo";
import { ProductTabs } from "../_components/ProductTabs";
import { ProductUsageGuide } from "../_components/ProductUsageGuide";
import { ProductAccordion } from "../_components/ProductAccordion";
import { ProductCertificates } from "../_components/ProductCertificates";
import { ProductFeatures } from "../_components/ProductFeatures";
import { ProductGallery } from "../_components/ProductGallery";
import Breadcrumb from "../_components/BreadCrumb";

export default async function ProductPage() {
  const product = {
  slug: "gao-st25-lua-tom",
  title: "Gạo ST25 Lúa Tôm",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  
  // The price is "Liên hệ" (Contact us), so we can represent it as 0.
  price: 0,
  
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết. Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp <br /> <br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /><br />không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  
  // Represents [Độ thơm, Độ dẻo, Độ mềm, Độ nở] on a scale of 1-5
  // [Aroma, Stickiness, Softness, Expansion]
  properties: [5, 5, 5, 3],
  
  // Nested 'create' for the related Guide model
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], // Corresponds to the water levels
    finger: ["Gần 2/3 lóng tay", "Hơn 1 lóng tay một chút", "1 lóng tay"],
    step: [
      "Vo gạo 1–2 lần để loại bỏ bụi bẩn, giữ lại vị ngọt tự nhiên.",
      "Có thể đong nước theo phương pháp truyền thống “1 lóng tay”.",
      "Nấu đến khi cơm chín. Ủ thêm khoảng 10 phút để hạt cơm ráo, tơi, và dậy hương thơm.",
      "Dùng cơm khi còn nóng để cảm nhận trọn vẹn vị ngọt lành từ đồng nội."
    ]
  },

  package: "Túi PA (5kg); Bao PP (10kg, 25kg, 50kg)",
  parts: "100% Gạo ST25 nguyên chất từ giống lúa canh tác trên đất nuôi tôm.",
  ingredients: "100% Gạo ST25 Lúa Tôm. Không chứa Gluten, không chất bảo quản, không biến đổi gen.",
  grow: "Canh tác theo mô hình luân canh lúa - tôm tự nhiên tại vùng trồng Bà Rịa - Vũng Tàu. Hạn chế tối đa hóa chất, giúp đất lành, nước sạch để giữ hương vị thuần khiết.",
  cooking: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  wrap_process: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản.",
  certificate: "ISO (2025): Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen). OCCP (2023): Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen).",
  
  // Set to true based on "thị trường xuất khẩu" (export market) and international certs
  international: true,
  
  // Placeholder image URLs
  thumbnail: "/images/products/img_st25.png",
  subImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ]
};
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-20">
          <Breadcrumb />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={product.subImages}/>
          </div>
          <div className="flex flex-col ">
            <ProductInfo product={product}/>
            <ProductTabs  descriptionHtml={product.detail}/>
            <ProductFeatures features={product.properties}/>
            <ProductCertificates/>
            <ProductUsageGuide guide={product.guide} />
            <ProductAccordion product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}