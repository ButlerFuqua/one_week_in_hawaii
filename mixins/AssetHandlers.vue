<script>
export default {
  methods: {
    getFeaturedImage(post) {
      let image;

      if (post)
        try {
          image = require(`~/assets/images/featured/${post.slug}.webp`);
        } catch (error) {
          image = require(`~/assets/images/no_image_yet.webp`);
        }
      else image = require(`~/assets/images/no_image_yet.webp`);

      return image;
    },
  },
};
</script>