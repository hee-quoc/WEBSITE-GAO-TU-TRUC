import Image from "next/image"
export function PartnerSection(){

    return (
        <section className="py-20 bg-white border border-green-light-2 rounded-2xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl text-light-gray mb-8">Đối tác và khách hàng</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Individual Customers */}
            <div className="bg-green-light-1 rounded-2xl p-8">
              <div className="mb-6">
                <Image src="/img_users.svg" alt="Users" width={42} height={42} />
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image src="/img_frame_434.svg" alt="Check" width={22} height={44} />
                  <span className="text-gray-light">Khách hàng lẻ<br />Mạnh thường quân</span>
                </div>
                <div className="flex items-start gap-3">
                  <Image src="/img_frame_394.svg" alt="Check" width={22} height={22} />
                  <span className="text-gray-light">Nhà phân phối<br />Đại lý gạo</span>
                </div>
              </div>
            </div>
            {/* Business Customers */}
            <div className="bg-green-light-1 rounded-2xl p-8">
              <div className="mb-6">
                <Image src="/img_frame_392.svg" alt="Business" width={42} height={42} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Image src="/img_frame_394.svg" alt="Check" width={22} height={22} />
                    <span className="text-gray-light text-sm">Bếp ăn công nghiệp</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image src="/img_frame_394.svg" alt="Check" width={30} height={22} />
                    <span className="text-gray-light text-sm">Cơ quan Nhà nước /Quân đội</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Image src="/img_frame_394.svg" alt="Check" width={22} height={22} />
                    <span className="text-gray-light text-sm">Bệnh viện / Trường học</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image src="/img_frame_394.svg" alt="Check" width={22} height={22} />
                    <span className="text-gray-light text-sm">Nhà hàng / Quán ăn</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Other Partners */}
            <div className="space-y-4">
              <div className="bg-green-light-1 rounded-2xl p-8 h-24 flex items-center">
                <span className="text-gray-light">Cơ sở canh tác / Khác</span>
              </div>
              <div className="bg-green-light-1 rounded-2xl p-8 h-24 flex items-center">
                <span className="text-gray-light">Cơ sở canh tác / Khác</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
