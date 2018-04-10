import { StyleSheet } from 'react-native';

const constants = {
	actionColor: '#3cb371'
}

module.exports = StyleSheet.create({
	navbar: {
		alignItems: 'center',
		backgroundColor:'#fff',
		borderBottomColor:'#eee',
		borderColor:'transparent',
		borderWidth: 1,
		justifyContent: 'center',
		height: 44,
		flexDirection: 'row'
	},
	navbarTitle: {
		color:'#444',
		fontSize: 16,
		fontWeight: '500'
	},
	toolbar:{
		backgroundColor: '#fff',
		height: 22
	},
	center: {
		textAlign: 'center'
	},
	actionText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center'
	},
	action:{
		backgroundColor: constants.actionColor,
		borderColor: 'transparent',
		borderWidth: 1,
		paddingLeft: 16,
		paddingRight: 16,
		paddingTop: 14,
		paddingBottom: 16
	},
	container: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#F5FCFF',
	},
	logo: {
	  height: 80,
	  marginBottom: 16,
	  width: 80,
	},
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  marginBottom: 5,
	},
	modules: {
	  margin: 20,
	},
	modulesHeader: {
	  fontSize: 16,
	  marginBottom: 8,
	},
	module: {
	  fontSize: 14,
	  marginTop: 4,
	  textAlign: 'center',
	},
	listview: {
		flex: 1
	},
	li:{
		backgroundColor:'#fff',
		borderBottomColor: '#eee',
		borderColor : 'transparent',
		borderWidth:1,
		paddingLeft: 16,
		paddingTop: 14,
		paddingBottom: 16
	},
	liContainer: {
		flex: 2
	},
	liText: {
		color: '#333',
		fontSize: 16
	}
});