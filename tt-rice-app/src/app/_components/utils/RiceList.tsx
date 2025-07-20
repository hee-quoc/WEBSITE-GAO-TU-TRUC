import RiceCard from './RiceCard';

const riceItems = [
  { image: '/gao_an.png', label: 'Gạo ăn' ,hoverImage: '/gao_an_hover.png', slug:'gao-an'},
  { image: '/gao_thong_dung.png', label: 'Gạo thông dụng' ,hoverImage: '/gao_thong_dung_hover.png',slug:'gao-thong-dung'},
  { image: '/gao_nguyen_lieu.png', label: 'Gạo nguyên liệu' ,hoverImage: '/gao_nguyen_lieu_hover.png',slug:'gao-nguyen-lieu'},
  { image: '/trau.png', label: 'Phụ phẩm' ,hoverImage: '/phu_pham_hover.png',slug:'gao-cam-trau'},
];


const RiceList = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto pb-10">
      {/* Layout cho mobile: scroll ngang */}
      <div className="flex sm:hidden overflow-x-auto gap-4 px-4 w-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
        {riceItems.map((item, idx) => (
          <div key={idx} className="flex-shrink-0">
            <RiceCard
              image={item.image}
              label={item.label}
              hoverImage={item.hoverImage}
              slug={item.slug}
            />
          </div>
        ))}
      </div>

      {/* Layout cho PC: lưới 2 hàng hoặc chia đều */}
      <div className="hidden sm:flex flex-wrap justify-center sm:justify-between gap-6">
        {riceItems.map((item, idx) => (
          <RiceCard
            key={idx}
            image={item.image}
            label={item.label}
            hoverImage={item.hoverImage}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default RiceList;