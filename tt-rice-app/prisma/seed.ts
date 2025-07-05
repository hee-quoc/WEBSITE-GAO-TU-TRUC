// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();


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
      description: 'Được mệnh danh là gạo ngon nhất thế giới, hạt dài, trắng trong, không bạc bụng.',
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