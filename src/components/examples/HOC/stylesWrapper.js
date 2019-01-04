
import commonStyles from './commonStyles';

const translateProps = (props) => {

	let selectedStyles = {...commonStyles.default};

	if (props.disabled) {
		selectedStyles = {...selectedStyles, ...commonStyles.disabled};
	}

	return {...props, style: selectedStyles};

};

export default (WrappedComponent) => {

	return function wrappedRender (args) {

		return WrappedComponent(translateProps(args));

	};

}