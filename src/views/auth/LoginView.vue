<template>
    <v-app>
      <!-- Background Video -->
      <div class="video-container">
        <video autoplay muted loop class="background-video">
          <source src="/public/video/register.mp4" type="video/mp4" />
        </video>
      </div>
  
      <!-- Header Section -->
      <v-app-bar app flat class="transparent-navbar">
        <v-container class="d-flex align-center justify-center">
          <!-- Logo -->
          <v-app-bar-title class="logo">
            Easy Commute
          </v-app-bar-title>
  
          <!-- Navigation -->
          <v-spacer></v-spacer>
          <router-link to="/">
            <button class="ml-3 adjustable-button">Sign in</button>
          </router-link>
        </v-container>
      </v-app-bar>
  
      <!-- Router View -->
      <router-view />
    </v-app>
  </template>
  
  <style scoped>
  .background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  
  .video-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  .logo {
    font-size: 2em;
    color: white;
    user-select: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
      Verdana, sans-serif;
    z-index: 2;
    position: absolute;
    top: var(--logo-top, 6%); /* Adjustable logo top position */
    left: var(--logo-left, 15%); /* Adjustable logo left position */
    transform: translate(-50%, -50%);
  }
  
  .transparent-navbar {
    background-color: transparent;
    z-index: 3;
  }
  
  .white-text-custom {
    color: white !important;
  }
  
  .adjustable-button {
    position: absolute;
    top: var(--button-top, 8%);
    left: var(--button-left, 85%);
    transform: translate(-50%, -50%);
    width: 130px;
    height: 50px;
    background: transparent;
    border: 2px solid white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1em;
    color: white;
    font-weight: 500;
    transition: 0.5s;
    z-index: 4;
  }
  
  .adjustable-button:hover {
    background: #fff;
    color: #162938;
  }
  
  .adjustable-button:disabled {
    pointer-events: none;
  }
  
  .adjustable-button:active {
    box-shadow: none;
    transform: translateY(0);
  }
  
  /* Media Queries for Responsive Design */
  @media (max-width: 900px) {
    .v-app-bar-title {
      font-size: 1.5em; /* Reduced font size for mid-range devices */
    }
  
    .adjustable-button {
      width: 120px; /* Adjust button size */
      font-size: 1rem;
      top: 60%;
      left: 75%;
      transform: translate(-50%, -50%);
    }
  }
  
  @media (max-width: 600px) {
    .logo {
      font-size: 1.5em; /* Adjust logo font size for small devices */
      top: 5%;
      left: 10%;
    }
  
    .adjustable-button {
      width: 120px; /* Adjust button size */
      font-size: 1rem;
      top: 60%;
      left: 75%;
      transform: translate(-50%, -50%);
    }
  }
  
  @media (max-width: 400px) {
    .logo {
      font-size: 1.2em; /* Further reduce logo font size for extra small screens */
    }
  
    .adjustable-button {
      width: 100px; /* Adjust button width for smaller devices */
      font-size: 0.9rem;
      top: 65%;
      left: 75%;
    }
  }
  </style>
  