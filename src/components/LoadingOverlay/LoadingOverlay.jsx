import "./LoadingOverlay.css";

function LoadingOverlay({ show, message }) {

  if (!show) return null;

  return (
    <div className="loading-overlay">

      <div className="loading-box">

        <div className="loading-spinner"></div>

        <h2>{message}</h2>

      </div>

    </div>
  );

}

export default LoadingOverlay;