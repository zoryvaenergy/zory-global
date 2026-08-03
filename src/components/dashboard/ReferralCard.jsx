function ReferralCard({ user }) {

  const referralLink = user?.profile?.userId
    ? `${window.location.origin}/?ref=${user.profile.userId}`
    : "";

  const copyLink = async () => {

    if (!referralLink) {
      alert("Referral Link Not Available");
      return;
    }

    try {

      await navigator.clipboard.writeText(referralLink);

      alert("✅ Referral Link Copied");

    } catch {

      const input = document.createElement("textarea");

      input.value = referralLink;

      document.body.appendChild(input);

      input.select();

      document.execCommand("copy");

      document.body.removeChild(input);

      alert("✅ Referral Link Copied");

    }

  };

  const shareLink = async () => {

    if (!referralLink) return;

    // Mobile Native Share
    if (navigator.share) {

      try {

        await navigator.share({

          title: "Join ZORY GLOBAL",

          text: "Join my team on ZORY GLOBAL",

          url: referralLink,

        });

        return;

      } catch (err) {

        console.log(err);

      }

    }

    // WhatsApp Fallback
    window.open(

      `https://wa.me/?text=${encodeURIComponent(referralLink)}`,

      "_blank"

    );

  };

  return (

    <div className="referral-card">

      <h3>Your Referral Link</h3>

      <input
        type="text"
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