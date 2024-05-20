export default function ReviewStar({ rating }: { rating: number }) {
  const totalStars = 5;
  const percentage = (rating / totalStars) * 100;

  return (
    <div
      className="relative inline-block overflow-hidden"
      style={{ width: "100px", height: "20px" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full text-gray-300"
        style={{ fontSize: "20px" }}
      >
        {"★".repeat(totalStars)}
      </div>
      <div
        className="absolute top-0 left-0 h-full text-yellow-400 overflow-hidden"
        style={{ fontSize: "20px", width: `${percentage}%` }}
      >
        {"★".repeat(totalStars)}
      </div>
    </div>
  );
}
