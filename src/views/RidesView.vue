<script setup>
import { supabase } from "../supabase";
import router from "../router/index";
import { ref } from "vue";
import LayoutWithSidebar from "../components/LayoutWithSidebar.vue";

const isSidebarOpen = ref(false);

async function signOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/sign-in");
}

const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
    <LayoutWithSidebar>
        <video
            autoplay
            loop
            muted
            playsinline
            class="absolute inset-0 w-full h-full object-cover"
        >
            <source
                src="../../src/assets/videos/home.mp4"
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video>

        <!-- Profile Container -->
    <div class="flex justify-center items-center h-screen z-10 relative overflow-hidden">
      <div class="relative w-full max-w-md bg-transparent shadow-lg rounded-lg px-8 pt-6 pb-8">
        <div class="flex flex-col items-center justify-between gap-8 lg:gap-40">
            <button @click="selectVehicle('multicab')" class="py-2 px-4 w-[150px] h-[50px] rounded-full font-bold bg-white text-black hover:bg-black hover:text-white focus:outline-none transition-all">MULTICAB</button>
            <button @click="selectVehicle('tricycle')" class="py-2 px-4 w-[150px] h-[50px] rounded-full font-bold bg-white text-black hover:bg-black hover:text-white focus:outline-none transition-all">TRICYCLE</button>
        </div>
      </div>
    </div>

    </LayoutWithSidebar>
</template>

<script scoped>
import router from "../router/index";

const selectVehicle = (vehicleType) => {
  const routeName = vehicleType === 'multicab' ? 'route-list-multicab' : 'route-list-tricycle';
  router.push({ name: routeName, params: { vehicleType } });
};

</script>
