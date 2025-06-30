import Image from 'next/image';
import type { Product } from '@prisma/client';
interface ProductsSectionProps {
  products: Product[];
}
export function ProductsSection({ products }: ProductsSectionProps){
    return (
        <section className="py-20 bg-green-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-dark mb-6">
              Mang tinh hoa vào từng bữa cơm Việt
            </h2>
            <p className="text-2xl text-green-medium">
              Các sản phẩm có tại Tư Trúc
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {products.map((product) => (
            <div key={product.id} className="text-center">
              <div className="mb-6">
                <Image
                  // 5. Use product.imageUrl and provide a fallback if it's null
                  src={product.imageUrl ?? '/default-rice-placeholder.webp'}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="mx-auto object-cover h-[200px]" // Added object-cover for consistent image sizes
                />
              </div>
              <h3 className="text-xl font-medium text-green-dark">
                {product.name}
              </h3>
            </div>
          ))}
          </div>
          <div className="text-center space-y-6">
            <p className="text-gray-light leading-relaxed max-w-4xl mx-auto">
              Tư Trúc tin rằng gạo không chỉ là lương thực để no bụng, mà còn là thức quà để thưởng, để nghiệm, và để tự hào.
            </p>
            <p className="text-gray-light leading-relaxed max-w-4xl mx-auto">
              Mỗi hạt gạo Tư Trúc đều được tinh chọn từ giống lúa chất lượng, canh tác theo quy trình nghiệm ngặt, thu hoạch đúng vụ, và được sàng lọc kỹ lưỡng từ đội ngũ công nhân nhiều năm kinh nghiệm bằng cả chuyên môn lẫn tâm huyết - để đem chất lượng hạt gạo ổn định, hương vị thuần khiết và ngọt lành từ đồng nội đến bữa cơm Việt.
            </p>
          </div>
          {/* Certifications */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-medium text-blue-dark mb-8">Các chứng nhận</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <Image src="/img_group_928.svg" alt="Certification" width={150} height={131} />
              <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center">
                <Image src="/img_7bc2e0f1871f0fcb76c75a55bf9e946a_1.png" alt="Certification" width={66} height={63} />
              </div>
              <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center">
                <Image src="/img_logoocopcuachuongtrinhocopquocgia1_1.png" alt="Certification" width={88} height={36} />
              </div>
              <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center">
                <Image src="/img_image_39.png" alt="Certification" width={88} height={51} />
              </div>
              <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center">
                <Image src="/img_d565e8067f134e55d8999f227ee551ee_1.png" alt="Certification" width={70} height={58} />
              </div>
              <Image src="/img_group_929_light_green_a700.svg" alt="Certification" width={150} height={131} />
            </div>
          </div>
        </div>
      </section>
    )
}