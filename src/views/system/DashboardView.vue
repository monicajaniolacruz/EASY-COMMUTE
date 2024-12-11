<script setup>
// import { supabase } from "../supabase";
import router from "@/router/index";
import { ref } from "vue";
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue";

const isSidebarOpen = ref(false);

async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const goToVehicleType = () => {
    router.push("/rides");
}
</script>

<template>
    <LayoutWithSidebar>
        <!-- Video Background -->
        <div class="video-container">
            <video
                autoplay
                loop
                muted
                playsinline
                class="video-background"
            >
                <source
                    src="/public/video/homeview.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            <!-- Overlay Content -->
            <div class="overlay">
                <div class="main-title">DON'T KNOW</div>
                <div class="subtitle">WHERE TO GO?</div>
                <RouterLink to="/rides" style="text-decoration: none">
                    <v-btn class="contact-button"> GET STARTED </v-btn>
                </RouterLink>
            </div>
        </div>
    </LayoutWithSidebar>
</template>

<style>
/* Video container to control layering */
.video-container {
    position: relative;
    width: 100%;
    height: 100vh; /* Full screen height */
    overflow: hidden;
}

/* Background Video */
.video-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0; /* Ensure it stays behind */
}

/* Overlay Styles for text and button */
.overlay {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translateY(-50%);
    text-align: left;
    color: white;
    z-index: 1; /* Higher than video */
}

.main-title {
    font-size: 5rem;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow:
        2px 2px 10px #00bfff,
        4px 4px 10px rgba(254, 254, 254, 0.8);
    margin-bottom: 10px;
}

.subtitle {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 3px;
}

/* Contact Button */
.contact-button {
    display: inline-block;
    background-color: #00bfff;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0, 255, 128, 0.4);
}

.contact-button:hover {
    background-color: #ffffff;
    color: #00bfff;
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(0, 255, 128, 0.6);
}
</style>

