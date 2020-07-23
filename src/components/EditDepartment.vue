<template>
    <v-sheet>
        <v-toolbar flat color="white">
             <v-divider
            class="mx-2"
            inset
            vertical
            ></v-divider>
            <v-toolbar-title>Edit Department</v-toolbar-title>
            <v-divider
            class="mx-2"
            inset
            vertical
            ></v-divider>
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
            v-model="description"
            :error-messages="descriptionErrors"
            :counter="10"
            label="Description"
            required
            @input="$v.description.$touch()"
            @blur="$v.description.$touch()"
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
  import { validationMixin } from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, minLength: minLength(10) },
      description: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
        name: '',
        description: '',
        checkbox: false,
    }),
    created () {
      // goi API o day
      console.log(this.$route.params.item)
    },
    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.minLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.required && errors.push('Item is required')
        return errors
      },
    },

    methods: {
        submit () {
            this.$v.$touch()
        },
        clear () {
            this.$v.$reset()
            this.name = ''
            this.checkbox = false
        },
    },
  }
</script>