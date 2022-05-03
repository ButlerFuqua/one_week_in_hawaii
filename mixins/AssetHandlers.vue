<script>
export default {
  methods: {
    getFeaturedImage(post) {
      let image;

      if (post)
        try {
          image = require(`~/assets/images/featured/${post.slug}.png`);
        } catch (error) {
          image = require(`~/assets/images/no_image_yet.png`);
        }
      else image = require(`~/assets/images/no_image_yet.png`);

      return image;
    },
  },
};
</script>