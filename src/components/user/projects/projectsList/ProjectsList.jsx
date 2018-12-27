import React from 'react';
import { Link } from 'react-router-dom';

// Services
import projectsService from '../../../../services/projects/projectsService';
import clientsService from '../../../../services/clients/clientsService';
import categoriesService from '../../../../services/categories/categoriesService';

// Notifications
import Messages from '../../../common/Messages';

class ProjectList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			allProjects: [],

			clients: [],
			categories: [],

			selectedCategory: '',
			filteredProjects: [],

			loading: true
		};
	}

	componentDidMount () {
		this.loadAll();
	}

	loadAll = () => {
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

	handleChange = (e) => {

		e.preventDefault();

		if (e.target.name === 'all') {
			this.setState({
				selectedCategory: '',
				filteredProjects: this.state.allProjects
			});

			return;
		}

		this.setState({[e.target.name]: e.target.value}, () => this.filterProjects());

	};

	filterProjects = () => {
		let filteredProjects = [];

		for (let project of this.state.allProjects) {

			if (filteredProjects.some(el => el._id === project._id)) continue;

			if (project.categoryIds.includes(this.state.selectedCategory)) {
				filteredProjects.push(project);
			}
		}

		this.setState({filteredProjects: filteredProjects});
	};

	render () {

		if (this.state.loading) {
			return (<div className="lds-dual-ring"/> );
		}

		let categories = this.state.categories.map(e => {
			let style = this.state.selectedCategory.includes(e._id) ? 'btn category-label selected' : 'btn category-label';
			return (
				<button key={e._id}
				        className={style}
				        name="selectedCategory"
				        value={e._id}
				        onClick={this.handleChange}>{e.name.BG}</button>
			);
		});

		categories.unshift(<button key='all'
		                           className={this.state.selectedCategory.length === 0
			                           ? 'btn category-label selected'
			                           : 'btn category-label'}
		                           name="all"
		                           onClick={this.handleChange}>all</button>);

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