<template>
  <v-sheet justify-center>
    <v-skeleton-loader :loading="loading" :transition="transition" height="94" type="table">
      <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Employee List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn @click="testSubmit">Reload Data</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" to="employee/add">New Employee</v-btn>

            <!-- <v-dialog v-model="dialog" max-width="500px">
                
                <v-card>
                    <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                        </v-col>
                        </v-row>
                    </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>-->
          </v-toolbar>
        </template>
        <template v-slot:item.image="{ item }">
          <v-img
            :src="item.image"
            :lazy-src="item.image"
            :alt="item.name"
            height="30px"
            width="30px"
          ></v-img>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-sheet>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    loading: true,
    transition: "fade-transition",
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        value: "id",
      },
      { text: "NAME", value: "name" },
      { text: "EMAIL", value: "email" },
      { text: "PHONE", value: "phone" },
      { text: "DEPARTMENT", value: "department_name" },
      //{ text: 'DEPARTMENT_ID', value: 'department_id' },
      { text: "IMAGE", value: "image" },
      { text: "DESCRIPTION", value: "note" },
      { text: "CREATED_AT", value: "created_at" },
      { text: "UPDATED_AT", value: "updated_at" },
      { text: "DEL_STAUTS", value: "del_status" },
      { text: "ACTIVE", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      phone: "",
      department: "",
      description: "",
    },
    defaultItem: {
      name: "",
      email: "",
      phone: "",
      department: "",
      description: "",
    },
  }),

  computed: {
    ...mapState("employee", ["employees"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Employee" : "Edit Employee";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    if (!this.employees) {
      this.getAllEmployee();
      setTimeout(() => {
        this.loading = false;
        this.desserts = this.employees;
      }, 1000);
    } else {
      this.loading = false;
      this.desserts = this.employees;
    }
    // goi API o day
  },
  mounted() {},
  methods: {
    ...mapActions("employee", ["getAllEmployee", "deleteEmployee"]),
    ...mapActions("alert", ["clear"]),
    testSubmit() {
      this.getAllEmployee();
      //console.log(this.employee)
      this.desserts = this.employees;
    },
    // filterEmployeeToDesserts (employee) {

    // },
    initialize() {
      this.desserts = [
        {
          id: 1,
          name: "",
          email: "",
          phone: "",
          image: "",
          department_name: "",
          department_id: "",
          note: "",
          created_at: "",
          updated_at: "",
          del_status: "",
        },
      ];
    },
    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      this.$router.push({ name: "EditEmployee", params: { employee: item } });
      console.log(item);
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      const isConfirm = confirm("Are you sure you want to delete this item?");

      if (isConfirm) {
        setTimeout(() => this.clear(), 3000);
        this.desserts.splice(index, 1);
        this.deleteEmployee({ item });
      }
    },
    //   close () {
    //     this.dialog = false
    //     this.$nextTick(() => {
    //       this.editedItem = Object.assign({}, this.defaultItem)
    //       this.editedIndex = -1
    //     })
    //   },

    //   save () {
    //     if (this.editedIndex > -1) {
    //       Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //     } else {
    //       this.desserts.push(this.editedItem)
    //     }
    //     this.close()
    //   },
  },
};
</script>
