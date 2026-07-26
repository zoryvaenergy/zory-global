import "./successModal.css";

export default function SuccessModal({
  open = false,
  memberName = "",
  memberId = "",
  sponsorId = "",
  status = "",
  onContinue,
}) {
  if (!open) return null;

  return (
    <div className="success-overlay">
      <div className="success-modal">

        <div className="success-logo">
    <h2>ZORY GLOBAL</h2>

    
</div>

        <div className="verified-badge">
    VERIFIED MEMBER
</div>

<h3 className="success-title">
    Welcome to
    <br />
    <span>ZORY GLOBAL</span>
</h3>

<p className="success-subtitle">
    Registration completed successfully.
</p>

        <div className="success-divider"></div>

     <div className="success-info">

    <div className="info-row">
        <span>👤 Member Name</span>
        <strong>{memberName}</strong>
    </div>

    <div className="info-row">
        <span>🆔 Member ID</span>
        <strong>{memberId}</strong>
    </div>

    <div className="info-row">
        <span>🤝 Sponsor ID</span>
        <strong>{sponsorId}</strong>
    </div>

    <div className="info-row">
        <span>⭐ Membership</span>
        <strong className="active-status">
            {status}
        </strong>
    </div>

</div>
        <p className="security-note">
    Your account has been created successfully.
</p>
        <button
          className="success-btn"
          onClick={onContinue}
        >
          Continue to Secure Login →
        </button>

      </div>
    </div>
  );
}