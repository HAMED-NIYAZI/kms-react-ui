export default function SpinnerGrid() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "300px !important",
      }}
    >
      <img
        src="assets/img/loader.svg"
        style={{ paddingTop: "50px", paddingBottom: "50px" }}
        alt="Loader"
      />
    </div>
  );
}
