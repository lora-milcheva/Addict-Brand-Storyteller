import $ from 'jquery';
const url = 'http://addict-bg.com/api';


export default {

	sendMail: (state) => {

		let data = processData(state);

		 return $.ajax(
			{
				type: 'GET',
				url: url,
				data: data,
				crossDomain: true,
				dataType: 'jsonp',
				success: function(response){
					console.log(response);
				}
			});
	}
};

function processData (state) {

	return "firstName=" + state.firstName
		+ "&lastName=" + state.lastName
		+ "&email=" + state.email
		+ "&phone=" + state.phone
		+ "&subject=" + state.subject
		+ "&message=" + state.message;
}

