<template>
	<v-sheet>
		<v-toolbar flat color="white">
			<v-divider class="mx-2" inset vertical></v-divider>
			<v-toolbar-title>Add New Employee</v-toolbar-title>
			<v-divider class="mx-2" inset vertical></v-divider>
			<v-spacer></v-spacer>
		</v-toolbar>
		<v-container fluid>
			<form class="pa-2">
				<v-row>
					<v-col cols="12" sm="6">
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
					<v-col cols="12" sm="6">
						<v-text-field
							v-model="phone"
							:error-messages="phoneErrors"
							:counter="10"
							label="Phone"
							required
							@input="$v.phone.$touch()"
							@blur="$v.phone.$touch()"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="6">
						<v-text-field
							v-model="email"
							:error-messages="emailErrors"
							label="E-mail"
							required
							@input="$v.email.$touch()"
							@blur="$v.email.$touch()"
						></v-text-field>
					</v-col>
					<v-col cols="12" sm="6">
						<v-select
							multiple
							v-model="department"
							:items="departments"
							:error-messages="departmentErrors"
							label="Department"
							required
							@change="$v.department.$touch()"
							@blur="$v.department.$touch()"
						></v-select>
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
				<v-row>
					<v-col cols="12" sm="12">
						<v-file-input
							v-model="files"
							color="deep-purple accent-4"
							counter
							label="Profile Image"
							multiple
							placeholder="Select employee's image"
							prepend-icon="mdi-image"
							outlined
							id="file"
							:show-size="1000"
						>
							<template v-slot:selection="{ index, text }">
								<v-chip
									v-if="index < 2"
									color="deep-purple accent-4"
									dark
									label
									small
								>
									{{ text }}
								</v-chip>

								<span
									v-else-if="index === 2"
									class="overline grey--text text--darken-3 mx-2"
								>
									+{{ files.length - 2 }} File(s)
								</span>
							</template>
						</v-file-input>
					</v-col>
				</v-row>

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
//import axios from "axios";
import {
	required,
	maxLength,
	email,
	minLength,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
	mixins: [validationMixin],

	validations: {
		name: { required, minLength: minLength(10) },
		phone: { required, maxLength: maxLength(10), minLength: minLength(10) },
		email: { required, email },
		description: { required },
		department: { required },
		checkbox: {
			checked(val) {
				return val;
			},
		},
	},

	data: () => ({
		files: [],
		name: "thanhdang",
		phone: "0339888746",
		email: "thanhdang@gmail.com",
		description: "description",
		department: [],
		departments: [],
		checkbox: false,
		previewImage: null,
	}),
	created() {
		this.initialize();
		// goi API o day
	},
	computed: {
		checkboxErrors() {
			const errors = [];
			if (!this.$v.checkbox.$dirty) return errors;
			!this.$v.checkbox.checked && errors.push("You must agree to continue!");
			return errors;
		},
		departmentErrors() {
			const errors = [];
			if (!this.$v.department.$dirty) return errors;
			!this.$v.department.required && errors.push("Item is required");
			return errors;
		},
		nameErrors() {
			const errors = [];
			if (!this.$v.name.$dirty) return errors;
			!this.$v.name.minLength &&
				errors.push("Name must be at most 10 characters long");
			!this.$v.name.required && errors.push("Name is required.");
			return errors;
		},
		phoneErrors() {
			const errors = [];
			if (!this.$v.phone.$dirty) return errors;
			!this.$v.phone.maxLength &&
				errors.push("Phone must be at most 10 characters long");
			!this.$v.phone.minLength &&
				errors.push("Phone must be at most 10 characters long");
			!this.$v.phone.required && errors.push("Phone is required.");
			return errors;
		},
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push("Must be valid e-mail");
			!this.$v.email.required && errors.push("E-mail is required");
			return errors;
		},
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.required && errors.push("Item is required");
			return errors;
		},
	},
	watch: {
		files: function() {
			console.log(this.files[0]);
		},
	},
	methods: {
		...mapActions("employee", ["addEmployee"]),
		initialize() {
			this.departments = ["Kinh doanh", "Developer"];
		},
		submit() {
			this.$v.$touch();
			if (this.$v.$invalid) {
				return;
			}
			var formData = new FormData();
			var imagefile = document.querySelector("#file");
			formData.append("image", imagefile.files[0]);
			formData.append("name", this.name);
			formData.append("phone", this.phone);
			formData.append("email", this.email);
			formData.append("note", this.description);
			formData.append("departments", this.department);
			this.addEmployee(formData);
			//}
		},
		clear() {
			this.$v.$reset();
			this.name = "";
			this.email = "";
			this.select = null;
			this.checkbox = false;
		},
	},
};
</script>
