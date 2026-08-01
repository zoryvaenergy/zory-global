import MatrixCard from "./MatrixCard";

function MatrixList({ onSelectMatrix }) {
  const matrices = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    status: index === 0 ? "Active" : "Locked",
  }));

  return (
    <div
      style={{
        marginTop: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
      }}
    >
      {matrices.map((matrix) => (
        <div
          key={matrix.id}
          onClick={() => {
            if (matrix.status === "Active") {
              onSelectMatrix(matrix.id);
            }
          }}
        >
          <MatrixCard
            matrixNo={matrix.id}
            status={matrix.status}
            currentStep={matrix.status === "Active" ? 1 : 0}
            totalSteps={4}
            progress={matrix.status === "Active" ? 35 : 0}
            partners={matrix.status === "Active" ? 2 : 0}
          />
        </div>
      ))}
    </div>
  );
}

export default MatrixList;