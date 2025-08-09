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
  description: "“Hạt gạo ST25 - niềm tự hào của đất Việt mang trong mình độ dẻo thơm, ngọt hậu, giữ trọn vị ngon dù ăn nóng hay nguội, là lựa chọn lý tưởng cho mọi bữa cơm chất lượng”",
  price: 0,
  detail: "ST25 là giống gạo đặc sản cao cấp, được nhóm kỹ sư nông nghiệp Việt Nam lai tạo thành công. Vinh dự đoạt giải Nhất “Gạo ngon nhất thế giới” năm 2019 tại Hội nghị Thương mại Gạo Quốc tế (Philippines), ST25 gây ấn tượng mạnh nhờ chất lượng vượt trội và hương vị riêng biệt khó nhầm lẫn. <br />Tại Tư Trúc, gạo ST25 được giữ nguyên độ tinh khiết 100%, không pha trộn, không ướp hương nhân tạo, đảm bảo hạt gạo đến tay người dùng là nguyên bản nhất từ giống thuần chủng. Hạt gạo trắng, thon dài, đều tăm tắp, mang hương thơm dịu dàng như lá dứa non quyện nhẹ mùi cốm mới, dễ chịu và đầy cuốn hút. <br /> Khi nấu chín, cơm dẻo mềm vừa phải, giữ nguyên hình hạt, không nát, không dính, cho cảm giác dễ ăn và thanh nhã. Hương thơm lan tỏa nhẹ nhàng trong quá trình nấu, và vẫn phảng phất kể cả khi cơm nguội. Vị cơm ngọt hậu nhẹ nhàng, phù hợp với khẩu vị người Việt, và đủ tinh tế để chinh phục thị trường quốc tế.",
  properties: [5, 4, 5, 1],
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.“",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Tựa như chính tên gọi của mình, gạo Lài Hoa mang theo sự tinh khiết và thanh tao - lựa chọn phù hợp cho những ai có khẩu vị thanh đạm”",
  price: 0,
  detail: "Gạo Lài Hoa – cái tên được lấy cảm hứng từ chính vẻ ngoài trắng trong như cánh hoa lài sớm, cùng hương thơm dịu dàng, thanh khiết đặc trưng. Giống gạo này thường được gieo trồng tại những vùng có khí hậu ôn hòa, nguồn nước sạch, ít chịu tác động của hóa chất, nhờ đó giữ trọn sự tinh khôi và tự nhiên trong từng hạt.<br/>Tại Tư Trúc, gạo Lài Hoa được canh tác và sản xuất dưới quy trình nghiêm ngặt, đảm bảo hạt gạo thành phẩm thon dài, trắng mịn, đều tăm tắp, ít tấm, vẫn lưu giữ hương thơm nhẹ nhàng dù không qua xử lý tạo mùi.<br/>Khi nấu chín, cơm tỏa hương thơm thoảng như hoa lài chớm nở, dịu nhẹ, không lấn át mùi vị món ăn. Cơm mềm xốp vừa phải, ngọt thanh và dễ ăn cả khi để nguội, phù hợp với những ăn thanh đạm hoặc dùng trong các bữa cơm chay thanh tịnh.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Nhẹ nhàng như mùi sữa ấm, mang đến sự êm dịu trong từng bữa cơm - an lành cho mọi lứa tuổi, từ trẻ nhỏ đến người lớn tuổi”",
  price: 0,
  detail: "Gạo Lài Sữa là giống gạo đặc biệt với màu trắng đục và hương thơm nhẹ như sữa ấm. Được phát triển từ nguồn giống giàu dưỡng chất, Lài Sữa phù hợp canh tác ở vùng đất có độ mặn - ngọt luân phiên, giúp hạt gạo đạt độ dẻo mềm tự nhiên và vị ngọt thanh dễ chịu, đặc biệt dễ tiêu hóa.<br/>Dựa trên hơn 30 năm kinh nghiệm, Tư Trúc đã xây dựng một quy trình trồng và xử lý riêng biệt dành cho dòng gạo này - loại gạo đặc thù với yêu cầu cao về độ tinh khiết và ổn định trong mỗi vụ mùa. Gạo thành phẩm thon dài, trắng đục, đều hạt, mang mùi phảng phất như sữa thơm.<br/>Khi nấu chín, cơm dẻo mềm, thơm dịu như sữa thoảng, vị ngọt nhẹ nơi đầu lưỡi. Cơm không quá dính, không nát, giữ được độ mềm. Đây là lựa chọn lý tưởng cho trẻ em, người lớn tuổi, hoặc bất kỳ ai đang tìm kiếm một bữa cơm thanh đạm, nhẹ nhàng mà vẫn tròn vị.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Sự giao thoa giữa hạt gạo thượng hạng và hương đồng nội mộc mạc - mang lại trải nghiệm thanh nhẹ, gợi nhớ những mùa sen chớm nở”",
  price: 0,
  detail: "Gạo Hương Sen - giống gạo lấy cảm hứng từ hương thơm thanh nhẹ của lá sen non, gợi nhớ đến những buổi sớm thanh bình trên cánh đồng sen bát ngát với mùi hương tinh tế, không nồng, không gắt, không át vị món ăn - mang lại cảm giác dễ chịu.<br/>Từ đồng ruộng đến nhà máy, mỗi hạt gạo Hương Sen là thành quả của đôi tay người nông dân cần mẫn và quy trình chế biến chuẩn mực, cho ra hạt gạo thon dài, trắng trong, đều hạt, mịn tay, giữ được hương thơm tự nhiên - yếu tố then chốt của các dòng gạo có mùi thơm đặc trưng.<br/>Khi nấu chín, cơm dẻo mềm, không quá dính cũng không khô tơi, vị thanh nhẹ, dịu dàng. Hương sen thoảng qua lúc cơm chín lan tỏa vừa đủ để gợi cảm giác ngon miệng, phù hợp để làm mới bữa ăn hằng ngày, mang trọn vị mộc mạc từ đồng nội vào từng chén cơm.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Giải pháp tối ưu cho những bữa ăn quy mô lớn - ổn định, dễ nấu, dễ ăn, giá cả hợp lý”",
  price: 0,
  detail: "Gạo Dẻo Bầu là dòng gạo chuyên dùng cho suất ăn công nghiệp, được gieo trồng theo quy trình an toàn, chọn lọc kỹ lưỡng từ giống đến phân bón, cũng như thu hoạch đúng thời điểm – nhằm đảm bảo chất lượng hạt lúa và không tồn dư thuốc bảo vệ thực vật.<br/>Khi nấu chín cơm tương đối dẻo, dễ ăn, phù hợp cho các suất ăn quy mô lớn như nhà máy, trường học, bệnh viện hay căn - tin doanh nghiệp.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Từ bữa cơm tập thể đến dây chuyền bún, phở, bánh tráng - gạo tẻ 504 chính là loại gạo lý tưởng nhờ tinh bột cao, dễ nấu, thành phẩm trắng, dai, đều hạt và hạn chế hao hụt.”",
  price: 0,
  detail: "Gạo Tẻ 504 (IR50404) - giống gạo ngắn ngày có năng suất cao, khả năng thích ứng tốt và sản lượng ổn định - từ lâu đã là lựa chọn quen thuộc của nhiều bếp ăn công nghiệp và cơ sở sản xuất trên cả nước.<br/>Tại Tư Trúc, gạo Tẻ 504 được thu hoạch và xử lý theo quy trình kiểm soát chất lượng kỹ lưỡng. Hạt gạo có kích thước trung bình, trắng đục, hơi bạc bụng, có độ ẩm ổn định và hàm lượng tinh bột cao – là những yếu tố lý tưởng cho cả nấu cơm số lượng lớn, lẫn làm nguyên liệu chế biến bún, phở, bánh tráng. Gạo đều hạt, ít gãy, giúp thành phẩm trắng, dai, dễ cán ép và hạn chế hao hụt trong sản xuất.<br/>Khi nấu chín, cơm có độ dẻo thấp, hạt tơi và ráo, dễ xới, không dính, vị nhẹ, hơi ngọt, dễ ăn và phù hợp với đa số khẩu vị, đặc biệt thích hợp dùng ngay sau khi nấu mà không cần giữ nóng lâu. Nhờ tính ổn định, dễ bảo quản và chi phí hợp lý, gạo Tẻ 504 trở thành giải pháp được ưu tiên trong các bếp ăn tập thể, nhà hàng bình dân và cả dây chuyền chế biến thực phẩm quy mô lớn.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
  description: "“Không chỉ tạo ra hạt gạo ngon, mỗi mùa xay xát còn gieo mầm cho những giá trị mới - từ cám gạo làm đẹp đến vỏ trấu nuôi cây, ủ đất, giữ lửa cho biết bao mái bếp quê nhà”",
  price: 0,
  detail: "Tại Tư Trúc, không chỉ hạt gạo được chăm chút, mà phụ phẩm từ xay xát như cám và trấu cũng được tận dụng tối đa, góp phần phát triển mô hình sản xuất nông nghiệp tuần hoàn, không lãng phí.<br/>Cám gạo: Nguyên liệu quý trong sản xuất dầu cám gạo – thành phần cao cấp cho thực phẩm và mỹ phẩm.<br/> <br/>Trấu: Nguyên liệu được ứng dụng linh hoạt trong nhiều hoạt động sản xuất và đời sống - từ nhiên liệu đốt lò, sấy nông sản, đến ủ phân hữu cơ, làm giá thể trồng cây, lót chuồng chăn nuôi, hoặc tái chế thành củi trấu, gạch không nung, ván ép sinh học.<br/><br/>Nhờ khả năng tái sử dụng linh hoạt, trấu và cám không chỉ giúp giảm rác thải, mà còn tạo thêm giá trị kinh tế, và là một phần của hệ sinh thái nông nghiệp tuần hoàn.",
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
  wrapProcess: "Khi nấu chín, cơm thoảng hương thơm lá dứa quyện cốm non. Hạt cơm dẻo mềm, tơi đều, có vị ngọt thanh. Cơm vẫn giữ được độ ngon ngay cả khi để nguội.",
  cooking: {
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
      wrapProcess: product.wrapProcess,
      productCertImages: product.productCertImages,
      guide: {
        create: {
          water: product.guide.water,
          rice: product.guide.rice,
          finger: product.guide.finger,
          step: product.guide.step,
        },
      },

      cooking: {
        create: {
          step: product.cooking.step,
          description: product.cooking.description,
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