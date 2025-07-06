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
      name: 'Gạo ST25 Thượng Hạng',
      description: `
    <p>Được mệnh danh là gạo ngon nhất thế giới, hạt dài, trắng trong, không bạc bụng, khi nấu cho cơm dẻo, thơm mùi lá dứa tự nhiên, ăn rất hấp dẫn.</p>
    <div style="text-align: center; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem;">Hàm lượng dinh dưỡng trong 01kg</div>
    <table class="table-auto border-collapse border border-slate-400 w-full">
      <thead>
        <tr>
          <th class="border border-slate-300 p-2">Thành phần</th>
          <th class="border border-slate-300 p-2">Giá trị</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-300 p-2">Đạm (Protein)</td>
          <td class="border border-slate-300 p-2">> 65g</td>
        </tr>
        <tr>
          <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
          <td class="border border-slate-300 p-2">> 750g</td>
        </tr>
      </tbody>
    </table>
  `,
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an"],
    },
    {
      name: 'Gạo Lứt Huyết Rồng',
      description: 'Giàu dinh dưỡng, chất xơ và chất chống oxy hóa, tốt cho sức khỏe tim mạch.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an"],
    },
    {
      name: 'Gạo Nếp Cái Hoa Vàng',
      description: 'Hạt to tròn, dẻo thơm đặc trưng, chuyên dùng để nấu xôi, chè, làm bánh.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an","gao-thong-dung"],
    },
    {
      name: 'Gạo Tấm Dẻo',
      description: 'Loại gạo tấm đặc sản, mềm dẻo, rất thích hợp để nấu cơm tấm sườn bì chả.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an","gao-nguyen-lieu"],
    },
    {
      name: 'Gạo Hữu Cơ Hoa Sữa',
      description: 'Canh tác theo quy trình hữu cơ nghiêm ngặt, không hóa chất, an toàn cho cả gia đình.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an"],
    },
    {
      name: 'Gạo Nhật Japonica',
      description: 'Hạt gạo tròn, dẻo, vị ngọt nhẹ, lý tưởng để làm sushi và các món ăn Nhật Bản.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an","gao-thong-dung"],
    },
    {
      name: 'Gạo Sạch Vua Gạo',
      description: 'Gạo sạch được kiểm định chất lượng, đảm bảo không có dư lượng thuốc trừ sâu.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an","gao-cam-trau","gao-nguyen-lieu"],
    },
    {
      name: 'Gạo Thơm Lài Miên',
      description: 'Giống gạo của Campuchia với hương thơm tự nhiên và độ mềm dẻo tuyệt vời.',
      imageFilename: 'img_eat_rice.png',
      imageType: 'image/png',
      tag:["gao-an","gao-cam-trau"],

    },
  ];

  console.log('Seeding products...');

  for (const productData of productsData) {
    // Read the image file into a Buffer
    const imagePath = path.join(process.cwd(), 'public', productData.imageFilename);
    let imageDataBuffer: Buffer | null = null;
    try {
      imageDataBuffer = fs.readFileSync(imagePath);
    } catch (error) {
      console.log(error)
      console.warn(`Could not read image for ${productData.name}. Image will be null.`);
    }

    await prisma.product.upsert({
      where: { name: productData.name },
      update: {}, // We'll just create, assuming seed is the source of truth
      create: {
        name: productData.name,
        description: productData.description,
        tags: productData.tag,
        imageData: imageDataBuffer, // Store the raw image data
        imageType: productData.imageType, // Store the MIME type
        authorId: adminUser.id,
        slug: toSlug(productData.name),
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