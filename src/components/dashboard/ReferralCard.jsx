function ReferralCard({ user }) {

  const referralLink = user?.profile?.userId
  ? `https://zoryglobal.com/register?ref=${user.profile.userId}`
  : "";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral Link Copied");
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join ZORY Global",
        text: "Join my team",
        url: referralLink,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="referral-card">

      <h3>Your Referral Link</h3>

      <input
        value={referralLink}
        readOnly
        className="referral-input"
      />

      <div className="referral-buttons">

        <button onClick={copyLink}>
          📋 Copy
        </button>

        <button onClick={shareLink}>
          📤 Share
        </button>

      </div>

    </div>
  );
}

export default ReferralCard;