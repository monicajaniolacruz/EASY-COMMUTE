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

    <!-- Images Overlay -->
    <div class="image-container">
      <img
        src="/public/images/tricyclefare.jpg"
        alt="Tricycle Fare"
        class="overlay-image"
        @click="openModal('@/assets/images/tricyclefare.jpg')"
      />
      <img
        src="/public/images/multicabfare.jpg"
        alt="Multicab Fare"
        class="overlay-image"
        @click="openModal('@/assets/images/multicabfare.jpg')"
      />
    </div>

    <!-- Fullscreen Zoomed Image Modal -->
    <div
      v-if="showModal"
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <img :src="zoomedImage" class="zoomed-image" />
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

/* Image Container and Overlay Images */
.image-container {
  top: 20%; /* Adjust vertical position */
  left: 50%;
  transform: translate(-0%, -200%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  z-index: 1;

  max-height: calc(100vh - 20%); /* Ensure it doesn't exceed viewport height */
}

.overlay-image {
  width: 80%;
  max-width: 400px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex-shrink: 0; /* Prevent images from shrinking */
}

.overlay-image:hover {
  transform: scale(1.05); /* Slightly enlarge on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* Modal overlay styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.zoomed-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .overlay-image {
    width: 90%;
  }

  .image-container {
    flex-direction: column; /* Stack images vertically on smaller screens */
    gap: 70px;
    transform: translate(0%, -170%);
  }
}
</style>
