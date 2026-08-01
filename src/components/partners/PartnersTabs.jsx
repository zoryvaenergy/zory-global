import {
  FaUserFriends,
  FaLayerGroup,
  FaProjectDiagram,
} from "react-icons/fa";
import "../../styles/partners/partnersTabs.css";

function PartnersTabs({ activeTab, setActiveTab }) {
  return (
    <div className="partners-tabs">

      <button
        className={activeTab === "direct" ? "tab-btn active" : "tab-btn"}
        onClick={() => setActiveTab("direct")}
      >
        <>
  <FaUserFriends />
  <span>Direct Team</span>
</>
      </button>

      <button
  className={activeTab === "level" ? "tab-btn active" : "tab-btn"}
  onClick={() => setActiveTab("level")}
>
  <>
    <FaLayerGroup />
    <span>Level Team</span>
  </>
</button>

      <button
  className={activeTab === "matrix" ? "tab-btn active" : "tab-btn"}
  onClick={() => setActiveTab("matrix")}
>
  <>
    <FaProjectDiagram />
    <span>Matrix</span>
  </>
</button>

    </div>
  );
}

export default PartnersTabs;