import Image from "next/image"
export function PartnerSection(){

    return (
       <section className="py-20 bg-green-lightest bg-cover bg-center bg-no-repeat">
      <div
        className="bg-cover bg-center bg-no-repeat py-16 px-4 sm:px-6 lg:px-8 rounded-2xl mx-4 sm:mx-6 lg:mx-8"
        style={{ backgroundImage: 'url("/class_background.jpg")' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-[20px] sm:text-[24px] text-white font-semibold">
              Đối tác và khách hàng
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:gap-6">
            {/* Khách hàng lẻ */}
            <div className="flex-shrink-0 w-full sm:w-[264px] h-auto sm:h-[200px] rounded-[16px] p-6 flex flex-col bg-[#EDF5DC] shadow-md">
              <div className="mb-4">
                <Image src="/img_users.svg" alt="Users" width={42} height={42} />
              </div>
              <ul className="space-y-3 text-green-dark text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-normal text-lg">•</span>
                  Khách hàng lẻ
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-normal text-lg">•</span>
                  Mạnh thường quân
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-normal text-lg">•</span>
                  Nhà phân phối / Đại lý gạo
                </li>
              </ul>
            </div>

            {/* Bếp ăn công nghiệp */}
            <div className="flex-shrink-0 w-full sm:w-[470px] h-auto sm:h-[200px] rounded-[16px] p-6 grid grid-cols-1 bg-[#EDF5DC] shadow-md">
              <div className="mb-4">
                <Image src="/img_building.svg" alt="Business" width={24} height={24} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <ul className="space-y-3 text-green-dark text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg">•</span>
                    Bếp ăn công nghiệp
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg">•</span>
                    Cơ quan Nhà nước / Quân đội
                  </li>
                </ul>
                <ul className="space-y-3 text-green-dark text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg">•</span>
                    Bệnh viện / Trường học
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-normal text-lg">•</span>
                    Nhà hàng / Quán ăn
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
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span className="text-green-dark text-sm">Cơ sở sản xuất</span>
              </div>
              <div className="w-full sm:w-[264px] h-auto sm:h-[91.5px] rounded-[16px] px-5 py-[25px] flex items-center bg-[#EDF5DC] shadow-md">
                <Image
                  src="/img_farm.svg"
                  alt="Farm"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span className="text-green-dark text-sm">Cơ sở canh tác / Khác</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
