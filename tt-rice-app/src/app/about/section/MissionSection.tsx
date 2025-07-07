"use client";

import Image from "next/image";
import React, { useState , useEffect} from "react";
const backgroundImages = [
  '/vision_background.png',
  '/vision_background_2.png',
  // '/vision_background.png',
]; // Add your actual image paths here (place in public folder)

const textContent = [
  {
    heading: 'Củng cố vị trí tại thị trường Đông Nam Bộ và hướng đến cung ứng gạo toàn quốc',
    paragraph:
      'Từ Trúc hướng đến việc củng cố vị thế tại thị trường Đông Nam Bộ, và vươn mình trở thành "thương hiệu quốc dân" - có mặt trong mỗi căn bếp Việt, trở thành biểu tượng cho chất lượng và sự an tâm trong từng bữa ăn.',
  },
  {
    heading: "Lan toả tinh hoa gạo Việt\ntừ cánh đồng đến bàn ăn",
    paragraph:
      'Tư Trúc không chỉ nâng tầm giá trị hạt gạo Việt, mà còn gìn giữ di sản lúa nước ngàn đời - nơi hội tụ tinh hoa đất trời, bàn tay người nông dân và tri thức khoa học, để gửi trao vào từng bữa ăn.',
  },
  // {
  //   heading: 'Mở rộng xuất khẩu ra thị trường quốc tế',
  //   paragraph:
  //     'Đưa sản phẩm gạo Việt chất lượng cao vươn xa hơn trên bản đồ thế giới, xây dựng thương hiệu uy tín trong mắt người tiêu dùng toàn cầu.',
  // },
];


const coreValues = [
  {
    title: 'Vững đầu ra cho nông dân',
    description:
      'Tôn trọng người nông dân gìn giữ nghề truyền thống; hỗ trợ kỹ thuật và công nghệ vào sản xuất, đảm bảo đầu ra ổn định, nâng cao thu nhập bền vững.',
  },
  {
    title: 'Vững chất lượng sản phẩm',
    description: 'Không ngừng nghiên cứu, ứng dụng khoa học - công nghệ để tạo ra những sản phẩm gạo đạt chất lượng ổn định, tối ưu hương vị và dinh dưỡng.',
  },
  {
    title: 'Vững cân bằng môi trường',
    description: 'Kiên trì với mô hình sản xuất tuần hoàn, tiết kiệm tài nguyên, giảm thiểu phát thải, tái chế phụ phẩm - bảo vệ hệ sinh thái bền vững lâu dài.',
  },
  {
    title: 'Vững lan toả giá trị văn hoá',
    description: 'Lan tỏa câu chuyện hạt gạo Việt - kết tinh từ đất mẹ, từ bàn tay người Việt, lưu giữ và tôn vinh nền văn minh lúa nước ngàn đời.',
  },
  // Thêm các giá trị khác tương tự
];

export function MissionSection() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  if (index == 2){
    setIndex(0)
  }
  return (
    <section className="pt-20 pb-5 bg-white">
      <div className="flex justify-center flex-col md:flex-row items-start  max-w-[1122px] mx-auto  py-8  "> 
            {/* Left Column: Title */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="font-alegreya-sans text-blue-900 text-[56px] font-bold leading-snug">
                Sứ mệnh <br className="hidden sm:block" />
                tôn vinh <br className="hidden sm:block" />
                hạt ngọc thực
              </h2>
            </div>

            {/* Right Column: Content */}
          <div className="w-full md:w-1/2 relative">
            <h3 className="font-alegreya-sans text-[32px]  sm:text-xl md:text-[32px] font-medium mb-4" style={{color:"#667085"}}>
              Giá trị của hạt gạo qua lăng kính của Từ Trúc
            </h3>

            <div className="relative">
              {/* Quote image placed behind paragraph */}
              <div className="absolute -top-2 -left-11 w-14 h-10  opacity-30 pointer-events-none">
              <Image src="/img_.svg" alt="Quote" width={34} height={24} />
              </div>
              <p className="font-fz-poppins text-[16px] sm:text-xl md:text-[16px] text-gray-600 text-justify leading-relaxed max-w-[741px]">
                Với nhiều người, gạo chỉ đơn thuần là lương thực để no bụng. <br /> Nhưng với Từ Trúc, đó là kết tinh của đất trời hào phóng,<br />
                đôi tay cần mẫn của người nông dân, sự kỹ lưỡng, chỉn chu <br /> trong từng công đoạn của người công nhân và hơn hết,<br />
                đó còn là niềm tự hào về nền văn minh lúa nước ngàn đời.
              </p>
            </div>
          </div>
        </div>
        <div className="relative bg-cover bg-center text-white overflow-hidden rounded-[16px] mx-auto w-full max-w-[1122px] h-[509px] md:h-[509px] opacity-100">
          <div className={`flex flex-col justify-between inset-0 backdrop-blur-sm w-full h-full items-center text-center px-4 py-6 md:px-12 md:py-12 transition-opacity duration-1000 `}
          style={{ backgroundImage: `url(${backgroundImages[index]})` ,
                  transition: "opacity 0.8s ease-in-out",
                  opacity: fade ? 100 : 0,
                  
          }} >
            <div className="flex flex-col items-center">
              <div className="flex flex-row">
                <Image src="/vision_right_icon.svg" alt="Quote" width={18} height={8} />
                <p className="font-fz-poppins text-sm font-medium tracking-wide uppercase  px-2" style={{color:"#89A751"}}>
                  Tầm nhìn | Vision
                </p>
                <Image src="/vision_left_icon.svg" alt="Quote" width={18} height={8} />
              </div>
             <h2 className={`font-alegreya-sans text-[32px] sm:text-[16px] md:text-[32px]  mb-4 max-w-[549px] transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`} style={{color:"#0A5B89"}}>
                {textContent[index]?.heading
                  ? textContent[index].heading.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  : null}
              </h2>
              <p className={`max-w-[595px] font-fz-poppins  text-white text-[16px] sm:text-[8px] md:text-[16px] max-w-[90%] mb-6 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`} style={{color:"#5C6578"}}>
                {textContent[index]?.paragraph}
              </p>
            </div>
            {/* Pagination Dots as images */}
            <div className="flex gap-2">
              {backgroundImages.map((_, i) => (
                <img
                  key={i}
                  src={i === index ? '/Pagination_current.svg' : '/Pagination.svg'}
                  alt={`dot-${i}`}
                  className="w-4 h-4 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Core Values Accordion Section */}
        <div className="max-w-[1122px] mx-auto px-4 py-12 flex flex-col md:flex-row gap-6">
          <h3 className="text-[#54585A] text-lg font-semibold md:w-1/4 font-alegreya-sans">Giá trị cốt lõi</h3>
          <div className="md:w-3/4 space-y-4">
            {coreValues.map((item, idx) => (
              <div key={idx} className={`border-b-1 ${idx === openIndex ? "py-8": "py-4" }`}
              style = {{borderColor: "#CCCFD5"}}>
                <button
                  onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                  className="w-full flex items-start justify-between text-left text-green-900 font-semibold focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <img src="/lotus.svg" alt="lotus" className="w-10 h-10" />
                    <span className="font-alegreya-sans">{item.title}</span>
                  </div>
                  <Image
                    src={openIndex === idx ? '/arrow_up.svg' : '/arrow_down.svg'}
                    alt="toggle-icon"
                    width={12}
                    height={5}
                  />
                </button>
                {openIndex === idx && (
                  <p className="mt-2 text-gray-600 text-sm md:text-base font-alegreya-sans ml-12">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
