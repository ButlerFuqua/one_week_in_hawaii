
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async returnContentFromParams() {
      const {
        params: { slug },
        path,
      } = this.$route;
      let dir = path.replace(`/${slug}`, "");

      if (dir[0] === "/") dir = dir.replace("/", "");

      let fetchedContent;
      try {
        fetchedContent = await this.$content(dir, slug).fetch();
      } catch (error) {
        console.error(error);
        return false;
      }
      return fetchedContent;
    },
    async returnContentFromObj(obj) {
      let { dir, slug } = obj;
      if (dir[0] === "/") dir = dir.replace("/", "");
      let fetchedContent;
      try {
        fetchedContent = await this.$content(dir, slug).fetch();
      } catch (error) {
        console.error(error);
        return false;
      }
      return fetchedContent;
    },
    async returnAllPosts() {
      let query = this.$content("oahu", { deep: true }).sortBy(
        "post_number",
        "desc"
      );
      const fetchedPosts = await query.fetch();
      return fetchedPosts;
    },
    async returnAllBlogPosts() {
      let query = this.$content("blog", { deep: true }).sortBy(
        "post_number",
        "desc"
      );
      const fetchedPosts = await query.fetch();
      return fetchedPosts;
    },
  },
};
</script>