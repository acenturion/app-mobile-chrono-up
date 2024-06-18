import React, {useEffect, useState} from 'react';
import MapView, {MarkerAnimated, Region} from 'react-native-maps';

interface MapLocationProps {
  latitude: number,
  longitude: number,
}

const LATITUDE_DELTA: number = 0.0922
const LONGITUDE_DELTA: number = 0.0421

function MapLocation({latitude, longitude}: MapLocationProps) {
  const [location, setLocation] = useState<any>({latitude, longitude});

  const initialRegion: Region = {
    longitude,
    latitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  useEffect(() => {
    const region: Region = {
      longitude,
      latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
    setLocation(region)
  }, [latitude])

  return (
    <MapView
      loadingEnabled={true}
      scrollEnabled={false}
      region={location}
      zoomEnabled={false}
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