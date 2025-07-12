import RiceCard from './RiceCard';

const riceItems = [
  { image: '/gao_an.svg', label: 'Gạo Ăn' ,hoverImage: '/gao_an_hover.png', slug:'gao-an'},
  { image: '/gao_thong_dung.svg', label: 'Gạo thông dụng' ,hoverImage: '/gao_thong_dung_hover.png',slug:'gao-thong-dung'},
  { image: '/gao_nguyen_lieu.svg', label: 'Gạo nguyên liệu' ,hoverImage: '/gao_nguyen_lieu_hover.png',slug:'gao-nguyen-lieu'},
  { image: '/trau.svg', label: 'Phụ phẩm' ,hoverImage: '/phu_pham_hover.png',slug:'gao-cam-trau'},
];


const RiceList = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto pb-10">
      <div className="flex flex-wrap justify-center sm:justify-between gap-6">
        {riceItems.map((item, idx) => (
          <RiceCard key={idx} image={item.image} label={item.label} hoverImage={item.hoverImage} slug={item.slug}/>
        ))}
      </div>
    </div>
  );
};

export default RiceList;