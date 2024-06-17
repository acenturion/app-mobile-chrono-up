import React, {useEffect, useState} from 'react';
import MapView, {MarkerAnimated, Region} from 'react-native-maps';

interface MapLocationProps {
  latitude: number,
  longitude: number,
}

function MapLocation({latitude, longitude}: MapLocationProps) {
  const [location, setLocation] = useState<any>({latitude, longitude});

  const initialRegion: Region = {
    longitude,
    latitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  useEffect(() => {
    setLocation({latitude, longitude})
  }, [latitude])

  return (
    <MapView
      loadingEnabled={true}
      scrollEnabled={false}
      style={{
        width: '100%',
        height: 192,
        marginBottom: 16
      }}
      initialRegion={initialRegion}>
      <MarkerAnimated
        coordinate={{
          latitude,
          longitude
        }}
      />
    </MapView>
  );
}

export default MapLocation;