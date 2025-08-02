import Image from 'next/image';
import RiceList from '../utils/RiceList';
export function ProductsSection(){
    return (
        <section className="pt-20 pb-10 bg-[#FBFFF2]">
        <div className="max-w-7xl w-full mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mx-auto mb-12 text-center space-y-3  md:max-w-[639px]  mt-10 sm:mt-[96px]">
          <h2
            className="w-[335px] md:w-full  font-bold text-[42px] sm:text-[42px] md:text-[42px] lg:text-[56px] leading-[96%] text-center font-alegreya-sans"
            style={{ color: "#0A5B89" }}
          >
            Mang tinh hoa <br className="sm:hidden" /> vào từng  <br className="sm:hidden" /> bữa cơm Việt
          </h2>
          <p
            className="font-normal text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] leading-[100%] text-center font-alegreya"
            style={{ color: "#526D1D" }}
          >
            Các sản phẩm có tại Tư Trúc
          </p>
        </div>

        <RiceList />

        <div className="text-center space-y-6 sm:px-0 md:px-8 ">
          <p className="w-[335px] md:w-full text-[14px] sm:text-[15px] md:text-[16px] leading-[140%] text-center text-[#545C6D] px-0 sm:px-0 md:px-6 mx-auto font-fz-poppins  sm:max-w-[640px] md:max-w-[771px]">
            Tư Trúc tin rằng gạo không chỉ là lương thực để no bụng,<br className="hidden sm:inline" />
            mà còn là thức quà <span className='font-bold'>để thưởng, để nghiệm, và để tự hào.</span>
          </p>
          <p className="w-[335px] md:w-full text-[14px] sm:text-[15px] md:text-[16px] leading-[140%] text-[#545C6D] px-0 sm:px-8 mx-auto font-fz-poppins  sm:max-w-[640px] md:max-w-[771px]">
            Mỗi hạt gạo Tư Trúc đều được <span className='font-bold'>tinh chọn từ giống lúa chất lượng,<br  className="hidden sm:inline"/> canh tác theo quy trình nghiệm ngặt, thu hoạch đúng vụ</span>, và <br  className="hidden sm:inline"/><span className='font-bold'>được sàng lọc kỹ lưỡng từ đội ngũ công nhân nhiều năm kinh nghiệm</span><br  className="hidden sm:inline"/> bằng cả chuyên môn lẫn tâm huyết - để đem <span className='font-bold'>chất lượng hạt gạo ổn định, <br  className="hidden sm:inline"/>hương vị thuần khiết và ngọt lành </span>từ đồng nội đến bữa cơm Việt.
          </p>
        </div>
         <div className="mt-16 flex flex-col items-center text-center overflow-x-auto scrollbar-hide rounded-[16px] px-0 sm:px-8 max-w-full sm:max-w-full relative h-[112px]">
          <div className="relative w-[375px] sm:w-full h-full flex flex-col items-center">
            {/* Item 1 */}
            <h3 className="absolute left-[35%] sm:left-[44%] text-[20px] font-[500] font-alegreya-sans " style={{color:"#0A5B89"}}>Các chứng nhận</h3>
            <div className="absolute left-[-3%] sm:left-[30%] top-1/2 -translate-y-1/2">
              <Image
                src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/img_group_928.svg"
                alt="Certification"
                width={132}
                height={107}
                className="h-[107px]"
              />
            </div>

            {/* Item 2 */}
            <div className="absolute left-[22%]  sm:left-[40%] top-[55%] -translate-y-1/2 w-[92px] h-[36px] rounded-full flex items-center justify-center">
              <Image
                src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/ocop.png"
                alt="Certification"
                width={92}
                height={36}
                className="w-full h-full"
              />
            </div>

            {/* Item 3 */}
            <div className="absolute left-[61%] sm:left-[51%] top-[55%] -translate-y-1/2 w-[70px] h-[58px] rounded-full flex items-center justify-center">
              <Image
                src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/ISO.png"
                alt="Certification"
                width={70}
                height={58}
                className="w-full h-full"
              />
            </div>

            {/* Item 4 */}
            <div className="absolute left-[75%] sm:left-[56%] top-1/2 -translate-y-1/2">
              <Image
                src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/img_group_929_light_green_a700.svg"
                alt="Certification"
                width={115}
                height={107}
                className="h-[107px]"
              />
            </div>
          </div>
        </div>
      </div>
      </section>
    )
}