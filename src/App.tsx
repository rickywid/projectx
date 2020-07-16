import React, { useEffect, useState} from 'react';
import { Layout } from 'antd';
import ApiService from './lib/apiService';
import Routes from './routes';
import NavBar from './components/navbar';
import Footer from './components/footer';
import './App.css';

interface IUser {
  isAuthenticated: boolean;
  username: string;
}

function App() {

  const [user, setUser] = useState<IUser>({isAuthenticated: false, username: ''})

  useEffect(() => {
    const api = new ApiService();

    // userID if user logged in via username/password
    // this can also be userID of a new user account (signup)
    const userID = localStorage.getItem('userID') || 0;
    
    const fetchData = async () => {
        const res = await api.getUser(userID as string)
        const json = await res.json();

        // update userID if user logged in via github
        localStorage.setItem('userID', json.data.id);
        localStorage.setItem('username', json.data.username);

        setUser(json.data);
    }
    
    fetchData();
}, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar
        user={user}
        isAuthenticated={user.isAuthenticated}
      />
      <Layout>
        <Layout.Content>
          {Routes}
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default App;

