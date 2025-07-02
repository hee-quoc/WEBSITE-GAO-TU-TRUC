import RiceCard from './RiceCard';

const riceItems = [
  { image: '/gao_an.svg', label: 'Gạo Ăn' ,hoverImage: '/gao_thong_dung.svg'},
  { image: '/gao_thong_dung.svg', label: 'Gạo Thông Dụng' ,hoverImage: '/trau.svg'},
  { image: '/gao_nguyen_lieu.svg', label: 'Gạo Nguyên Liệu' ,hoverImage: '/gao_thong_dung.svg'},
  { image: '/trau.svg', label: 'Cám/Trấu' ,hoverImage: '/gao_thong_dung.svg'},
];


const RiceList = () => {
  return (
    <div className="w-[1120px] h-[384px] pb-[42px] mx-auto">
      <div className="flex justify-between flex-wrap">
        {riceItems.map((item, idx) => (
          <RiceCard key={idx} image={item.image} label={item.label} hoverImage={item.hoverImage} />
        ))}
      </div>
    </div>
  );
};

export default RiceList;