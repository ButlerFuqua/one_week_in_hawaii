<script>
export default {
  name: "DateHandlers",
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  methods: {
    returnFriendlyUpdatedDate(post) {
      const date = new Date(post.updated_date);

      const month = this.monthsShort[date.getMonth() - 1];
      const year = date.getFullYear();
      const day = date.getDate() + 1;

      return `${month} ${day}, ${year}`;
    },
    returnFriendlyPostedDate(post) {
      const date = new Date(post.posted_date);

      const month = this.monthsShort[date.getMonth() - 1];
      const year = date.getFullYear();
      const day = date.getDate() + 1;

      return `${month} ${day}, ${year}`;
    },
    returnFriendlyCreatedDate(post) {
      const date = new Date(post.createdAt);

      const month = this.monthsShort[date.getMonth() - 1];
      const year = date.getFullYear();
      const day = date.getDate();

      return `${month} ${day}, ${year}`;
    },
  },
};
</script>