<template>
  <h1>history</h1>
</template>

<script>
import cosInstance from "../utils/cos";

export default {
  created() {},
  mounted() {
    setTimeout(() => {
      cosInstance.getBucket(null, (err, data) => {
        console.log(err || data);
      });
    }, 1000);
  }
};
</script>

<style></style>
