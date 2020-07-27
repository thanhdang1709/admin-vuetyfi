<template>
  <v-sheet>
    <v-toolbar flat color="white">
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-toolbar-title>Add New Department</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <form class="pa-2">
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-textarea
          v-model="note"
          :error-messages="noteErrors"
          :counter="10"
          label="Description"
          required
          @input="$v.note.$touch()"
          @blur="$v.note.$touch()"
        ></v-textarea>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Do you agree?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </v-container>
  </v-sheet>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
export default {
  mixins: [validationMixin],

  validations: {
    name: { required, minLength: minLength(5) },
    note: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data: () => ({
    name: "",
    note: "",
    checkbox: false,
  }),
  created() {
    // goi API o day
  },
  computed: {
    ...mapState("alert", ["type", "message"]),
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must be at most 5 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    noteErrors() {
      const errors = [];
      if (!this.$v.note.$dirty) return errors;
      !this.$v.note.required && errors.push("Description is required");
      return errors;
    },
  },

  methods: {
    ...mapActions("department", ["addDepartment"]),
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.addDepartment({
        name: this.name,
        note: this.note,
      });
      setTimeout(() => {
        this.$router.push({ name: "Department" });
      }, 1000);
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.note = "";
      this.checkbox = false;
    },
  },
};
</script>
