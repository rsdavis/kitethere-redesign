
export const state = () => ({
    spots: null,

    selectedSpotId: null,
    mapCenter: { lat: null, lng: null },
    mapBounds: {
        northEast: { lat: null, lng: null },
        southWest: { lat: null, lng: null}
    }
})

export const getters = {

    // location information of each spot on the map
    // return array of objects with id, lat, lng, and name
    locations (state) {

        return state.spots.reduce((acc, spot) => {
            acc.push({
                id: spot.id,
                lat: spot.CurrentVersion.lat,
                lng: spot.CurrentVersion.lng,
                name: spot.CurrentVersion.name
            })
            return acc
        }, [])  
              
    },

    // returns true if a spot is selected, false otherwise
    spotSelected (state) {

        return (state.selectedSpotId !== null)
        
    }

}

export const mutations = {

    setSpots(state, spots) { state.spots = spots },
    setCenter(state, center) { state.center = center },
    setBounds(state, bounds) { state.bounds = bounds },
    selectSpot(state, id) { state.selectedSpotId = id }

}

export const actions = {

}