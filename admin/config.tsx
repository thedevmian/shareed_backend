function CustomLogo() {
  return (
    <h1
      style={{
        fontFamily: "Koulen, Roboto, sans-serif",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#030303",
      }}
    >
      .Shareed Shop.
    </h1>
  );
}

export const components = {
  Logo: CustomLogo,
};
