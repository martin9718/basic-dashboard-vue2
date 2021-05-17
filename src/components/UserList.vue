<template>
    <v-container fluid>
      <PageHeader
        class="mt-10 mx-2 mx-sm-16"
        :titlePageHeader="titlePageHeader"
        :breadcrumbps="breadcrumbps"
      />
      <v-col cols="3" sm="3" md="3" class="mt-10 mx-2 mx-sm-16">
        <v-text-field v-model="search" label="Search"></v-text-field>
      </v-col>
      <v-data-table
        :headers="headersTable"
        :items="users"
        :search="search"
        sort-by="full_name"
        class="elevation-1 mt-10 mx-2 mx-sm-16"
      >
        <template v-slot:top>
          <v-toolbar flat height="0">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="primary btn-add"
                  dark
                  style="positon: relative; top: -100px; font-size: 18px"
                  v-bind="attrs"
                  v-on="on"
                >
                  ADD USER<i class="far fa-plus-square"></i>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-alert
                    v-for="(error, idx) in getErrors"
                    :key="idx"
                    dense
                    text
                    type="error"
                  >
                    {{ error }}
                  </v-alert>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.first_name"
                          label="First name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.last_name"
                          label="Last name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          type="email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.password"
                          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show1 ? 'text' : 'password'"
                          name="input-10-1"
                          label="Password"
                          counter
                          @click:append="show1 = !show1"
                        ></v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" md="6">
                        <v-select
                          :items="rolesItems"
                          label="Role"
                          v-model="editedItem.user_rol_id"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this user?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            style="color: #276678; font-size: 14px"
          >
            fas fa-pencil-alt
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
            style="color: #ff5252; font-size: 14px"
          >
            fas fa-trash-alt
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-container>
</template>

<script>
import PageHeader from './PageHeader';

import {mapActions, mapGetters} from 'vuex';

export default {
  name: "UserList",
  components: {
    PageHeader
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      users: [],
      idDelete: 0,
      editedIndex: -1,
      search: "",
      editedItem: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_rol_id: "",
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        email: "",
        user_rol_id: "",
        password: "",
      },
      headersTable: [
        { text: "Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "UserRole.name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      breadcrumbps: [
        {
          text: "Users",
          disabled: false,
          href: "",
        },
        {
          text: "User list",
          disabled: true,
          href: "",
        },
      ],
      titlePageHeader: "User list",
      show1: false,
      rolesItems: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['getErrors']),
    formTitle() {
      return this.editedIndex === -1 ? "Add user" : "Edit user";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  methods: {
    ...mapActions('auth',['registerUser', 'getUsers', 'getUserRoles', 'updateUser', 'desactiveUser', 'setErrors']),
    async initialize() {
      this.users = await this.getUsers();
      const roles = await this.getUserRoles();
      this.rolesItems = roles.map(role => {
        return {text: role.name, value: role.id}
      });
      this.setErrors('clear');
    },
    editItem(item) {
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.idDelete = item.id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      await this.desactiveUser(this.idDelete);
      if (this.getErrors.length == 0) {
        this.closeDelete();
        this.initialize();
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {

      if (!this.editedItem.id) {
        await this.registerUser(this.editedItem);
        if (this.getErrors.length == 0) {
          this.close();
          this.initialize();
        }
      } else {
        await this.updateUser(this.editedItem);
        if (this.getErrors.length == 0) {
          this.close();
          this.initialize();
        }
      }
    },
  },
};
</script>

<style>
</style>