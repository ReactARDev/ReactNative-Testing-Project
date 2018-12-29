import React, { Component } from 'react';
import { View, Text, Button, Image, ListView, StyleSheet, ScrollView} from 'react-native';
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo';

class ProfileScreen extends Component {
    renderRow(data){
        return (
        	
            <View >
                <Text style={styles.text}># {data.name}</Text>
            </View>
            
        )
    }
  render() {
  	const {user} = this.props.navigation.state.params;
  	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  	const interestData = ds.cloneWithRows(user.interests);

    return (
      <View style={styles.wrapper}>
      	<Image
      		style = {styles.photo}
           	source={{uri: user.profile_photo}}
        />
      	<ScrollView style={styles.profile}>
	        <Text style = {styles.name}>{user.name}</Text>
	        <Text style = {styles.text}>{user.livelihood}</Text>
	        <Text style = {styles.text}>{user.profile}</Text>
	        <ListView 
	            contentContainerStyle={styles.interests} 
	            dataSource={interestData}
	            renderRow={(rowData) => this.renderRow(rowData)}
	        />
	        <View style={styles.currentLoction}>
	        	<Icon2 name="location-pin" size={50} color={"white"} />
	        	<View style={styles.locationInfo}>
			        <Text style = {styles.locationName}>{user.current_location.name}</Text>
			        <Text style = {styles.text}>{user.current_location.name}</Text>
			    </View>
	        </View>
	    </ScrollView> 
	    <Button onPress={() => this.props.navigation.navigate('Home')} title="Home"/>
      </View>
    )
  }
};

export default ProfileScreen;

const styles = StyleSheet.create({
	wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    profile: {
    	padding: 20,
    	color: 'white'
    },
	interests: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: 'white',
    },
    locations: {
    	flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
        color: 'white',
    },
    currentLoction: {
    	flex: 1,
    	flexDirection: 'row',
    },
    locationInfo: {
    	flex: 1,
    	flexDirection: 'column',
    },
    locationName: {
    	paddingTop: 5,
    	color: 'white',
    	fontWeight: 'bold',
    },
    name: {
    	fontSize: 30,
    	fontWeight: 'bold',
    	color: 'white',
    },
    photo: {
    	width: '60%',
    	height: 300,
    },
    text: {
    	color: 'white',
    }
    
});