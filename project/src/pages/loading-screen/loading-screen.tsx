import './loading-screen.css';

function LoadingScreen(): JSX.Element | null {
  return (
    <div className="loader" data-testid="loading"></div>
  );
}

export default LoadingScreen;
