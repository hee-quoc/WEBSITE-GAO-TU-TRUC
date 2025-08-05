export function ProductInfo({ product }: { product: any }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <p className="text-lg font-semibold">
          Giá: <span className="text-red-600">Liên hệ</span>
        </p>
        <p className="mt-2 text-gray-700">Vui lòng liên hệ để biết thêm chi tiết</p>
      </div>
      <button className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
        Liên hệ ngay
      </button>
    </div>
  );
}
