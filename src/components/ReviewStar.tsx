export default function ReviewStar({
  rating,
  height = 20,
  fontsize = 18,
}: {
  rating: number;
  height?: number;
  fontsize?: number;
}) {
  const totalStars = 5;
  const percentage = (rating / totalStars) * 100;

  return (
    <div
      className="relative inline-flex overflow-hidden"
      style={{ width: "80px", height: `${height}px` }}
    >
      <div
        className="absolute left-0 top-0 w-full text-gray-300"
        style={{ fontSize: `${fontsize}px` }}
      >
        {"★".repeat(totalStars)}
      </div>
      <div
        className="absolute left-0 top-0 h-full overflow-hidden text-yellow-400"
        style={{ fontSize: `${fontsize}px`, width: `${percentage}%` }}
      >
        {"★".repeat(totalStars)}
      </div>
    </div>
  );
}
