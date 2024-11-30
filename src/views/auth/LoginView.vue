<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container fluid class="p-0">
        <v-row>
          <!-- Left Column for Video -->
          <v-col cols="12" lg="6" class="h-screen bg-surface-light" v-if="!mobile">
            <video
              src="/images/register.mp4"
              class="fill-height"
              autoplay
              loop
              muted
              playsinline
            ></video>
          </v-col>

          <!-- Right Column for Login Form -->
          <v-col cols="12" lg="6" :class="mobile ? '' : 'pt-12'">
            <v-card class="mx-auto" elevation="0" max-width="600">
              <v-card-title class="text-center pb-0">
                <v-img
                  class="mx-auto mb-10"
                  src="/public/LOGO (3).png"
                  :width="mobile ? '75%' : '25%'"
                ></v-img>
                <p>Login</p>
              </v-card-title>

              <v-card-text class="bg-surface-light pt-4">
                <v-divider class="my-5"></v-divider>
                <LoginForm></LoginForm>
                <v-divider class="my-5"></v-divider>
                <h5 class="text-center">
                  Don't have account?
                  <RouterLink to="/register">Click here to register</RouterLink>
                </h5>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
