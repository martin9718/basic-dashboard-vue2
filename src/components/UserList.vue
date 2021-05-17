<template>
  <MainLayout class="fadeIn">
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
                    v-for="(error, idx) in errors"
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
                          :items="selectItems"
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
  </MainLayout>
</template>

<script>
import PageHeader from "./PageHeader";
import TableCrud from "./TableCrud";
import MainLayout from "./MainLayout";
import { mapActions, mapState } from "vuex";

export default {
  name: "UserList",
  components: {
    PageHeader,
    TableCrud,
    MainLayout,
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
        password: "",
      },
      defaultItem: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        user_rol_id: "",
        password: "",
      },
      headersTable: [
        { text: "Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role_name" },
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
      // rules: {
      //   required: (value) => !!value || "Required.",
      //   min: (v) => v.length >= 8 || "Min 8 characters",
      //   emailMatch: () => `The email and password you entered don't match`,
      // },
      show1: false,
      selectItems: [
        { text: "Admin", value: 1 },
        { text: "User", value: 2 },
        { text: "Receptionist", value: 4 },
      ],
    };
  },
  computed: {
    ...mapState(["errors"]),
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
    ...mapActions(["getUsers", "registerUser", "desactiveUser", "updatedUser"]),
    async initialize() {
      this.users = await this.getUsers();
    },
    editItem(item) {
      this.editedIndex = 1;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      //   this.editedIndex = this.data.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      this.idDelete = item.id;
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      //   this.data.splice(this.editedIndex, 1);
      await this.desactiveUser(this.idDelete);
      if (this.errors.length == 0) {
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
      //   if (this.editedIndex > -1) {
      //     Object.assign(this.data[this.editedIndex], this.editedItem);
      //   } else {
      //     this.data.push(this.editedItem);
      //   }

      if (!this.editedItem.id) {
        await this.registerUser(this.editedItem);
        if (this.errors.length == 0) {
          this.close();
          this.initialize();
        }
      } else {
        await this.updatedUser(this.editedItem);
        if (this.errors.length == 0) {
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