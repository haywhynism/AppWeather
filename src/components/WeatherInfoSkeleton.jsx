import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function WeatherInfoSkeleton() {
  return (
    <div className="weather-skeleton card p-3 text-center">
      <Skeleton height={30} width={200} style={{ marginBottom: "10px" }} />
      <Skeleton
        circle
        height={80}
        width={80}
        style={{ marginBottom: "10px" }}
      />
      <Skeleton height={20} width={100} />
      <Skeleton height={20} width={150} />
    </div>
  );
}

export default WeatherInfoSkeleton;
