// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

function toSlug(str: string): string {
  if (!str) {
    return '';
  }

  // 1. Convert to lower case
  let slug = str.toLowerCase();

  // 2. & 3. Decompose and remove diacritics
  // 'NFD' separates combined characters into the base character and the accent
  // /[\u0300-\u036f]/g matches all combining diacritical marks
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 4. Handle the Vietnamese letter 'đ'
  slug = slug.replace(/đ/g, 'd');

  // 5. Replace spaces and consecutive spaces with a single hyphen
  slug = slug.replace(/\s+/g, '-');

  // 6. Remove all non-alphanumeric characters except the hyphen
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // 7. Collapse consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // 8. Trim leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}
async function main() {
  console.log('Start seeding ...');

  const username = 'admin'; 
  const plainPassword = 'password'; 

  const hashedPassword = await hash(plainPassword, 10);

  const admin = await prisma.user.upsert({
    where: { username: username },
    update: {
        hashedPassword: hashedPassword,
    },
    create: {
      username: username,
      hashedPassword: hashedPassword,
    },
  });

  const products = [
  {
  slug: "gao-st25",
  title: "Gạo ST25",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-st25-lua-tom",
  title: "Gạo ST25 Lúa Tôm",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-lai-hoa",
  title: "Gạo Lài Hoa",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-lai-sua",
  title: "Gạo Lài Sữa",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-huong-sen",
  title: "Gạo Hương Sen",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-deo-bau",
  title: "Gạo Dẻo Bầu",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "gao-te-504",
  title: "Gạo Tẻ 504",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-thong-dung',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
{
  slug: "phu-pham",
  title: "Phụ Phẩm",
  description: "Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.",
  price: 0,
  detail: "Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.<br />Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy. <br/>Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.",
  properties: [5, 5, 5, 1],
  guide: {
    water: [0.8, 1.2, 1.0],
    rice: ["Hơi khô", "Nhão", "Mềm dẻo"], 
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
  wrapProcess: {
    step:[
      "01 - Chọn lịch người điều chỉ huy",
      "02 - Cân mận gió trớng & chấm bón",
      "03 - Nước duỡng băng tính hoa đất trới",
      "04 - Ký luận thu hoạch & tính chốn",
      "05 - Sấy lượn đất chứn để âm <14%",
      "06 - Xay xất & đóng gói trong quy trình hiện đại"
    ],
    description: "Lúa được xay xát bằng công nghệ hiện đại, hạn chế đánh bóng quá mức để bảo toàn lớp cám tự nhiên. Sản phẩm được đóng gói và bảo quản trong điều kiện kho sạch, khô thoáng, không sử dụng chất bảo quản."
  },
  certificate: [
    {
      name: "ISO (2025)",
      image: "/certificate/image 23.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)"
    },
    {
      name: "OCCP (2023)",
      image: "/certificate/image 24.svg",
      description: "Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu (Thực phẩm không biến đổi gen)."
    }
  ],
  international: true,
  productImages: [
    "/images/products/img_st25.svg",
    "/images/products/lua_tom.png",
    "/images/products/te_504.png",
    "/images/products/lai_hoa.png",
    "/images/products/lai_sua.png"
  ],
  tags: 'gao-an',
  productCertImages:["/images/products/icon_ocop.svg", "/images/products/icon_iso.svg"],
},
];

  console.log('Seeding products...');

  for (const product of products) {
  await prisma.product.upsert({
    where: { slug: product.slug }, // slug is @unique in schema
    update: {},
    create: {
      slug: product.slug,
      title: product.title,
      description: product.description,
      price: String(product.price), // schema expects String
      detail: product.detail,
      properties: product.properties,
      tag: product.tags, // match Prisma: tag (String)
      productImages: product.productImages,
      package: product.package,
      parts: product.parts,
      ingredients: product.ingredients,
      grow: product.grow,
      cooking: product.cooking,
      productCertImages: product.productCertImages,

      guide: {
        create: {
          water: product.guide.water,
          rice: product.guide.rice,
          finger: product.guide.finger,
          step: product.guide.step,
        },
      },

      wrapProcess: {
        create: {
          step: product.wrapProcess.step,
          description: product.wrapProcess.description,
        },
      },

      certificates: {
        create: product.certificate.map((cert: any) => ({
          name: cert.name,
          image: cert.image,
          description: cert.description,
        })),
      },
    },
  });
}
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });