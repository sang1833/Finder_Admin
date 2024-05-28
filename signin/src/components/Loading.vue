<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "LoadingSpinner"
};
</script>

<style scoped>
.loader {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #0376c3; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
