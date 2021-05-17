<template>
  <v-app class="login">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6 col-lg-4">
        <form @submit.prevent="getToken(user)">
          <div class="form-logo">
            <i
              class="fas fa-gavel primary--text mr-2"
              style="font-size: 30px"
            ></i>

            <h1 style="font-size: 30px">Lawyers</h1>
          </div>
          <p class="text-center" style="font-size: 24px">
            Sign into your account
          </p>

          <v-alert
            v-for="(error, idx) in errors"
            :key="idx"
            dense
            text
            type="error"
          >
            {{ error }}
          </v-alert>

          <label class="form-label" for="email">Email</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="far fa-envelope primary--text"></i>
              </div>
            </div>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="user.email"
              required
            />
          </div>
          <label class="form-label" for="password">Password</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-lock primary--text"></i>
              </div>
            </div>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              required
            />
          </div>

          <button
            class="btn btn-primary btn-block"
            style="background-color: #276678; border-color: #276678"
          >
            Login
          </button>
        </form>
      </div>
      <div
        style="background-color: #276678"
        class="banner col-0 col-sm-6 col-md-6 col-lg-8"
      >
        <h1 class="white--text">Welcome</h1>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapState(["errors"]),
  },
  methods: {
    ...mapActions(["getToken"]),
  },
  data() {
    let user = {};

    return {
      user,
    };
  },
};
</script>

<style scoped>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";

form {
  width: 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

input {
  padding: 22px;
}

.form-control:focus,
.btn-primary:focus {
  box-shadow: none !important;
}

label {
  font-size: 13px;
  margin-top: 16px;
}

button {
  padding: 10px;
  margin-top: 16px;
}

button:hover {
  opacity: 0.9 !important;
}

.form-logo {
  display: flex;
  justify-content: center;
}

.banner {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 575px) {
  .banner {
    display: none;
  }
}
</style>