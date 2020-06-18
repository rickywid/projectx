import React, { useEffect, useState } from 'react';
import { Form, Select, Layout } from 'antd';
import SearchBar from './searchBar';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';

const Root: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([])
  
    useEffect(() => {
        const api = new ApiService();
        
        const fetchData = async () => {
            const res = await api.getProjects()
            const json = await res.json();
            
            setProjects(json.data);
        }
        
        fetchData();
    }, [])

    const onFormLayoutChange = ({ filter }: []) => {
        
      };
    
    return (
        
        <div className="root">
          <SearchBar />
          <Form
            labelCol={{ span: 6, offset: 18 }}
            wrapperCol={{ span: 6, offset: 18 }}
            layout="vertical"
            initialValues={{ filter: "recent" }} 
            onValuesChange={onFormLayoutChange as any}
          >
            <Form.Item name="filter" label="" initialValue="recent">
              <Select>
                <Select.Option value="recent">Recent</Select.Option>
                <Select.Option value="popular">Popular</Select.Option>
              </Select>
            </Form.Item>
          </Form>
          <ProjectsCard projects={projects}/>
        </div>
    
    )
};

export default Root;
