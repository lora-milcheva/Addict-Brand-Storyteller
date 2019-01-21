import React from 'react';

import './css/main.css';
import './css/animations.css';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import { LanguageContext, languages } from './components/common/languagesContext/LanguageContext';

class App extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			language: languages.bg
		};
	}

	updateLanguage = (language) => {
		this.setState({language});
	};

	render () {


		let isHomePage = window.location.pathname === '/';

		return (

			<LanguageContext.Provider  value={{ language: this.state.language, updateLanguage: this.updateLanguage }}>

				{/*{!isHomePage && <Header changeLanguage={this.changeLanguage}/> }*/}

				<Header/>

				<main>
					<Routes/>
				</main>

				<Footer/>
			</LanguageContext.Provider>

		);
	}
}

export default App;