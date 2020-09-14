<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  props: {
    uploadPercentage: {
      type: Number,
      required: true
    }
  },
  computed: {
    message() {
      return this.uploadPercentage ? `${this.uploadPercentage} % uploaded` : "";
    }
  }
};
</script>

<style></style>
