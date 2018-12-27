import React from 'react';


class ProjectCard extends React.Component {
	constructor (props) {
		super(props);
	}


	render () {

		let project = this.props.project;

		return (
			<div id="project" className="container">
				<p>{project.name.BG}</p>
			</div>
		);
	}
}

export default ProjectCard;