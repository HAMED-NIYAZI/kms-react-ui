export default function SpinnerGrid() {
  return (
      <div style={{ marginTop: "100px !important" }}>
        <img
          src="assets/img/loader.svg"
          style={{ animation: "spin 0.6s linear infinite" }}
          alt="Loader"
        />
      </div>
  );
}
