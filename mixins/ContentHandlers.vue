
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
        "updated_at",
        "asc"
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
    async returnAllIslands() {
      let query = this.$content("islands", { deep: true }).sortBy(
        "post_number",
        "asc"
      );
      const fetchedIslands = await query.fetch();
      return fetchedIslands;
    },
    async returnAllInfoPages() {
      let query = this.$content("info", { deep: true }).sortBy(
        "post_number",
        "asc"
      );
      const fetchedPages = await query.fetch();
      return fetchedPages;
    },
  },
};
</script>