import React from 'react';

// CSS
import './css/main.css';
import './css/main-responsive.css';
import './css/user.css';
import './css/admin.css';
import './css/user-responsive.css';


// Components
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
		this.setState({language: language});
	};

	componentDidUpdate (prevProps, prevState, snapshot) {
		if (prevState.language !== this.state.language) return
		window.scrollTo(0, 0)
	}

	render () {

		let isHomePage = window.location.pathname === '/';

		return (

			<LanguageContext.Provider value={{language: this.state.language, updateLanguage: this.updateLanguage}}>

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