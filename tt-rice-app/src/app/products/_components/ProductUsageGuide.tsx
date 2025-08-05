export function ProductUsageGuide({ steps }: { steps: { step: number; content: string }[] }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold">Hướng dẫn sử dụng</h2>
      <ul className="mt-4 space-y-3">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-2">
            <span className="font-bold text-green-600">Bước {s.step}:</span>
            <span>{s.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
