const app = Vue.createApp({
  data() {
    return {
      blogs: [],
    };
  },
  methods: {
    loadBlogs() {
      fetch("http://vue-test.gingerbd.com/api/blogs")
        .then((response) => response.json())
        .then((json) => (this.blogs = json.blogs));
    },
  },
  mounted() {
      this.loadBlogs();
  }
});

const mountedApp = app.mount('#page-top');