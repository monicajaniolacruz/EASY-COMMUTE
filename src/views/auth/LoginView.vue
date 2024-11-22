<template>
  <v-app>
    <v-container fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-h5 font-weight-bold">
                <v-icon left>mdi-paw</v-icon>
                le meow cafe
              </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-tabs v-model="currentForm" grow>
                <v-tab value="login">Login</v-tab>
                <v-tab value="signup">Sign Up</v-tab>
              </v-tabs>

              <v-window v-model="currentForm">
                <v-window-item value="login">
                  <v-form @submit.prevent="handleSubmit('login')" class="mt-5">
                    <v-text-field
                      v-model="loginEmail"
                      label="Email address"
                      prepend-icon="mdi-email"
                      type="email"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="loginPassword"
                      label="Password"
                      prepend-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                    <v-checkbox
                      v-model="rememberMe"
                      label="Remember me"
                    ></v-checkbox>
                    <v-btn
                      color="primary"
                      class="mt-4"
                      block
                      type="submit"
                    >
                      Sign In
                    </v-btn>
                  </v-form>
                </v-window-item>

                <v-window-item value="signup">
                  <v-form @submit.prevent="handleSubmit('signup')" class="mt-5">
                    <v-text-field
                      v-model="fullname"
                      label="Full Name"
                      prepend-icon="mdi-account"
                      :rules="[rules.required, rules.fullname]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="email"
                      label="Email address"
                      prepend-icon="mdi-email"
                      :rules="[rules.required, rules.email]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="phone_number"
                      label="Phone number"
                      prepend-icon="mdi-phone"
                      :rules="[rules.required, rules.phone]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="password"
                      label="Password"
                      prepend-icon="mdi-lock"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      :rules="[rules.required, rules.password]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="confirmPassword"
                      label="Confirm Password"
                      prepend-icon="mdi-lock-check"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      :rules="[rules.required, rules.confirmPassword]"
                      required
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      class="mt-4"
                      block
                      type="submit"
                    >
                      Sign Up
                    </v-btn>
                  </v-form>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="3000"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
// import { supabase } from "../supabaseClient"; // Assuming this path is correct

export default {
  name: "AuthComponent",
  data() {
    return {
      currentForm: 'login',
      showPassword: false,
      fullname: '',
      email: '',
      phone_number: '',
      password: '',
      confirmPassword: '',
      loginEmail: '',
      loginPassword: '',
      rememberMe: false,
      snackbar: false,
      snackbarText: '',
      snackbarColor: '',
      rules: {
        required: v => !!v || 'This field is required',
        fullname: v => (v && v.length >= 10) || 'Name should be at least 10 characters long',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        phone: v => (v && v.length === 11 && /^\d+$/.test(v)) || 'Phone number should be 11 digits',
        password: v => (v && v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /[0-9]/.test(v) && /[!@#$%^&*(),.?":{}|<>]/.test(v)) || 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character',
        confirmPassword: v => v === this.password || 'Passwords do not match'
      }
    }
  },
  methods: {
    showSnackbar(text, color) {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
    handleSubmit(formType) {
    if (formType === 'login') {
      console.log("Login Form Data:", {
        email: this.loginEmail,
        password: this.loginPassword,
        rememberMe: this.rememberMe
      });
    } else if (formType === 'signup') {
      console.log("Signup Form Data:", {
        fullname: this.fullname,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
        confirmPassword: this.confirmPassword
      });
    }
    // Show a snackbar as a placeholder for form submission logic
    this.showSnackbar(`Submitted ${formType} form`, 'success');
  }
    
  },
  
}
</script>