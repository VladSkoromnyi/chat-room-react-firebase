import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from '../Landing';
import { ChatRoom } from '../ChatRoom';
import './styles.scss';

export const AuthenticatedApp = () => {
	return (
		<BrowserRouter>
				<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/room/:id" element={<ChatRoom />} />
				</Routes>
		</BrowserRouter>
);
}