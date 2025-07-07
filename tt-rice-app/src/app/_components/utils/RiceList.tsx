import RiceCard from './RiceCard';

const riceItems = [
  { image: '/gao_an.svg', label: 'Gạo Ăn' ,hoverImage: '/gao_an_hover.png'},
  { image: '/gao_thong_dung.svg', label: 'Gạo Thông Dụng' ,hoverImage: '/gao_thong_dung_hover.png'},
  { image: '/gao_nguyen_lieu.svg', label: 'Gạo Nguyên Liệu' ,hoverImage: '/gao_nguyen_lieu_hover.png'},
  { image: '/trau.svg', label: 'Cám/Trấu' ,hoverImage: '/phu_pham_hover.png'},
];


const RiceList = () => {
  return (
    <div className="w-full max-w-[1240px] mx-auto pb-10">
      <div className="flex flex-wrap justify-center sm:justify-between gap-6">
        {riceItems.map((item, idx) => (
          <RiceCard key={idx} image={item.image} label={item.label} hoverImage={item.hoverImage} />
        ))}
      </div>
    </div>
  );
};

export default RiceList;