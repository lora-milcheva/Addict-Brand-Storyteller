import React from 'react';
import { Link } from 'react-router-dom';

import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import categoriesService from '../../../../services/categories/categoriesService';

import Messages from '../../../common/Messages';

class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			allProjects: [],

			clients: [],
			categories: [],

			selectedCategoryIds: [],
			filteredProjects: [],

			loading: true
		};
	}

	componentDidMount () {
		this.loadProjects();
	}

	loadProjects = () => {
		projectsService
			.loadAllProjects()
			.then(res => {

				this.setState({
					allProjects: res,
					filteredProjects: res
				});

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res});

						categoriesService
							.loadAllCategories()
							.then(res => {
								this.setState({categories: res, loading: false});
							})
							.catch(err => {
								this.messages.showMessage(err.responseJSON.description);
							});

					})
					.catch(err => {
						this.messages.showMessage(err.responseJSON.description);
					});

			})
			.catch(err => {
				this.messages.showMessage(err.responseJSON.description);
			});
	};

	handleArrChange = (e) => {

		e.preventDefault();

		if (e.target.name === 'all') {
			this.setState({
				selectedCategoryIds: [],
				filteredProjects: this.state.allProjects});

			return
		}

		if (this.state[e.target.name].includes(e.target.value)) {
			this.setState({[e.target.name]: this.state[e.target.name].filter(el => el !== e.target.value)}, () => {
				this.filterProjects()
			});
		} else {
			this.setState({[e.target.name]: [...this.state[e.target.name], e.target.value]}, () => this.filterProjects());
		}

	};


	filterProjects = () => {
		let filteredProjects = [];

		if (this.state.selectedCategoryIds.length === 0){
			this.setState({
				selectedCategoryIds: [],
				filteredProjects: this.state.allProjects});

			return
		}

		for (let category of this.state.selectedCategoryIds) {

			for (let project of this.state.allProjects) {

				if (filteredProjects.some(el => el._id === project._id)) continue;

				if (project.categoryIds.includes(category)) {

					filteredProjects.push(project);
				}
			}
		}

		this.setState({filteredProjects: filteredProjects});
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let categories = this.state.categories.map(e => {
			let style = this.state.selectedCategoryIds.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id}
				        className={style}
				        name="selectedCategoryIds"
				        value={e._id}
				        onClick={this.handleArrChange}>{e.name.BG}</button>
			);
		});

		categories.unshift(<button key='all'
		                        className={this.state.selectedCategoryIds.length === 0
			                        ? 'btn category-label selected'
			                        : 'btn category-label'}
		                        name="all"
		                        onClick={this.handleArrChange}>all</button>);


		let projects = this.state.filteredProjects.map((e, i) => {
			return (
				<article key={e._id + i} className="project-card">
					<figure className="img-container">
						<img className="img-fit" src={e.thumbnail}/>
					</figure>
					<p className="project-name">{e.name.BG}</p>

					<Link to={'projects/' + e._id} className="hover">
						<div className="edit-btn">
							<i className="fa fa-eye" aria-hidden="true"/>Повече
						</div>
					</Link>
				</article>
			);
		});


		return (
			<div id="projects-list" className="container">

				<Messages onRef={ref => (this.messages = ref)}/>

				<div className="page-header">
					<h1 className="page-title">Портфолио</h1>
				</div>

				<div className="buttons-container">
					{categories}
				</div>

				<div className="projects-container">
					{projects}
				</div>

			</div>
		);
	}
}

export default ProjectList;