function ErrorPage({ statusCode }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#f4f5f2",
        color: "#222826",
        fontFamily: "Plus Jakarta Sans, Avenir Next, Segoe UI, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: "2rem" }}>
          {statusCode || 500}
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#6f7773" }}>
          Something went wrong. Please try again.
        </p>
      </div>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

export default ErrorPage;
