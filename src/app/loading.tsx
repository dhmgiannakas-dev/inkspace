import "./loading.css";

/**
 * Displays the global loading state.
 */
export default function Loading() {
  return (
    <main className="loadingPage">
      <div className="loadingSpinner" />
      <p>Loading INKSPACE...</p>
    </main>
  );
}