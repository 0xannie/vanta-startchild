export default function AIPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        background: "#090909",
      }}
    >
      <iframe
        src="https://iamstarchild.com/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
        }}
        title="Starchild AI"
        allow="microphone; camera"
      />
    </div>
  );
}
