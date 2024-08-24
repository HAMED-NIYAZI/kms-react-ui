export default function SpinnerGrid() {
  return (
      // <div style={{ marginTop: "100px !important" }}>
      //   <img
      //     src="assets/img/loader.svg"
      //     style={{ animation: "spin 0.6s linear infinite" }}
      //     alt="Loader"
      //   />
      // </div>




<div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "300px !important",
 // height: "100vh", // Set the height to 100% of the viewport
}}>
  <img
    src="assets/img/loader.svg"
 style={  {paddingTop: '50px',
  paddingBottom: '50px'
}}
    alt="Loader"
  />
</div>
  );
}
