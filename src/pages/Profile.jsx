import { useEffect, useState } from "react";

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  if (!userData) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050b25",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading Profile...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b25",
        padding: "30px",
        color: "#fff",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          background: "#101935",
          border: "1px solid #26365f",
          borderRadius: "18px",
          padding: "30px",
          maxWidth: "750px",
        }}
      >
        <h2>Personal Information</h2>

        <hr
          style={{
            borderColor: "#26365f",
            margin: "20px 0",
          }}
        />

        <p>
          <strong>Full Name :</strong>{" "}
          {userData.profile?.fullName}
        </p>

        <p>
          <strong>User ID :</strong>{" "}
          {userData.profile?.userId}
        </p>

        <p>
          <strong>Sponsor ID :</strong>{" "}
          {userData.profile?.sponsorId || "ROOT USER"}
        </p>

        <p>
          <strong>Mobile :</strong>{" "}
          {userData.profile?.mobile}
        </p>

        <p>
          <strong>Email :</strong>{" "}
          {userData.auth?.email}
        </p>

        <br />

        <h2>Account Information</h2>

        <hr
          style={{
            borderColor: "#26365f",
            margin: "20px 0",
          }}
        />

        <p>
          <strong>Join Date :</strong>{" "}
          {userData.profile?.joinDate}
        </p>

        <p>
          <strong>Join Time :</strong>{" "}
          {userData.profile?.joinTime}
        </p>

        <p>
          <strong>Status :</strong>{" "}
          {userData.auth?.status}
        </p>
      </div>
    </div>
  );
}

export default Profile;