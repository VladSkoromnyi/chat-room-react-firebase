import { useAuth } from "../../hooks/useAuth";
import './styles.scss';

export const UnauthenticatedApp = () => {
	const { login } = useAuth();

	return (
			<>
					<h2>Log in to join a chat room!</h2>
					<div>
							<button onClick={login} className="login">
									Login with Google
							</button>
					</div>
			</>
	);
}
