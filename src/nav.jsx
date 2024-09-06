import { useLocation, Link } from 'react-router-dom';
import './App.css';

export default function Nav() {
    const location = useLocation(); // Use the useLocation hook to get current location

    const getActiveTab = () => {
        if (location.pathname === '/write') return 'write';
        if (location.pathname === '/read') return 'read';
        return 'write'; // Default tab
    };

    const activeTab = getActiveTab();

    return (
        <div id='menu' className="menu">
            <div className={`tab-container ${activeTab === 'write' ? 'active' : ''}`}>
                <Link className='tab-link' to="/write">
                    <p className="tab-text">Write</p>
                    <img 
                        className='tab-img' 
                        src="/tabs.png" 
                        height='50px' 
                        width='205px' 
                        alt="Write tab" 
                    />
                </Link>
            </div>
            <div className={`tab-container ${activeTab === 'read' ? 'active' : ''}`}>
                <Link className='tab-link' to="/read">
                    <p className="tab-text">Read</p>
                    <img 
                        className='tab-img' 
                        src="/tabs.png" 
                        height='50px' 
                        width='205px' 
                        alt="Read tab" 
                    />
                </Link>
            </div>
        </div>
    );
}
