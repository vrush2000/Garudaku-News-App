<template>
    <div v-for="news in newsList" :key="news.slug" class="col-8">
        <div class="card" @click.prevent="navigatePage(`/news/${news.slug}`)">
            <div class="part2">
                <img :src="news.image" alt="image" class="CardImg">
                <p>
                    <span>
                        <h2>{{ news.title }}</h2>
                    </span>
                    {{ news.content }}
                    <br />
                    <span style="margin-top: 5px;">
                        <p>
                            {{ formatDate(news.createdAt) }}
                        </p>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NewsList',
    data() {
        return {
            newsList: []
        };
    },
    mounted() {
        this.fetchNews();
    },
    methods: {
        fetchNews() {
            this.$store.dispatch('fetchNews');
        },
        formatDate(date) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const dd = new Date(date).toLocaleDateString('id-ID', options)
            const tt = new Date(date).toLocaleTimeString('id-ID', ([], { hour: '2-digit', minute: '2-digit' }))
            return `${dd}, ${tt} WIB`
        },
        navigatePage(toPage) {
            this.$router.push(toPage)
        },
    },
    computed: {
        newsList() {
            return this.$store.state.news;
        }
    }
};
</script>
  
<style>
a {
    text-decoration: none;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border-radius: 5px;
}

.CardImg {
    border-radius: 5px 0 0 5px;
    width: 100%;
    margin: -15px 0 -15px -35px;
}


p {
    margin-top: 1em;
}

.part2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1em;
    padding: 1em;
}

h2 {
    margin-top: -10px;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

b {
    padding: 2px 16px;
}



[class*="col-"] {
    width: 100%;
}

@media only screen and (min-width: 768px) {
    .col-1 {
        width: 8.33%;
    }

    .col-2 {
        width: 16.66%;
    }

    .col-3 {
        width: 25%;
    }

    .col-4 {
        width: 33.33%;
    }

    .col-5 {
        width: 41.66%;
    }

    .col-6 {
        width: 50%;
    }

    .col-7 {
        width: 58.33%;
    }

    .col-8 {
        width: 66.66%;
        margin: auto
    }

    .col-9 {
        width: 75%;
    }

    .col-10 {
        width: 83.33%;
    }

    .col-11 {
        width: 91.66%;
    }

    .col-12 {
        width: 100%;
    }
}
</style>