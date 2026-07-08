import "./ProgressBar.css";

export default function ProgressBar({ value, size = "md", showLabel = true }) {
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      {showLabel && (
        <div className="progress-bar__label">
          <span>Progress</span>
          <span className="progress-bar__value">{value}%</span>
        </div>
      )}
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}