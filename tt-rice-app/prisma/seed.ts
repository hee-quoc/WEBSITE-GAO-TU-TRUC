// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const username = 'admin';
  const defaultPassword = 'password'; // The administrator will change this

  // Hash the default password before storing it
  const hashedPassword = await hash(defaultPassword, 12);

  // Use `upsert` to create the user only if they don't exist
  // This makes the seed script safe to run multiple times.
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
      tags: ['premium', 'long-grain', 'fragrant'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Lứt Huyết Rồng',
      description: 'Giàu dinh dưỡng, chất xơ và chất chống oxy hóa, tốt cho sức khỏe tim mạch.',
      tags: ['healthy', 'brown-rice', 'high-fiber'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Nếp Cái Hoa Vàng',
      description: 'Hạt to tròn, dẻo thơm đặc trưng, chuyên dùng để nấu xôi, chè, làm bánh.',
      tags: ['sticky-rice', 'traditional'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Tấm Dẻo',
      description: 'Loại gạo tấm đặc sản, mềm dẻo, rất thích hợp để nấu cơm tấm sườn bì chả.',
      tags: ['broken-rice', 'specialty'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Hữu Cơ Hoa Sữa',
      description: 'Canh tác theo quy trình hữu cơ nghiêm ngặt, không hóa chất, an toàn cho cả gia đình.',
      tags: ['organic', 'safe', 'family'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Nhật Japonica',
      description: 'Hạt gạo tròn, dẻo, vị ngọt nhẹ, lý tưởng để làm sushi và các món ăn Nhật Bản.',
      tags: ['sushi-rice', 'japanese-style'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Sạch Vua Gạo',
      description: 'Gạo sạch được kiểm định chất lượng, đảm bảo không có dư lượng thuốc trừ sâu.',
      tags: ['clean', 'certified'],
      svgFilename: 'img_eat_rice.svg',
    },
    {
      name: 'Gạo Thơm Lài Miên',
      description: 'Giống gạo của Campuchia với hương thơm tự nhiên và độ mềm dẻo tuyệt vời.',
      tags: ['fragrant', 'cambodian'],
      svgFilename: 'img_eat_rice.svg',
    },
  ];

  console.log('Seeding products...');

  // Loop through the product data and create each product
  for (const productData of productsData) {
    const svgPath = path.join(process.cwd(), 'public', productData.svgFilename);
    let svgContent = null;

    try {
      // Read the SVG file content as a string
      svgContent = fs.readFileSync(svgPath, 'utf-8');
      console.log(`Successfully read ${productData.svgFilename}`);
    } catch (error) {
      // If a file is missing, we log a warning but don't stop the seed process
      console.warn(`Warning: Could not read file for ${productData.name} at ${svgPath}. SVG content will be null.`);
    }

    // Use `upsert` for products to make the seed script re-runnable
    await prisma.product.upsert({
      where: { name: productData.name },
      update: {}, // Don't update anything if the product already exists
      create: {
        name: productData.name,
        description: productData.description,
        tags: productData.tags,
        svgContent: svgContent,
        svgFilename: productData.svgFilename,
        authorId: adminUser.id, // Associate the product with the admin user
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