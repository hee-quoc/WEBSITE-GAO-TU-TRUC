import type { Testimonial } from "~/app/types/Types"
import Image from "next/image"
export function Testimonial(){
    const testimonial: Testimonial = {
        id: '1',
        content: 'Làm lúc bao nhiêu năm nay, tôi hiểu rõ từng hạt gạo mình làm ra. Từ lúc gieo mạ đến ngày thu hoạch, đều tự tay chăm chút. Thành ra, bao năm nay tôi chỉ ăn mỗi gạo Tư Trúc, vì tôi biết chắc từng hạt cơm sạch sẽ, tử tế như chính công sức mình bỏ vào.',
        author: 'Anh Năm Tiến (37 tuổi)',
        position: 'Nông dân Long Điền',
        avatar: '/img_ellipse_15.png'
    };
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-medium text-green-medium">
                Mọi người nghĩ gì về Tư Trúc
              </h2>
            </div>
            <div className="bg-white border border-green-light-1 rounded-2xl p-8">
              <div className="flex gap-8 mb-8">
                <Image src="/img_.svg" alt="Quote" width={56} height={39} />
                <p className="text-gray-light leading-relaxed flex-1">
                  {testimonial.content}
                </p>
                <div className="w-px bg-gray-light"></div>
                <div className="text-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={56}
                    height={56}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-xl font-medium text-blue-dark mb-1">
                    {testimonial.author}
                  </h4>
                  <p className="text-gray-muted">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <Image src="/img_pagination_blue_gray_100_01.svg" alt="Pagination" width={78} height={18} />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}