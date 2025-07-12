import Image from 'next/image';
import RiceList from '../utils/RiceList';
export function ProductsSection(){
    return (
        <section className="pt-20 pb-10 bg-green-lightest">
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

        <div className="text-center space-y-6 px-8 ">
          <p className="text-[16px] leading-[140%] text-gray-600 px-18 mx-auto font-fz-poppins max-w-[771px]">
            Tư Trúc tin rằng gạo không chỉ là lương thực để no bụng,<br /> mà còn là thức quà <span className='font-bold'>để thưởng, để nghiệm, và để tự hào.</span>
          </p>
          <p className="text-[16px] leading-[140%] text-gray-600  px-8 mx-auto font-fz-poppins max-w-[771px]">
            Mỗi hạt gạo Tư Trúc đều được <span className='font-bold'>tinh chọn từ giống lúa chất lượng,<br /> canh tác theo quy trình nghiệm ngặt, thu hoạch đúng vụ</span>, và <br /><span className='font-bold'>được sàng lọc kỹ lưỡng từ đội ngũ công nhân nhiều năm kinh nghiệm</span><br /> bằng cả chuyên môn lẫn tâm huyết - để đem <span className='font-bold'>chất lượng hạt gạo ổn định, <br />hương vị thuần khiết và ngọt lành </span>từ đồng nội đến bữa cơm Việt.
          </p>
        </div>
         <div className="mt-16 text-center overflow-x-auto scrollbar-hide">
          <h3 className="text-[20px] font-medium font-alegreya-sans" style={{color:"#0A5B89"}}>Các chứng nhận</h3>
          <div className="flex flex-nowrap justify-start items-center gap-2 sm:gap-2 md:gap-2 pl-4 pr-6 w-max mx-auto">
            {/* Item 1 */}
            <div className="flex justify-center items-center flex-shrink-0">
              <Image
                src="/img_group_928.svg"
                alt="Certification"
                width={132}
                height={107}
                className='h-[107]'
              />
            </div>

            {/* Item 2 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/ocop.png"
                alt="Certification"
                width={92}
                height={36}
                className='w-[92] h-[36]'
              />
            </div>

            {/* Item 3 */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center flex-shrink-0">
              <Image
                src="/ISO.png"
                alt="Certification"
                width={70}
                height={58}
                className='w-[70] h-[58]'
              />
            </div>

            {/* Item 6 */}
            <div className="flex justify-center items-center flex-shrink-0">
              <Image
                src="/img_group_929_light_green_a700.svg"
                alt="Certification"
                width={115}
                height={107}
                className='h-[107]'
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    )
}