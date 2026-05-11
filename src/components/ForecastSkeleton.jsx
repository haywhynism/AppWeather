// components/ForecastSkeleton.js
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ForecastSkeleton() {
  return (
    <div className="forecast-skeleton d-flex gap-3 mt-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="forecast-item">
          <Skeleton height={20} width={80} style={{ marginBottom: "5px" }} />
          <Skeleton
            circle
            height={50}
            width={50}
            style={{ marginBottom: "5px" }}
          />
          <Skeleton height={20} width={60} />
        </div>
      ))}
    </div>
  );
}

export default ForecastSkeleton;
