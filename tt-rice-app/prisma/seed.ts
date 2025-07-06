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
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
    tags: ['gao-an'],
  },
  {
    name: 'Gạo Lứt Huyết Rồng',
    description: `
      <p>Gạo Lứt Huyết Rồng, với lớp cám giàu dinh dưỡng, mang lại hương vị thơm ngon, dẻo nhẹ, là lựa chọn lý tưởng cho những ai yêu thích lối sống lành mạnh. Loại gạo này hỗ trợ sức khỏe tim mạch, tiêu hóa và kiểm soát đường huyết.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 80g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
            <td class="border border-slate-300 p-2">> 700g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Chất xơ (Fiber)</td>
            <td class="border border-slate-300 p-2">> 35g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-suc-khoe'],
  },
  {
    name: 'Gạo Nếp Cái Hoa Vàng',
    description: `
      <p>Gạo Nếp Cái Hoa Vàng nổi bật với hạt gạo tròn, dẻo thơm, mang hương vị truyền thống đặc trưng. Loại nếp này là nguyên liệu hoàn hảo cho xôi, chè, bánh chưng, bánh tét, đậm chất văn hóa Việt.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 60g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
            <td class="border border-slate-300 p-2">> 780g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-thong-dung'],
  },
  {
    name: 'Gạo Tấm Dẻo',
    description: `
      <p>Gạo Tấm Dẻo là đặc sản miền Nam, với hạt gạo nhỏ, mềm dẻo, thơm ngon, lý tưởng cho món cơm tấm sườn bì chả trứ danh. Loại gạo này mang đến trải nghiệm ẩm thực đậm chất Việt Nam.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 60g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
            <td class="border border-slate-300 p-2">> 770g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-nguyen-lieu'],
  },
  {
    name: 'Gạo Hữu Cơ Hoa Sữa',
    description: `
      <p>Gạo Hữu Cơ Hoa Sữa được canh tác theo tiêu chuẩn hữu cơ nghiêm ngặt, không sử dụng hóa chất hay thuốc trừ sâu, mang đến hạt gạo tinh khiết, an toàn, phù hợp cho mọi thành viên trong gia đình, đặc biệt là trẻ nhỏ và người lớn tuổi.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 70g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
            <td class="border border-slate-300 p-2">> 740g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-huu-co'],
  },
  {
    name: 'Gạo Nhật Japonica',
    description: `
      <p>Gạo Nhật Japonica với hạt gạo tròn, dẻo, vị ngọt thanh, là lựa chọn hoàn hảo cho các món ăn Nhật Bản như sushi, cơm cuộn, hoặc cơm hộp bento. Hạt gạo giữ được độ bóng và kết cấu đặc trưng sau khi nấu.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 60g</td>
          </tr>
          <tr>
            <td class="border border-slate-300 p-2">Tinh bột (Carbohydrate)</td>
            <td class="border border-slate-300 p-2">> 780g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-thong-dung'],
  },
  {
    name: 'Gạo Sạch Vua Gạo',
    description: `
      <p>Gạo Sạch Vua Gạo được sản xuất và kiểm định theo tiêu chuẩn nghiêm ngặt, đảm bảo không dư lượng thuốc trừ sâu, mang đến hạt gạo sạch, an toàn, phù hợp cho mọi bữa ăn gia đình và các món ăn chế biến đa dạng.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
    tags: ['gao-an', 'gao-cam-trau', 'gao-nguyen-lieu'],
  },
  {
    name: 'Gạo Thơm Lài Miên',
    description: `
      <p>Gạo Thơm Lài Miên, giống gạo đặc sản từ Campuchia, nổi bật với hương thơm tự nhiên và hạt gạo mềm dẻo. Loại gạo này lý tưởng cho cơm trắng hoặc các món ăn cần sự tinh tế, mang đến trải nghiệm ẩm thực độc đáo.</p>
      <div class="text-center font-bold mt-4 mb-2">Hàm lượng dinh dưỡng trong 01kg</div>
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
            <td class="border border-slate-300 p-2">> 760g</td>
          </tr>
        </tbody>
      </table>
    `,
    imageFilename: 'img_eat_rice.png',
    imageType: 'image/png',
    tags: ['gao-an', 'gao-cam-trau'],
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
        tags: productData.tags,
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