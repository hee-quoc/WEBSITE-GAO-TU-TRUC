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
    slug: 'gao-st25-lua-tom',
    description: `
      <div class="content mx-auto w-full ">
        <p class="text-gray-800 mb-4">
          Gạo sạch Tư Trúc - Gạo ST25 nổi tiếng với hạt gạo thon dài, trắng trong. Khi nấu, cơm dẻo mềm, có mùi thơm đặc trưng của lá dứa và cốm non, vị ngọt đậm đà. Đây là giống gạo được ưa chuộng bởi hương vị thơm ngon và giá trị dinh dưỡng cao, thích hợp cho mọi bữa ăn gia đình.
        </p>
        <div class="text-center  mb-4">
          Hàm lượng dinh dưỡng trong 01kg
        </div>
        <div class="flex justify-between mb-4">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Đạm > 60g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Tinh bột (Cacbonhydrat) > 720g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Chất xơ (Fiber) > 3g</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Chất béo (Lipid) < 2g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Vitamin B1 < 100 μg</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Cholesterol = 0 g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mb-4">
          Chỉ tiêu chất lượng
        </div>
        <div class="flex justify-between">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Độ ẩm < 14%</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Tấm < 5%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <div class="content mx-auto w-full ">
        <p class="text-gray-800 mb-4">
          Gạo Lài hoa sở hữu hạt gạo trắng trong như hoa lài, mang đến hương thơm thanh khiết, dịu nhẹ khi nấu. Cơm có độ mềm xốp vừa phải, vị ngọt thanh tao. Đây là lựa chọn lý tưởng cho những ai yêu thích hương vị nhẹ nhàng, tinh tế trong từng hạt cơm.
        </p>
        <div class="text-center  mb-4">
          Hàm lượng dinh dưỡng trong 01kg
        </div>
        <div class="flex justify-between mb-4">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Đạm > 60g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Tinh bột (Cacbonhydrat) > 720g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Chất xơ (Fiber) > 3g</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Chất béo (Lipid) < 2g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Vitamin B1 < 100 μg</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Cholesterol = 0 g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mb-4">
          Chỉ tiêu chất lượng
        </div>
        <div class="flex justify-between">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Độ ẩm < 14%</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Tấm < 5%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <div class="content mx-auto w-full ">
        <p class="text-gray-800 mb-4">
          Gạo Lài sữa có hạt gạo màu trắng sữa đặc trưng. Khi nấu, cơm dẻo mềm, có vị ngọt nhẹ và hương thơm thoang thoảng như sữa. Đây là giống gạo đặc biệt, không chỉ ngon miệng mà còn cung cấp nhiều dưỡng chất, phù hợp với cả người lớn và trẻ em.
        </p>
        <div class="text-center  mb-4">
          Hàm lượng dinh dưỡng trong 01kg
        </div>
        <div class="flex justify-between mb-4">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Đạm > 60g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Tinh bột (Cacbonhydrat) > 720g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Chất xơ (Fiber) > 3g</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Chất béo (Lipid) < 2g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Vitamin B1 < 100 μg</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Cholesterol = 0 g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mb-4">
          Chỉ tiêu chất lượng
        </div>
        <div class="flex justify-between">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Độ ẩm < 14%</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Tấm < 5%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
      <div class="content mx-auto w-full ">
        <p class="text-gray-800 mb-4">
          Gạo Hương sen mang đến trải nghiệm ẩm thực độc đáo với hương thơm thoang thoảng của lá sen tự nhiên. Hạt gạo thon dài, khi nấu cơm có độ dẻo vừa phải, không quá khô cũng không quá nát. Đây là sự lựa chọn thú vị để làm mới bữa ăn gia đình bạn, gợi nhớ đến những cánh đồng sen bát ngát.
        </p>
        <div class="text-center  mb-4">
          Hàm lượng dinh dưỡng trong 01kg
        </div>
        <div class="flex justify-between mb-4">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Đạm > 60g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Tinh bột (Cacbonhydrat) > 720g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Chất xơ (Fiber) > 3g</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Chất béo (Lipid) < 2g</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Vitamin B1 < 100 μg</td>
              </tr>
              <tr class="border border">
                <td class="border border p-2">Cholesterol = 0 g</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-center mb-4">
          Chỉ tiêu chất lượng
        </div>
        <div class="flex justify-between">
          <table class="w-2/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Độ ẩm < 14%</td>
              </tr>
            </tbody>
          </table>
          <table class="w-1/3 border-collapse border border">
            <tbody>
              <tr class="border border">
                <td class="border border p-2">Tấm < 5%</td>
              </tr>
            </tbody>
          </table>
        </div>
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
          Gạo ST25 là giống gạo đặc sản cao cấp của Việt Nam, với hương thơm tự nhiên, vị ngọt thanh và độ dẻo vừa phải, ST25 từng vinh dự đạt 
          <strong>giải Nhất “Gạo ngon nhất thế giới” năm 2019</strong> tại Philippines.
        </p>
        <ul class="pl-5 space-y-2">
          <li>
            <p>
              <strong>Loại gạo:</strong> Gạo trắng hạt dài, thon, trắng trong.
            </p>
          </li>
          <li>
            <p>
              <strong>Hương vị:</strong> Thơm nhẹ mùi lá dứa đặc trưng, ngọt dịu sau khi nấu.
            </p>
          </li>
          <li>
            <p>
              <strong>Độ dẻo:</strong> Dẻo mềm nhưng không dính, cơm nguội vẫn ngon.
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
      update: {
        slug: productData.slug ?? toSlug(productData.name),
      }, // We'll just create, assuming seed is the source of truth
      create: {
        name: productData.name,
        description: productData.description,
        tags: productData.tags,
        imageData: null, // Store the raw image data
        imageType: productData.imageType, // Store the MIME type
        authorId: adminUser.id,
        companyBrand: productData.companyBrand,
        SKU: productData.SKU,
        slug: productData.slug ?? toSlug(productData.name),
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