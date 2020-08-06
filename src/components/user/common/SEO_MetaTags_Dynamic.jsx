import React from 'react';
import {Helmet} from "react-helmet";
import {META_TAGS} from "../../../constants/SEO_Metatags";
import PropTypes from "prop-types";


class SEO_MetaTags_Dynamic extends React.Component {

    render() {

        let {pageName, projectName, activeLanguage, url} = this.props;

        console.log(pageName)
        console.log(url)

        return (
            <Helmet>
                <title>{projectName[activeLanguage] + META_TAGS[pageName].title[activeLanguage] }</title>
                {/*<meta name="description" content={META_TAGS[pageName].description[activeLanguage]}/>*/}
                {/*<meta name="keywords" content={META_TAGS[pageName].keywords[activeLanguage]}/>*/}
                <link rel="canonical" href={'https://addict-bg.com' + url}/>
            </Helmet>
        );
    }
}


export default SEO_MetaTags_Dynamic;

SEO_MetaTags_Dynamic.propTypes = {
    activeLanguage: PropTypes.string,
    pageName: PropTypes.string,
    projectName: PropTypes.string,
    url: PropTypes.string
};