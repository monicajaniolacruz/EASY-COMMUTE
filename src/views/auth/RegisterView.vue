<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="light-blue-darken-3">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto">
              <v-card class="mx-auto" prepend-icon="mdi-account" subtitle="The #1 Vue UI Library">
                <template v-slot:title>
                  <span class="font-weight-black">Easy Commute</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="First name"></v-text-field>

                    <v-text-field label="Last name"></v-text-field>
                    <v-text-field label="Email"></v-text-field>
                    <v-text-field label="Password" type="password"></v-text-field>
                    <v-text-field label="Confirm Password" type="password"></v-text-field>
                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
                  </v-form>

                  <v-divider class="my-5"></v-divider>

                  <h5>
                    Already have an account?<RouterLink class="text-primary" to="/login"
                      >Click here to Login</RouterLink
                    >
                  </h5>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer color="light-blue-darken-3" border app>2023 COPYRIGHT</v-footer>
    </v-app>
  </v-responsive>
</template>
