function CustomLogo() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <h1
      style={{
        fontFamily: 'Koulen, Roboto, sans-serif',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#030303',
      }}
    >
      .Shareed Shop.
    </h1>
  );
}

// eslint-disable-next-line import/prefer-default-export
export const components = {
  Logo: CustomLogo,
};
