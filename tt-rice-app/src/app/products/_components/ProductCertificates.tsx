import Image from "next/image";

export function ProductCertificates({ certificates }: { certificates: { title: string; imageUrl: string; description: string }[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Chứng nhận quốc tế</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {certificates.map((c, i) => (
          <div key={i} className="border rounded-lg p-4">
            <Image src={c.imageUrl} alt={c.title} width={300} height={200} className="rounded-md" />
            <p className="mt-2 font-semibold">{c.title}</p>
            <p className="text-sm text-gray-600">{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
