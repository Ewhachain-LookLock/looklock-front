import Footer from '../component/Footer';
import ProjectBox from '../components/ProjectBox';
import './Project.css';


const Project = () => {
    return (
      <body>
        <div id='project-wrapper'>
          <h1 id='project-h1'>Project</h1>
          <div class="project-container">
            <div class="project-header">
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
                  Lock Period
                </li>
                <li class='grid-item'>
                  Minimum Amount
                </li>
                <li class='grid-item'>
                  Phase
                </li>
                <li class='grid-item'>
                  Filters
                </li>
              </ul>
            </div>
            <ProjectBox/>
            <ProjectBox/>
            <ProjectBox/>
            <ProjectBox/>
          </div>
        </div>
        <Footer/>
      </body>
    )
  };
  
  export default Project;