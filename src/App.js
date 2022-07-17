import { useAuth } from './hooks/useAuth';
import { AuthenticatedApp } from './components/AuthenticatedApp';
import { UnauthenticatedApp } from './components/UnauthenticatedApp';
import './App.scss';

export const App = () => {
  const { user } = useAuth();

  return (
      <div className="container">
          <h1>💬 Chat Room</h1>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </div>
  );
}
