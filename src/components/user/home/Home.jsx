import React from 'react';
import { Link } from 'react-router-dom';


// Services
import authService from '../../../services/auth/authService';
import projectsService from '../../../services/projects/projectsService';
import clientsService from '../../../services/clients/clientsService';
import categoriesService from '../../../services/categories/categoriesService';

class Home extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			projects: [],

			clients: [],
			categories: [],

			loading: true
		};
	}

	componentDidMount () {

		// Log anonymous user if storage is empty
		if (sessionStorage.getItem('authtoken') === null) {
			authService
				.loginAnonymousUser()
				.then(res => {
					authService.saveSession(res);
					this.loadStarProjects();
				})
				.catch(err => this.messages.showMessage(err.responseJSON.description))

			return
		}

		this.loadStarProjects();
	}


	loadStarProjects = () => {

		let query = '?query={"isStar":true}';


		projectsService
			.loadAllProjects(query)
			.then(res => {

				this.setState({ projects: res, });

				clientsService
					.loadAllClients()
					.then(res => {

						this.setState({clients: res});

						this.state.projects.forEach(p => {
							p.clientName = this.state.clients.filter(c => c._id === p.clientId)[0].name.BG
						});

						categoriesService
							.loadAllCategories()
							.then(res => {
								this.setState({categories: res, loading: false}, () => console.log(this.state));
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




	render () {

		let projects = this.state.projects.map(e => {
			return (
				<article key={e._id} className="project-card">
					<div className="img-container">
						<img className="img-fit" src={e.thumbnail} alt={e.name.BG}/>
					</div>


					<Link to={'projects/' + e._id} className="hover">
						<div className="info">
							<p className="project-client">{e.clientName}</p>
							<p className="project-name">{e.name.BG}</p>
							<p className="project-year">{e.year}</p>
						</div>
					</Link>
				</article>
			)
		});

		return (
			<div id="home" className="container-fluid">
				<section className="about">
					<figure className="image">
						<img src="images/addict_logo_10_color.svg" className="svg-icon img-fit"/>
					</figure>

					<p className="text">
						е елементарен примерен текст, използван в печатарската и типографската индустрия. Lorem Ipsum е индустриален стандарт от около 1500 година, когато неизвестен печатар взема няколко печатарски букви и ги разбърква, за да напечата с тях книга с примерни шрифтове.
					</p>
				</section>


				{projects}

			</div>

		);
	}
}

export default Home;