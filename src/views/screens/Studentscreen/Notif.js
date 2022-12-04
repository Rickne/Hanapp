import { View, Text, SafeAreaView, Dimensions, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import Universalstyles from '../../../const/Universalstyle';


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Notif = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{ 
          justifyContent: 'center',
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
        }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#F5E44C']}
            />
          }
        >
     <View></View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Notif