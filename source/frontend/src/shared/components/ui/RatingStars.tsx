import { Star, StarHalf } from "lucide-react"; // Dùng icon Bootstrap

export const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = !Number.isInteger(rating);

  return (
    <>
      {/* Sao đầy */}
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <Star key={`full-${i}`} strokeWidth={1} style={{ fill: "yellow" }} />
        ))}

      {/* Sao nửa nếu có */}
      {hasHalfStar && (
        <StarHalf key="half-star" strokeWidth={1} style={{ fill: "yellow" }} />
      )}
    </>
  );
};
