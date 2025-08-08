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
  const defaultPassword = 'password';

  const hashedPassword = await hash(defaultPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { username: username },
    update: {},
    create: {
      username: username,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const productsData = [
  {
    name: 'Gạo ST25 Lúa Tôm',
    description: `
       <div class="content mx-auto w-full  font-fz-poppins">
        <p class=" mb-4">
          “Từ vùng đất lúa - tôm giàu dưỡng chất, Tư Trúc tạo nên những hạt gạo sạch, dẻo thơm, được kết tinh từ mùa vụ duy nhất trong năm, hấp thụ trọn vẹn tinh hoa đất trời.”
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              Gạo Lúa Tôm ST25 được canh tác theo mô hình luân canh lúa - tôm tự nhiên, hạn chế tối đa hóa chất, giúp đất lành, nước sạch, giữ cho hạt gạo có hương vị nguyên bản và thuần khiết.
            </p>
          </li>
          <li>
            <p>
              Tận dụng thổ nhưỡng giàu khoáng tại vùng trồng Bà Rịa - Vũng Tàu, Tư Trúc gieo trồng và cho ra những hạt gạo trắng ngà, thon dài, đều tăm tắp, không lẫn tạp chất, khi chạm vào thấy hạt gạo mịn, chắc mẩy.
            </p>
          </li>
          <li>
            <p>
              Khi nấu chín, cơm thoảng hương thơm dịu như lá dứa quyện cốm non, nhẹ nhàng mà vẫn đủ lan tỏa khắp gian bếp. Hạt cơm dẻo mềm, tơi đều, vừa chạm đầu lưỡi đã thấy vị ngọt thanh, hậu vị đậm dần theo từng lần nhai. Dù dùng khi còn nóng hay đã nguội, cơm vẫn thơm ngon dễ ăn, phù hợp không chỉ cho mọi bữa cơm gia đình, mà còn cho các bếp ăn cao cấp lẫn thị trường xuất khẩu.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an'],
    companyBrand: "Thương hiệu",
    SKU:"VN09",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/product/lua_tom.png"
  },
  {
    name: 'Gạo Lài hoa',
    description: `
        <div class="content mx-auto w-full  font-fz-poppins">
        <p class=" mb-4">
          “Tựa như chính tên gọi của mình, gạo Lài Hoa mang theo sự tinh khiết và thanh tao - lựa chọn phù hợp cho những ai có khẩu vị thanh đạm”
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              Gạo Lài Hoa – cái tên được lấy cảm hứng từ chính vẻ ngoài trắng trong như cánh hoa lài sớm, cùng hương thơm dịu dàng, thanh khiết đặc trưng. Giống gạo này thường được gieo trồng tại những vùng có khí hậu ôn hòa, nguồn nước sạch, ít chịu tác động của hóa chất, nhờ đó giữ trọn sự tinh khôi và tự nhiên trong từng hạt.
            </p>
          </li>
          <li>
            <p>
              Tại Tư Trúc, gạo Lài Hoa được canh tác và sản xuất dưới quy trình nghiêm ngặt, đảm bảo hạt gạo thành phẩm thon dài, trắng mịn, đều tăm tắp, ít tấm, vẫn lưu giữ hương thơm nhẹ nhàng dù không qua xử lý tạo mùi.
            </p>
          </li>
          <li>
            <p>
              Khi nấu chín, cơm tỏa hương thơm thoảng như hoa lài chớm nở, dịu nhẹ, không lấn át mùi vị món ăn. Cơm mềm xốp vừa phải, ngọt thanh và dễ ăn cả khi để nguội, phù hợp với những ăn thanh đạm hoặc dùng trong các bữa cơm chay thanh tịnh.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'lai_hoa.png',
    imageType: 'image/png',
    tags: ['gao-an'],
    companyBrand: "Thương hiệu",
    SKU:"M8S4",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/product/lai_hoa.png"
  },
  {
    name: 'Gạo Lài sữa',
    description: `
         <div class="content mx-auto w-full  font-fz-poppins">
        <p class=" mb-4">
          “Nhẹ nhàng như mùi sữa ấm, mang đến sự êm dịu trong từng bữa cơm - an lành cho mọi lứa tuổi, từ trẻ nhỏ đến người lớn tuổi”
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              Gạo Lài Sữa là giống gạo đặc biệt với màu trắng đục và hương thơm nhẹ như sữa ấm. Được phát triển từ nguồn giống giàu dưỡng chất, Lài Sữa phù hợp canh tác ở vùng đất có độ mặn - ngọt luân phiên, giúp hạt gạo đạt độ dẻo mềm tự nhiên và vị ngọt thanh dễ chịu, đặc biệt dễ tiêu hóa.
            </p>
          </li>
          <li>
            <p>
              Dựa trên hơn 30 năm kinh nghiệm, Tư Trúc đã xây dựng một quy trình trồng và xử lý riêng biệt dành cho dòng gạo này - loại gạo đặc thù với yêu cầu cao về độ tinh khiết và ổn định trong mỗi vụ mùa. Gạo thành phẩm thon dài, trắng đục, đều hạt, mang mùi phảng phất như sữa thơm.
            </p>
          </li>
          <li>
            <p>
              Khi nấu chín, cơm dẻo mềm, thơm dịu như sữa thoảng, vị ngọt nhẹ nơi đầu lưỡi. Cơm không quá dính, không nát, giữ được độ mềm. Đây là lựa chọn lý tưởng cho trẻ em, người lớn tuổi, hoặc bất kỳ ai đang tìm kiếm một bữa cơm thanh đạm, nhẹ nhàng mà vẫn tròn vị.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'lai_sua.png',
    imageType: 'image/png',
    tags: ['gao-an'],
    companyBrand: "Thương hiệu",
    SKU:"GGX4",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/product/lai_sua.png"
  },
  {
    name: 'Gạo Hương sen',
    description: `
          <div class="content mx-auto w-full  font-fz-poppins">
        <p class=" mb-4">
          “Sự giao thoa giữa hạt gạo thượng hạng và hương đồng nội mộc mạc - mang lại trải nghiệm thanh nhẹ, gợi nhớ những mùa sen chớm nở”
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              Gạo Hương Sen - giống gạo lấy cảm hứng từ hương thơm thanh nhẹ của lá sen non, gợi nhớ đến những buổi sớm thanh bình trên cánh đồng sen bát ngát với mùi hương tinh tế, không nồng, không gắt, không át vị món ăn - mang lại cảm giác dễ chịu.
            </p>
          </li>
          <li>
            <p>
              Từ đồng ruộng đến nhà máy, mỗi hạt gạo Hương Sen là thành quả của đôi tay người nông dân cần mẫn và quy trình chế biến chuẩn mực, cho ra hạt gạo thon dài, trắng trong, đều hạt, mịn tay, giữ được hương thơm tự nhiên - yếu tố then chốt của các dòng gạo có mùi thơm đặc trưng.
            </p>
          </li>
          <li>
            <p>
              Khi nấu chín, cơm dẻo mềm, không quá dính cũng không khô tơi, vị thanh nhẹ, dịu dàng. Hương sen thoảng qua lúc cơm chín lan tỏa vừa đủ để gợi cảm giác ngon miệng, phù hợp để làm mới bữa ăn hằng ngày, mang trọn vị mộc mạc từ đồng nội vào từng chén cơm.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'huong_sen.png',
    imageType: 'image/png',
    tags: ['gao-an'],
    companyBrand: "Thương hiệu",
    SKU:"9J0Z",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/product/huong_sen.png"
  },
  {
    name: 'Gạo ST25',
    description: `
      <div class="content mx-auto w-full  font-fz-poppins">
        <p class=" mb-4">
          “Hạt gạo ST25 - niềm tự hào của đất Việt mang trong mình độ dẻo thơm, ngọt hậu, giữ trọn vị ngon dù ăn nóng hay nguội, là lựa chọn lý tưởng cho mọi bữa cơm chất lượng”
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              ST25 là giống gạo đặc sản cao cấp, được nhóm kỹ sư nông nghiệp Việt Nam lai tạo thành công. Vinh dự đoạt giải Nhất “Gạo ngon nhất thế giới” năm 2019 tại Hội nghị Thương mại Gạo Quốc tế (Philippines), ST25 gây ấn tượng mạnh nhờ chất lượng vượt trội và hương vị riêng biệt khó nhầm lẫn.
            </p>
          </li>
          <li>
            <p>
              Tại Tư Trúc, gạo ST25 được giữ nguyên độ tinh khiết 100%, không pha trộn, không ướp hương nhân tạo, đảm bảo hạt gạo đến tay người dùng là nguyên bản nhất từ giống thuần chủng. Hạt gạo trắng, thon dài, đều tăm tắp, mang hương thơm dịu dàng như lá dứa non quyện nhẹ mùi cốm mới, dễ chịu và đầy cuốn hút.
            </p>
          </li>
          <li>
            <p>
              Khi nấu chín, cơm dẻo mềm vừa phải, giữ nguyên hình hạt, không nát, không dính, cho cảm giác dễ ăn và thanh nhã. Hương thơm lan tỏa nhẹ nhàng trong quá trình nấu, và vẫn phảng phất kể cả khi cơm nguội. Vị cơm ngọt hậu nhẹ nhàng, phù hợp với khẩu vị người Việt, và đủ tinh tế để chinh phục thị trường quốc tế.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'img_st25.png',
    imageType: 'image/png',
    tags: ['gao-an'],
    companyBrand: "Khác",
    SKU:"RZUXB",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/products/st25.png"
  },
  {
    name: 'Gạo Tẻ 504',
    description: `
      <div class="content mx-auto w-full ">
        <p class=" mb-4">
          Gạo Tẻ 504 (IR50404) là giống gạo ngắn ngày, năng suất cao. Đây là loại gạo <strong>thông dụng</strong>, phù hợp với nhu cầu ăn uống hằng ngày của đại đa số gia đình Việt Nam và được nhiều quán ăn, bếp công nghiệp, nhà hàng bình dân tin dùng.
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              <strong>Loại gạo:</strong> Hạt trung bình, hơi bạc bụng, trắng đục.
            </p>
          </li>
          <li>
            <p>
              <strong>Hương vị:</strong> Nhẹ, ít thơm, cơm có vị hơi ngọt.
            </p>
          </li>
          <li>
            <p>
              <strong>Độ dẻo:</strong> Thấp - cơm tơi, dễ xới, thích hợp ăn liền sau khi nấu.
            </p>
          </li>
        </ul>
      </div>
    `,
    imageFilename: 'te_504.png',
    imageType: 'image/png',
    tags: ['gao-thong-dung'],
    companyBrand: "Khác",
    SKU:"XHSVT",
    imageUrl:"https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/product/te_504.png"
  }
];

  console.log('Seeding products...');

  for (const productData of productsData) {
    // Read the image file into a Buffer
    // const imagePath = path.join(process.cwd(), 'public','images','products', productData.imageFilename);
    // let imageDataBuffer: Buffer | null = null;
    // try {
    //   imageDataBuffer = fs.readFileSync(imagePath);
    // } catch (error) {
    //   console.log(error)
    //   console.warn(`Could not read image for ${productData.name}. Image will be null.`);
    // }

    await prisma.product.upsert({
      where: { name: productData.name },
      update: {}, // We'll just create, assuming seed is the source of truth
      create: {
        name: productData.name,
        description: productData.description,
        tags: productData.tags,
        imageData: null, // Store the raw image data
        imageType: productData.imageType, // Store the MIME type
        authorId: adminUser.id,
        companyBrand: productData.companyBrand,
        SKU: productData.SKU,
        slug: toSlug(productData.name),
        imageUrl: productData.imageUrl,
        
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