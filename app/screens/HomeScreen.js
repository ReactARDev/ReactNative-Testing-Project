import React, { Component } from 'react';
import { 
	View, 
	Text, 
	Button, 
	ActivityIndicator, 
	Dimensions, 
	StyleSheet, 
	ScrollView, 
	ListView, 
	ImageBackground,
	TouchableHighlight } from 'react-native';

import Image from 'react-native-scalable-image';
import LinearGradient from 'react-native-linear-gradient';

export default class HomeScreen extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          	isLoading: true,
        	dataSource: '',
        	dataSource1: '',
        };
    }
    componentDidMount() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return fetch('http://staging.commune-x.com/api/v1/users', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA5NDFmOWJiM2UzZDFmYWVmMWIxODE5MDY5ZDNiNGQ0ZmMyMzE5YzFjM2U4YzkxMDFjZDdlMzY3MTRmMjM1OTgwYTA3M2QwZThkOGVkYjAxIn0.eyJhdWQiOiIxIiwianRpIjoiMDk0MWY5YmIzZTNkMWZhZWYxYjE4MTkwNjlkM2I0ZDRmYzIzMTljMWMzZThjOTEwMWNkN2UzNjcxNGYyMzU5ODBhMDczZDBlOGQ4ZWRiMDEiLCJpYXQiOjE1NDUyMjIwNDEsIm5iZiI6MTU0NTIyMjA0MSwiZXhwIjoxNTc2NzU4MDQxLCJzdWIiOiIzMDI0Iiwic2NvcGVzIjpbXX0.plPcogKYKfN34S7RS2gyLl4fSGI3RO0HlC0zwIDAiUdGIBTJ5BUmqpHQfCs3-Y2S0_tzI96pbtqiDPuvKHR5BQ4JfkU9ne9WcpRRBLkliFSyXiAn8jPGoXqmFRy2LQtH4jYpjSzqxtjjS7tqqm2Fsnba4zNDmx9rzYc2KAisdlacdVPyeWBu_kv4_mqX4kbo4Y_YLe8eHTKjghWT_GSQNV-6kezkTWKvolGQfJQno72g9-95fB2a2Qv0dfZHU1JJsTcRT1WZqrgz3UIZV75VCFy_1x4RBCNd3hqD2hj4_qkLq-aLed1lomEeo_qh5JFHyyMMGV_wRsxRReUwYiie6bSp7SQEna6X51HtqPonviToy-9a5FmJcYbVcI2nxzQc9oQ9zQ0ob_l52jQ5kT2f2R2L-GBd3V1vI3Dc0ZPVssw1anVXPF6IhuIV8aOqGLW-X6UwNMr2yy71SNoxyWs6jdaNPRi2S3SlNTy_o3vkuyXhZISFrRs66gwurG-DL0udAvp3Wi5L6yO37bSaJLCqbGnpBmrQplvpKSDpGiTBx8RBDmQZ49hGX0UQX5N6pFn9wVI0rp5nLy7WmpZRZNvT2Gk7DTvRsJJq1w2WFZFnwV1IF-Rr4iwcTSqG232LTWjqYx35O-qvLZG4eNci2WsN5byXW7PJW6s3Capovpy5Woo',
                },
            })
            .then((response) => response.json()) // Transform the data into json
            .then((responseJson) => {
                
               	var temp = responseJson.data;
               	
               	var count = Object.keys(responseJson.data).length;
               	var tempData1 = []  ;
               	var tempData2 = [] ;

               	for (var i = 0; i < count; i++) {
               		if(i % 2 == 0) {
               			tempData1.push(temp[i]);
               		} else {
               			tempData2.push(temp[i]);
               		}
               	}

                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(tempData1),
                    dataSource1: ds.cloneWithRows(tempData2),
                }, function(){

                });
                

            })
            .catch((error) =>{
              console.error(error);
            }); 


    }

    renderRow(data){
        return (
        	<TouchableHighlight onPress={() => this.props.navigation.navigate('Profile', { user: data })} >
            <View style={styles.itemContainer}  >
                <Image
                   width={Dimensions.get('window').width/2-15} // height will be calculated automatically
                   source={{uri: data.profile_photo}}
                   style={styles.item}
                />
                <LinearGradient 
                     colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)', '#000000']}
                     style = { styles.itemText }>
                    <View >
                        <Text style={styles.title}>{data.name}</Text>
                        <Text style={styles.text}>{data.livelihood}</Text>
                        <Text style={styles.text}>{data.profile}</Text>
                    </View>
                 </LinearGradient>
                
            </View>
          </TouchableHighlight>
        )
    }
    
    render() {
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              	<ActivityIndicator/>
            </View>
          )
        }
        return ( 
            <View style={styles.wrapper}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <ListView 
                            contentContainerStyle={styles.list} 
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => this.renderRow(rowData)}
                        />
                        <ListView 
                            contentContainerStyle={styles.list} 
                            dataSource={this.state.dataSource1}
                            renderRow={(rowData) => this.renderRow(rowData)}
                        />
                       
                </ScrollView>

             </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    list: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    itemContainer: {
        width: '100%',
        height: 'auto',
        marginTop: 5
    },
    item: {
        width: '100%',
    },
    itemText: {
        marginTop: -60,
    },
    title: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
    }

});