export function ProductInfo({ product }: { product: any }) {
  return (
    <div>
      <h1 className="text-[56px] font-bold text-steel-blue ">{product.title}</h1>
      <p>
        {product.description}
      </p>
      <div className="mt-4 rounded-lg text-green-500 bg-green-50 w-[119px] text-[20px]">
        <p>
          Giá: <span>Liên hệ</span>
        </p>
      </div>
    </div>
  );
}
