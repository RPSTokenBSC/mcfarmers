import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-black">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
