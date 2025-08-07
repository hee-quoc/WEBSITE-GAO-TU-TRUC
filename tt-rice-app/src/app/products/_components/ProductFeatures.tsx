export function ProductFeatures({ features }: { features: number[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Đặc tính sản phẩm</h2>
      <div className="mt-4 grid gap-4">
        {features.map((f, i) => (
          <div key={i} className="flex justify-between border-b pb-2">
            <span>something</span>
            <span>{"⭐".repeat(5)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}