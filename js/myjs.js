const app = Vue.createApp({
  data() {
    return {
      blogs: [],
      selectedBlog: null
    };
  },
  methods: {
    loadBlogs() {
      fetch("http://vue-test.gingerbd.com/api/blogs")
        .then((response) => response.json())
        .then((json) => (this.blogs = json.blogs));
    },
    selectBlog(id) {
        fetch("http://vue-test.gingerbd.com/api/view-blog/" + id)
          .then((response) => response.json())
          .then((json) => (this.selectedBlog = json.blogs[0]));
    }
  },
  mounted() {
      this.loadBlogs();
      this.selectBlog(1);
  }
});

const mountedApp = app.mount('#page-top');