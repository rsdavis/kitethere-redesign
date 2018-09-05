

function convertSchema (spot) {
    return {
        id: spot.id,
        name: spot.CurrentVersion.name,
        lat: spot.CurrentVersion.lat,
        lng: spot.CurrentVersion.lng,
        sections: spot.CurrentVersion.sections,
        images: spot.CurrentVersion.images
    }
}

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

        return state.spots
            .map(convertSchema)
            .reduce((acc, spot) => {
            acc.push({
                id: spot.id,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name
            })
            return acc
        }, [])  
              
    },

    // returns true if a spot is selected, false otherwise
    spotSelected (state) {

        return (state.selectedSpotId !== null)
        
    },

    spotsInBounds (state) {
    return state.spots.map(convertSchema).filter(spot => {
        return (
            spot.lat > state.mapBounds.southWest.lat &&
            spot.lat < state.mapBounds.northEast.lat &&
            spot.lng > state.mapBounds.southWest.lng &&
            spot.lng < state.mapBounds.northEast.lng
        )
    })
    }

}

export const mutations = {

    setSpots(state, spots) { state.spots = spots },
    setCenter(state, center) { state.mapCenter = center },
    setBounds(state, bounds) { state.mapBounds = bounds },
    selectSpot(state, id) { state.selectedSpotId = id }

}

export const actions = {

}