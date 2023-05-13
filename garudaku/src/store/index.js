import Vuex from 'vuex';
const mainUrl = 'http://127.0.0.1:3000'
import axios from 'axios'

export default new Vuex.Store({
    state: {
        news: [],
        newsDetail: {},
    },
    mutations: {
        setNews(state, newsList) {
            state.news = newsList;
        },
        setDetailNews: (state, newsDetail) => {
            state.newsDetail = newsDetail
        },
        setUpdateNews: (state, newsDetail) => {
            state.newsDetail = newsDetail

        },
    },
    actions: {
        async fetchNews({ commit }) {
            await axios.get(`${mainUrl}/news`)
                .then(res => {
                    commit('setNews', res.data);
                });
        },
        async fetchDetailNews({ commit }, slug) {
            await axios.get(`${mainUrl}/news/${slug}`)
                .then(res => {
                    commit('setDetailNews', res.data);
                }).catch(err => {
                    console.log(err);
                });
        },
        async updateNews({ commit }, newsData) {
            await axios.put(`${mainUrl}/news/${newsData.slug}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newsData),
            })
                .then(response => response.json())
                .then(news => {
                    commit('setUpdateNews', news);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
});