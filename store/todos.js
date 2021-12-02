export const state = () => ({
    list: []
})

export const mutations = {
    add(state, item) {
        state.list.push(item)
    },
    remove(state, item) {
        state.list = state.list.filter(listItem => listItem.place_id !== item.place_id)
    },
    clearList(state) {
        state.list = []
    }
}