export const state = () => ({
    list: []
})

export const mutations = {
    add(state, item) {
        state.list.push({
            dir: item.dir,
            slug: item.slug,
        })
    },
    remove(state, item) {
        state.list = state.list.filter(listItem => listItem.slug !== item.slug)
    },
    clearList(state) {
        state.list = []
    }
}