<template >
  <h1>Home</h1>
</template>

<script>


import {mapActions} from "vuex";

export default {
  name: "Home",
  methods:{
    ...mapActions('auth',['verifyToken'])
  },
  created() {
    this.verifyToken();
  }
}
</script>

<style>
</style>
