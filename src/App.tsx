import React, { useEffect, useState} from 'react';
import { Layout } from 'antd';
import ApiService from './lib/apiService';
import Routes from './routes';
import NavBar from './components/navbar';
import Footer from './components/footer';
import './App.css';

function App() {

  const [user, setUser] = useState<{isAuthenticated: boolean}>({isAuthenticated: false})

  useEffect(() => {
    const api = new ApiService();
    
    const fetchData = async () => {
        const res = await api.getUser()
        const json = await res.json();
        setUser(json.data);
    }
    
    fetchData();
}, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavBar
        root="/"
        signup="signup"
        login="login"
        upload="upload"
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

