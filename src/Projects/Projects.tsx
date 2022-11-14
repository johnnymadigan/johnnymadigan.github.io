import React, { useState } from 'react';
import Project from './Project';
import './Projects.scss';
import iBack from './iBack.png';
import { ISingleProject, IAllProjects } from '../Shared/typescript-interfaces';

function Projects(props: IAllProjects) {
    // side in view: false = LEFT, true = RIGHT
    const [ side , setSide ] = useState(false);

    // last selected project to highlight
    const [ highlight, setHighlight ] = useState<ISingleProject>({
        banner: undefined,
        title: undefined,
        desc: undefined,
        link: undefined,
        shields: undefined
    });

    // banner images loading state passed to 'Project' child component (individual)
    const [ loaded, setLoaded ] = useState(false);

    // called when user selects a project to view (buttons) or back button...
    const selectHighlight = (selectedProject: ISingleProject) => {

        // update highlight only if different project is selected to save resources/loading time
        // if updating the highlight, reset the image load status to ensure spinner is shown
        if (selectedProject !== highlight) {
            setLoaded(false);
            setHighlight(selectedProject);
        }

        setSide(currentSide => !currentSide);
    };

    /* Project-container overflows on R-side (only when R-side off-screen)...
    Set to hidden only when R-side off-screen to remove extra margin...
    Set to nothing to allow sticky to work when L-side off-screen */
    return (
        <>
        <div className="projects-container" style={side ? {overflow: ''} : {overflow: 'hidden'}}>
            <div className={`both-sides left-side ${side ? 'slideLeft' : ''}`}>
                {/* LEFT-SIDE: list of project titles as buttons */}
                {props.projects.map((p: ISingleProject) => (<button key={p.title} onClick={() => selectHighlight(p)}>{p.title}</button>))}
            </div>
            <div className={`both-sides right-side ${!side ? 'slideRight' : ''}`}>
                {/* RIGHT-SIDE: the current project selected */}
                <button className='back-button' style={{width: "100%", textAlign: "right"}} onClick={() => selectHighlight(highlight)}>
                    <img src={iBack} alt='Go back'/>
                </button>
                <Project {...highlight} loaded={loaded} setLoaded={setLoaded}/>
            </div>
        </div>
        </>
    );
}

export default Projects;