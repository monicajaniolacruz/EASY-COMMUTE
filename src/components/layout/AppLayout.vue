<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>
<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="black">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <slot name="content"></slot>
        </v-container>
      </v-main>
      <v-footer class="font-weight-bold" color="black" border app
        ><div :class="mobile ? 'w-100 text-center' : ''">
          Copyright © 2024 -
          <span class="ml-1">
            <v-icon class="mr-1">mdi mdi-map-marker</v-icon>
            Easy Commute
          </span>
          | All Rights Reserved
        </div></v-footer
      >
    </v-app>
  </v-responsive>
</template>
