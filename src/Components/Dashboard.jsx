import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';

const Dashboard = () => (
    <div className="flex h-full">
        <Sidebar /> 
        <div className="w-full h-full">
            <Header />
            <div >
                <Home />
            </div>
        </div>
    </div>
);

export default Dashboard;
