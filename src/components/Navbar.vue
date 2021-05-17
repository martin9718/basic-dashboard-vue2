<template>
  <v-app-bar app class="boxShawdom" style="background: white; height: 80px">
      <v-app-bar-nav-icon @click="setDraw"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-avatar>
        <img src="../assets/user.png" alt="Photo user" />
      </v-avatar>
      <div>
        <p class="mb-1 mt-5 mx-5" style="font-size: 14px; font-weight: bold">
          {{ getUser.full_name ? getUser.full_name : ''}}
        </p>
        <p class="mt-1" style="font-size: 12px; text-align: center">
          {{ getUser.user_rol_name ? getUser.user_rol_name : '' }}
        </p>
      </div>
      <v-btn icon>
        <v-icon @click="logout">mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "Navbar",
  computed:{
    ...mapGetters('auth', ['getUser'])
  },
  methods: {
    ...mapActions(['setDraw',]),
    ...mapActions('auth',['logout',]),
  }
};
</script>

<style>
</style>