export const Loading = () => {
  return (
    <div className="loading-backdrop">
      <div className="spinner-container">
        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}
