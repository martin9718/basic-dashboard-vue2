<template>
  <v-navigation-drawer width="280" :value="getDraw" class="boxShawdom" app>
      <v-list
        class="boxShawdom d-flex align-center"
        style="height: 80px; width: 280px"
      >
        <v-list-item class="text-left">
          <v-list-item-icon>
            <v-icon class="primary--text" style="font-size: 20px"
              >fas fa-file-invoice-dollar</v-icon
            >
          </v-list-item-icon>

          <h1>
            <v-list-item-title style="font-size: 20px"
              >Declara Fácil</v-list-item-title
            >
          </h1>
        </v-list-item>
      </v-list>

      <v-list id="dash">
        <router-link :to="`/`" class="link">
          <v-list-group
            :value="true"
            prepend-icon="fas fa-home"
            class="primary--text"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title
                  class="secondary--text"
                  style="font-weight: 500"
                  >Dashboard</v-list-item-title
                >
              </v-list-item-content>
            </template>
          </v-list-group>
        </router-link>
      </v-list>
      <v-list>
        <v-list-group
          :value="true"
          prepend-icon="fas fa-users"
          class="primary--text"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="secondary--text"
                style="font-weight: 500"
                >Users</v-list-item-title
              >
            </v-list-item-content>
          </template>
          <router-link :to="`/`" class="link">
            <v-list-item link class="ml-3">
              <v-list-item-icon>
                <v-icon style="font-size: 10px">fas fa-circle-notch</v-icon>
              </v-list-item-icon>
              <v-list-item-title>User list</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "SideBar",
  computed: {
    ...mapGetters(['getDraw'])
  }
};
</script>

<style scoped>
.link {
  text-decoration: none !important;
}
</style>