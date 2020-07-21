import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import ApiService from './lib/apiService';
import useWindowDimensions from './hooks/windowSize';
import Routes from './routes';
import NavBar from './components/navbar';
import Footer from './components/footer';
import './App.scss';
import Logo from './assets/logo.png';

interface IUser {
  isAuthenticated: boolean;
  username: string;
  gh_avatar: string;
}

function App() {

  const [user, setUser] = useState<IUser>({ isAuthenticated: false, username: '', gh_avatar: '' })
  const [loading, isLoading] = useState<boolean>(true)
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const api = new ApiService();
    const fetchData = async () => {
      // userID if user logged in via username/password
      // this can also be userID of a new user account (signup)
      const userID = localStorage.getItem('userID') || 0;

      const res = await api.getUser(userID as string)
      const json = await res.json();
      isLoading(false);
      if (json.data.isAuthenticated) {
        setUser(json.data);
      }
    }

    fetchData();
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar
        user={user}
        isAuthenticated={user.isAuthenticated}
        loading={loading}
      />
      {width < 768 && (
        <div className="wrapper">
          <Link to="/"><img className="logo-mobile" src={Logo} alt="logo" /></Link>
          {user.isAuthenticated && 
          <Link className="nav-user-profile-mobile" to={`/user/${user.username}`}>
            <img className="user-profile-badge" src={user.gh_avatar} alt="logo" />
          </Link>}
        </div>
      )}
      <Layout>
        <Layout.Content>
          {Routes}
        </Layout.Content>
        {width > 700 && <Footer /> }
      </Layout>
    </Layout>
  );
}

export default App;

