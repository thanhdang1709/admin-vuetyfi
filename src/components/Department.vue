<template>
  <v-sheet justify-center>
    <v-skeleton-loader :loading="loading" :transition="transition" height="94" type="table">
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="id"
        class="elevation-1"
        :loading="loading"
        :server-items-length="totalItems"
        :options.sync="options"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Department List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>

            <v-btn color="primary" dark class="mb-2" to="department/add">New Department</v-btn>

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
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
      </v-data-table>
    </v-skeleton-loader>
  </v-sheet>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    options: {},
    totalItems: 0,
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
      { text: "DESCRIPTION", value: "note" },
      { text: "ACTIVE", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      emanote: "",
    },
    defaultItem: {
      name: "",
      note: "",
    },
  }),
  computed: {
    ...mapState("department", ["departments", "total_page"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    options: {
      handler() {
        // console.log(this.options);
        this.getDataFromApi().then((data) => {
          console.log(data);
          this.desserts = data.items.data;
          this.totalItems = this.total_page;
        });
      },
      deep: true,
    },
  },

  created() {
    console.log("created department!");
    // if (!this.departments) {
    //   this.getDataFromApi().then((data) => {
    //     console.log(data);
    //   });
    //   setTimeout(() => {
    //     this.desserts = this.departments;
    //     this.loading = false;
    //   }, 500);
    // } else {
    //   console.log("computed o day");
    //   this.desserts = this.departments;
    //   this.loading = false;
    // }
    // goi API o day
    if (!this.departments) {
      this.getDataFromApi().then((data) => {
        console.log(data);
        this.loading = false;
        this.desserts = this.departments;
        this.totalItems = this.total_page;
      });
    } else {
      this.loading = false;
      this.desserts = this.departments;
    }
  },
  mounted() {
    this.$Progress.start();
  },

  methods: {
    ...mapActions("department", ["getAllDepartment", "deleteDepartment"]),
    ...mapActions("alert", ["clear"]),
    getDataFromApi() {
      return new Promise((resolve) => {
        const { page, itemsPerPage } = this.options;
        //let items = this.employees;
        //const total = items.length;

        // if (itemsPerPage > 0) {
        //   items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        //
        this.desserts = this.departments;
        this.getAllDepartment({
          limit: itemsPerPage,
          page: page,
        }).then((responseData) => {
          this.$Progress.finish();
          console.log(responseData);
          resolve({
            items: responseData,
            total: this.total_page,
          });
        });
        // this.$forceUpdate();
      });
    },

    editItem(item) {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      // this.dialog = true
      this.$router.push({
        name: "EditDepartment",
        params: { department: item },
      });
      console.log(item);
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (confirm("Are you sure you want to delete this department?")) {
        setTimeout(() => this.clear(), 3000);
        this.desserts.splice(index, 1);
        this.deleteDepartment({ id: item.id });
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
