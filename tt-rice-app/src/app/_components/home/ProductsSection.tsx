import Image from 'next/image';
import RiceList from '../utils/RiceList';
export function ProductsSection(){
    return (
        <section className="py-20 bg-green-lightest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 text-center space-y-3 max-w-[95%] sm:max-w-[639px] mt-10 sm:mt-[96px]">
          <h2
            className="font-bold text-[32px] sm:text-[56px] leading-[100%] text-center font-alegreya-sans"
            style={{ color: "#0A5B89" }}
          >
            Mang tinh hoa vào từng bữa cơm Việt
          </h2>
          <p
            className="text-[20px] sm:text-[32px] font-normal leading-[140%] text-center font-alegreya-sans"
            style={{ color: "#00A86B" }}
          >
            Các sản phẩm có tại Tư Trúc
          </p>
        </div>

        <RiceList />

        <div className="text-center space-y-6 px-4">
          <p className="text-[16px] leading-[140%] text-gray-600 max-w-4xl mx-auto font-fzpoppins-sans-sans-serif">
            Tư Trúc tin rằng gạo không chỉ là lương thực để no bụng, mà còn là thức quà để thưởng, để nghiệm, và để tự hào.
          </p>
          <p className="text-[16px] leading-[140%] text-gray-600 max-w-4xl mx-auto font-fzpoppins-sans-sans-serif">
            Mỗi hạt gạo Tư Trúc đều được tinh chọn từ giống lúa chất lượng, canh tác theo quy trình nghiệm ngặt, thu hoạch đúng vụ, và được sàng lọc kỹ lưỡng từ đội ngũ công nhân nhiều năm kinh nghiệm bằng cả chuyên môn lẫn tâm huyết - để đem chất lượng hạt gạo ổn định, hương vị thuần khiết và ngọt lành từ đồng nội đến bữa cơm Việt.
          </p>
        </div>
         <div className="mt-16 text-center overflow-x-auto scrollbar-hide">
          <h3 className="text-xl font-medium text-blue-dark mb-8">Các chứng nhận</h3>
          <div className="flex flex-nowrap justify-start items-center gap-4 sm:gap-6 md:gap-8 px-4 w-max mx-auto">
            {/* Item 1 */}
            <div className="flex justify-center items-center flex-shrink-0">
              <Image
                src="/img_group_928.svg"
                alt="Certification"
                width={100}
                height={100}
                className="w-[56px] sm:w-[80px] md:w-[100px] h-auto"
              />
            </div>

            {/* Item 2 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/img_7bc2e0f1871f0fcb76c75a55bf9e946a_1.png"
                alt="Certification"
                width={40}
                height={40}
                className="w-[32px] sm:w-[40px] h-auto"
              />
            </div>

            {/* Item 3 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/img_logoocopcuachuongtrinhocopquocgia1_1.png"
                alt="Certification"
                width={60}
                height={36}
                className="w-[50px] sm:w-[60px] h-auto"
              />
            </div>

            {/* Item 4 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/img_image_39.png"
                alt="Certification"
                width={60}
                height={51}
                className="w-[50px] sm:w-[60px] h-auto"
              />
            </div>

            {/* Item 5 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/img_d565e8067f134e55d8999f227ee551ee_1.png"
                alt="Certification"
                width={50}
                height={50}
                className="w-[40px] sm:w-[50px] h-auto"
              />
            </div>

            {/* Item 6 */}
            <div className="flex justify-center items-center flex-shrink-0">
              <Image
                src="/img_group_929_light_green_a700.svg"
                alt="Certification"
                width={100}
                height={100}
                className="w-[56px] sm:w-[80px] md:w-[100px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    )
}