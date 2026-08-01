import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      icon: "👥",
      title: "Team",
      path: "/team",
    },
    {
      icon: "💰",
      title: "Wallet",
      path: "/wallet",
    },
    {
      icon: "🪙",
      title: "Token",
      path: "/token",
    },
    {
      icon: "👤",
      title: "Profile",
      path: "/profile",
    },
  ];

  return (
    <div className="quick-actions">

      <h3>Quick Actions</h3>

      <div className="quick-grid">

        {actions.map((item) => (
          <div
            key={item.title}
            className="quick-card"
            onClick={() => navigate(item.path)}
          >
            <div className="quick-icon">
              {item.icon}
            </div>

            <span>{item.title}</span>
          </div>
        ))}

      </div>

    </div>
  );
}

export default QuickActions;