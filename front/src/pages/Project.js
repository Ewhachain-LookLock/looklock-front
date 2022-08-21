import Footer from '../components/Footer';
import ProjectBox from '../components/ProjectBox';
import './Project.css';
import './Projectinfo.css';
import React, {useState, useEffect, useReducer} from 'react';
import axios from "axios";
import reducer from "../utils/reducer";

const Project = () => {
  const [count,setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null
  });
  const getCount = () => {
    setCount(count+1);
    return count;
  }
  
  const fetchProjects = async() => {
    dispatch({type : 'LOADING'});
        try {
            const response = await axios.get(
                'https://looklock-backend.herokuapp.com/api/project/'
            );
            dispatch({type:'SUCCESS', data:response.data});
        } catch (e) {
            console.log(error);
            dispatch({type :'ERROR', error:e})
        }
    };
  
    useEffect(()=> {
      fetchProjects();
  },[]);

  const {loading, data:projects, error } = state;

  if (loading) console.log("loading..");
  if (error) return <div>요청한 데이터가 없습니다. {error.message}</div>;
  if (!projects) return <div> no data </div>;

  return (
    <body>
      <div id='project-wrapper'>
        <div class="project-container">
          <div class="project-header">
          <h1 id='project-h1'>Projects</h1>
            <ul>
              <li class='grid-item'>
                #
              </li>
              <li class='grid-item'>
                Name
              </li>
              <li class='grid-item'>
                Rewards
              </li>
              <li class='grid-item'>
                Project Period
              </li>
              <li class='grid-item'>
                Lock Period
              </li>
              <li class='grid-item'>
                Phase
              </li>
              <li class='grid-item'>
                Filters
              </li>
            </ul>
          </div>
          { projects.map((item, i) => 
            <ProjectBox project={item} count = {i+1} />
          )}
        </div>
      </div>
      <Footer/>
    </body>
  )
};
  
  export default Project;
