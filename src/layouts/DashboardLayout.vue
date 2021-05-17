<template>
<v-app>
  <Navbar></Navbar>
  <Sidebar></Sidebar>
    <v-main>
      <slot/>
    </v-main>
</v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default {
  name: "DashboardLayout",
  components:{
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>

</style>