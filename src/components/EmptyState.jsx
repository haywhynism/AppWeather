import cloudAlert from '../assets/images/cloud-alert.png'

function EmptyState() {
  return (
    <div className="empty-state text-center mt-5">
      <img src={cloudAlert} alt="cloud-alert" height={120} />
      <h3 className="mt-3">No Weather data yet!</h3>
      <p className="text-muted">
        {" "}
        Enter a city or state above to fetch the latest weather updates.
      </p>
    </div>
  );
}

export default EmptyState
