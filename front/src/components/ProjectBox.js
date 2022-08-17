import './Style.css';
import React, {useState, useEffect} from 'react';
import { dateFormatter } from '../utils/dateFromatter';
import { Link } from 'react-router-dom';

const ProjectBox = ({project, count}) => {
    const [currentPhase, setCurrentPhase] = useState('');
    const [period, setPeriod] = useState("");

    useEffect(()=> {
        getPhase(project);
        getPeriod(project);
    }, [project]);
    if (!project) return null;
    const base64String = btoa(String.fromCharCode(...new Uint8Array(project.projectImg.data.data)));
   

    const getPhase = (project) => {
        const now = new Date().getTime();
        const phase1due = new Date(project.startDate);
        phase1due.setDate(phase1due.getDate() + Number(project.phase1period));
       
        if (now > phase1due.getTime()) {
            setCurrentPhase("PHASE 2");
        }
        else{
            setCurrentPhase("PHASE 1");
        }

    };


    const getPeriod = (project) => {
        const startDate = new Date(project.startDate);
        const endDate = new Date(startDate);
        const sum = project.phase2periods.reduce((partialsum, project) => partialsum + project.days, 0);
        endDate.setDate(endDate.getDate() + sum + Number(project.phase1period));

        return dateFormatter(startDate)+ '~' + dateFormatter(endDate);
    };

    const getBoostRange = (project) => {
        const min = project.rewards[0].boost;
        const max = project.rewards[project.rewards.length -1].boost;

        return min + "X ~ " + max+ "X";
    }
    
    return (
        <div class="project-rect-cont">
            <div class="project-rect grid-container">
                <span class='grid-project project-number'>
                    {count}
                </span>
                <span class='grid-project'>
                    <img src={`data:image/jpg;base64,${base64String}`} alt="Looklock logo" id='zelo-logo'/>
                </span>
                <span class='grid-project project-name'>
                    {project.title}
                </span>
                <span class='grid-project project-rewards'>
                    {getBoostRange(project)}
                </span>
                <span class='grid-project project-lock-periods'>
                   {getPeriod(project)}
                </span>
                <span class='grid-project project-minimum-amount'>
                {project.rewards.map( (item) => 
                                    item.days + " / "
                            )}
                </span>
                <button class='grid-project project-phase1'>
                    {currentPhase}
                </button>
                <Link to={'./detail/'+project.title} class='grid-project project-more'>
                <button class='grid-project project-more'>
                    More
                </button>
                </Link>
            </div>
        </div>
    )
};
  
export default ProjectBox;