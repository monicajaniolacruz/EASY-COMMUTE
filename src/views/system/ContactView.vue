<script setup>
import { supabase } from "../../supabase";
import router from "../../router/index";
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

const zoomedImage = ref(null);
const showModal = ref(false);

const openModal = (image) => {
    zoomedImage.value = image;
    showModal.value = true;
};

const closeModal = () => {
    zoomedImage.value = null; // Reset image when closing
    showModal.value = false;
};
</script>

<template>
  <LayoutWithSidebar>
    <!-- Video Background -->
    <div class="video-container">
      <video autoplay loop muted playsinline class="video-background">
        <source src="/public/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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


</style>
