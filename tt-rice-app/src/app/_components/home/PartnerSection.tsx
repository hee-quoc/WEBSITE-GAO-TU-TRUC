import Image from "next/image"
export function PartnerSection(){

    return (
       <section className=" pt-10 pb-20 bg-[#FBFFF2] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center">
        <div
          className="bg-cover bg-center bg-no-repeat py-8 px-4 sm:px-6 lg:px-8 rounded-2xl mx-4 sm:mx-6 lg:mx-8 max-w-[1119px] max-h-[350px]"
          style={{ backgroundImage: 'url("/class_background.jpg")' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-2 sm:mb-2">
              <h2 className="text-[32x] sm:text-[32px] font-[400] font-alegreya opacity-90" style={{color: "#F0F1F3"}}>
                Đối tác và khách hàng
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:gap-6">
              {/* Khách hàng lẻ */}
              <div className="flex-shrink-0 w-full sm:w-[264px] h-auto sm:h-[200px] rounded-[16px] p-6 flex flex-col bg-[#EDF5DC] shadow-md">
                <div className="mb-2">
                  <Image src="/img_users.svg" alt="Users" width={41} height={26} />
                </div>
                <ul className="space-y-0 text-green-dark text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg font-fz-poppins">•</span>
                    <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Khách hàng lẻ</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg font-fz-poppins">•</span>
                    <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Mạnh thường quân</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg font-fz-poppins">•</span>
                    <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Nhà phân phối / <br /> Đại lý gạo</p>
                  </li>
                </ul>
              </div>

              {/* Bếp ăn công nghiệp */}
              <div className="flex-shrink-0 w-full sm:w-[470px] h-auto sm:h-[200px] rounded-[16px] p-6 grid grid-cols-1 bg-[#EDF5DC] shadow-md">
                <div className="mt-2">
                  <Image src="/img_building.svg" alt="Business" width={29} height={29} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <ul className="space-y-0 text-green-dark text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-normal text-lg font-fz-poppins">•</span>
                      <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Bếp ăn công nghiệp</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-normal text-lg font-fz-poppins">•</span>
                      <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Cơ quan Nhà nước / Quân đội</p>
                    </li>
                  </ul>
                  <ul className="space-y-0 text-green-dark text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-normal text-lg font-fz-poppins">•</span>
                    <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Bệnh viện / Trường học</p> 
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-normal text-lg font-fz-poppins">•</span>
                      <p className= "text-[16px] font-fz-poppins"style={{color:"#667085"}}>Nhà hàng / Quán ăn</p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Cơ sở sản xuất & canh tác */}
              <div className="flex flex-col sm:flex-col gap-4 flex-shrink-0 w-full sm:w-auto">
                <div className="w-full sm:w-[264px] h-auto sm:h-[91.5px] rounded-[16px] px-5 py-[25px] flex items-center bg-[#EDF5DC] shadow-md">
                  <Image
                    src="/img_factory.svg"
                    alt="Factory"
                    width={27}
                    height={25}
                    className="mr-2"
                  />
                  <span className="text-[16px] font-fz-poppins"style={{color:"#667085"}}>Cơ sở sản xuất</span>
                </div>
                <div className="w-full sm:w-[264px] h-auto sm:h-[91.5px] rounded-[16px] px-5 py-[25px] flex items-center bg-[#EDF5DC] shadow-md">
                  <Image
                    src="/img_farm.svg"
                    alt="Farm"
                    width={24}
                    height={29}
                    className="mr-2"
                  />
                  <span className="text-[16px] font-fz-poppins"style={{color:"#667085"}}>Cơ sở canh tác / Khác</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      </div>
    </section>
  );
}
