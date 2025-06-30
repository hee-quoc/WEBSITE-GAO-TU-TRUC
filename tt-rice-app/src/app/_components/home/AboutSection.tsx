
import Image from 'next/image';
import Button from '../ui/Button';
export function AboutSection() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute left-32 bottom-0">
          <Image src="/favicon.ico" alt="Decorative" width={442} height={68} />
        </div>
        <div className="absolute right-32 top-20">
          <Image src="/favicon.ico" alt="Decorative" width={183} height={68} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-dark mb-6">
              Hành trình nâng tầm giá trị gạo Việt
            </h2>
            <p className="text-2xl text-gray-light mb-8">
              Câu chuyện truyền cảm hứng từ Tư Trúc
            </p>
            <Button size="large">
              Tìm hiểu thêm
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="text-center">
                <Image
                  src="/favicon.ico"
                  alt="Tu Truc Story"
                  width={249}
                  height={249}
                  className="mx-auto mb-6"
                />
                <p className="text-slate leading-relaxed">
                  Câu chuyện về Tư Trúc bắt đầu từ hơn 3 thập kỉ trước tại một nhà máy xay xát lúa, với một niềm tự hào về việc giữ gìn nền văn minh lúa nước ngàn năm và nâng tầm, lan tỏa giá trị của hạt ngọc thực đến với mỗi người Việt
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <Image
                  src="/favicon.ico"
                  alt="Rice Field Illustration"
                  width={506}
                  height={573}
                  className="w-full h-auto"
                />
                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-primary rounded-full border-8 border-green-light-2"></div>
                <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-green-primary rounded-full border-8 border-green-light-2"></div>
                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-green-primary rounded-full border-8 border-green-light-2"></div>
              </div>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Image
              src="/favicon.ico"
              alt="Tu Truc Heritage"
              width={300}
              height={300}
              className="mx-auto mb-8"
            />
            <p className="text-slate leading-relaxed max-w-4xl mx-auto">
              Với Tư Trúc, gạo là kết tinh từ sự ưu ái của thiên nhiên, từ đôi bàn tay cần mẫn của người nông dân và công nhân nhà máy, từ những giá trị luôn bền bỉ theo thời gian.
            </p>
          </div>
          <div className="mt-12 text-center">
            <p className="text-slate leading-relaxed max-w-4xl mx-auto">
              Chỉnh vì lẽ đó, suốt hành trình phát triển, bên cạnh việc không ngừng nâng cấp chất lượng sản phẩm và hiện đại hóa hệ thống máy móc, Tư Trúc vẫn luôn đặt trọng tâm vào việc tôn vinh thức quà tinh túy này - để mỗi hạt gạo không chỉ là một phần không thể thiếu của gian bếp, mà còn trở thành ký ức, nguồn cội, văn hóa và bản sắc Việt
            </p>
          </div>
        </div>
      </section>
    )
}
