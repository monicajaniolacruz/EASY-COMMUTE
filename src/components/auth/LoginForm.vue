<template>
  <v-form fast-fail @submit.prevent>
    <v-text-field label="Email"></v-text-field>
    <v-text-field label="Password" type="password"></v-text-field>
    <v-btn class="mt-2" type="submit" block color="primary" prepend-icon="mdi-login">LogIn</v-btn>
  </v-form>
</template>
