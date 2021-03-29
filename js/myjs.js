const app = Vue.createApp({
  data() {
    return {
      blogs: [],
      selectedBlog: null,
      newComment: { user: "", comment: "" },
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
    },
    postComment() {
      const currentDate = new Date();
      const date = currentDate.toISOString().slice(0, 10);
      const time = currentDate.toLocaleTimeString().substr(0, 8).trim();
      const date_time = date + " " + time;

      fetch("http://vue-test.gingerbd.com/api/post-comment", {
        method: "POST",
        body: JSON.stringify({
          blog_id: this.selectedBlog.id,
          comment: this.newComment.comment,
          comment_datetime: date_time,
          user: this.newComment.user,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(() => $("#NewCommentModal").modal("hide"))
        .then(() => this.selectBlog(this.selectedBlog.id))
        .catch((error) => console.log(error));
    },
    removeComment(id) {
      fetch("http://vue-test.gingerbd.com/api/remove-comment/" + id)
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(() => this.selectBlog(this.selectedBlog.id));
    },
  },
  mounted() {
    this.loadBlogs();
    this.selectBlog(1);
  },
});

const mountedApp = app.mount('#page-top');