import Image from "next/image"
import Button from "../ui/Button"
import type { Testimonial } from "~/app/types/Types";
export function StatisticSection(){
    
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-blue-dark mb-6">
                Ươm hạt gạo, nuôi mạch nguồn Việt Nam
              </h2>
              <p className="text-2xl text-gray-light mb-8">
                Những giá trị mà hạt gạo Tư Trúc đã mang lại
              </p>
              <Button size="large">
                Xem thêm
              </Button>
            </div>
            <div>
              <Image
                src="/img_rectangle_3.png"
                alt="Rice Field"
                width={587}
                height={327}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Statistics */}
            <div className="bg-cream rounded-2xl overflow-hidden relative">
              <Image
                src="/img_image_104.png"
                alt="Farmers"
                fill
                className="object-cover"
              />
              <div className="relative z-10 p-8 text-white">
                <div className="mb-8">
                  <div className="text-6xl font-bold mb-4">&gt;300</div>
                  <p className="text-green-lightest-2">
                    Hộ nông dân tại các vùng canh tác đang<br />
                    hợp tác cùng Tư Trúc
                  </p>
                </div>
                <div>
                  <div className="text-6xl font-bold mb-4">10%</div>
                  <p className="text-green-lightest-2">
                    Thu nhập bình quân tăng 10% nhờ thu mua<br />
                    ổn định & giá thu cao hơn thị trường
                  </p>
                </div>
              </div>
            </div>
            {/* Right Statistics */}
            <div className="space-y-8">
              <div className="bg-green-primary rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-6xl font-bold mb-4">&gt;100</div>
                    <p className="text-green-lightest-1">
                      Trên 100 HA diện tích được<br />
                      áp dụng quy trình canh tác sạch, không hóa chất độc hại...
                    </p>
                  </div>
                  <div>
                    <div className="text-6xl font-bold mb-4">70%</div>
                    <p className="text-green-lightest-1">
                      Giảm 70% lượng thuốc bảo vệ thực phẩm hữu so với canh tác truyền thống
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl p-8 relative overflow-hidden">
                <Image
                  src="/img__1.png"
                  alt="Environment"
                  fill
                  className="object-cover"
                />
                <div className="relative z-10 text-white">
                  <div className="text-6xl font-bold mb-4">100%</div>
                  <p className="text-green-lightest-2">
                    Tận dụng 100% phụ phẩm (trấu, cám, tro..) tái chế làm phân bón hữu cơ và thức ăn chăn nuôi. Góp phần giảm<br />
                    chất thải và gìn giữ môi trường
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    )
}