import './Style.css';

const ProjectBox = () => {
    return (
        <div class="project-rect-cont">
            <div class="project-rect grid-container">
                <span class='grid-item project-number'>
                    1
                </span>
                <span class='grid-item'>
                    <img src={require("../Assets/profile.png")} alt="Looklock logo" id='zelo-logo'/>
                </span>
                <span class='grid-item project-name'>
                    Genshiro
                </span>
                <span class='grid-item project-rewards'>
                    0.65X ~ 1.5X
                </span>
                <span class='grid-item project-lock-periods'>
                    22.04.05. ~ 22.04.18.
                </span>
                <span class='grid-item project-minimum-amount'>
                    650 LOLO
                </span>
                <button class='grid-item project-phase1'>
                    Phase 1
                </button>
                <button class='grid-item project-more'>
                    More
                </button>
            </div>
        </div>
    )
};
  
export default ProjectBox;