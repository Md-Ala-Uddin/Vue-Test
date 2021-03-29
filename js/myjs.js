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
      fetch("http://vue-test.gingerbd.com/public/api/post-comment", {
        method: "POST",
        body: JSON.stringify({
          blog_id: this.selectedBlog.id,
          comment: this.newComment.comment,
          comment_datetime: new Date(),
          user: this.newComment.user,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .then(() => $("#NewCommentModal").modal("hide"))
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