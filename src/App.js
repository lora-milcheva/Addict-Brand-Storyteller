import React from 'react';

// CSS
import './css/constants.css';
import './css/main.css';
import './css/main-responsive.css';
import './css/user.css';
import './css/user-responsive.css';
import './css/admin.css';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/routes/Routes';

import { LanguageContext, languages } from './components/common/languagesContext/LanguageContext';

class App extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			language: languages.bg,
		};

		this.scrollTopBtn = React.createRef();
		this.main = React.createRef();
	}

	updateLanguage = (language) => {
		this.setState({language: language});
	};

	componentDidMount () {
		document.addEventListener('scroll', this.showHideBtn);
	}

	componentWillUnmount () {
		document.removeEventListener('scroll', this.showHideBtn);
	}

	componentWillUpdate (nextProps, nextState, nextContext) {
		this.goToTop();
	}

	showHideBtn = () => {
		if (window.scrollY > window.innerHeight - 500) {
			this.scrollTopBtn.current.classList.add('visible');

			// Add more distance from bottom of page because of footer
			if (window.scrollY + window.innerHeight >= this.main.current.clientHeight) {
				this.scrollTopBtn.current.classList.add('bottom');
			} else {
				this.scrollTopBtn.current.classList.remove('bottom');
			}
		} else {
			this.scrollTopBtn.current.classList.remove('visible');
		}
	};

	goToTop = () => {
		window.scroll({top: 0, left: 0});
	};

	scrollTop = () => {
		window.scroll({top: 0, left: 0, behavior: 'smooth'});
	};

	render () {

		return (

			<LanguageContext.Provider value={{language: this.state.language, updateLanguage: this.updateLanguage}}>

				<Header/>

				<main ref={this.main}>

					<button id='go-to-top-btn'
					        ref={this.scrollTopBtn}
					        className='btn btn-default sm'
					        onClick={this.scrollTop}>
						<i className="fa fa-arrow-up" aria-hidden="true"/>
					</button>

					<Routes/>

				</main>

				<Footer/>

			</LanguageContext.Provider>

		);
	}
}

export default App;