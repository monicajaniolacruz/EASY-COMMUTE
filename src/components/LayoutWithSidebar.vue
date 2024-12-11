<template>
    <div class="flex w-full items-stretch bg-black">
        <!-- Sidebar -->
        <div :class="{block: isSidebarOpen,hidden: !isSidebarOpen,}" class="fixed inset-0 z-30 flex w-64 flex-col bg-[#111111] p-4 text-white shadow-lg transition-all duration-300">
            <div class="mb-2 mt-2 text-center text-xl font-bold text-white"> Easy Commute </div>
            <hr class="mb-4 border-gray-600" />
            <div class="flex-grow space-y-6">
                <router-link class="block rounded-md px-4 py-2 text-white transition-all hover:bg-white hover:text-black"
                             to="/dashboard">
                    Home
                </router-link>
                <router-link class="block rounded-md px-4 py-2 text-white transition-all hover:bg-white hover:text-black"
                             to="/rides">
                    Ride
                </router-link>
                <router-link class="block rounded-md px-4 py-2 text-white transition-all hover:bg-white hover:text-black"
                             to="/fare">
                    Fare
                </router-link>
                <router-link class="block rounded-md px-4 py-2 text-white transition-all hover:bg-white hover:text-black"
                             to="/contact">
                    Contact Us
                </router-link>
                <router-link class="block rounded-md px-4 py-2 text-white transition-all hover:bg-white hover:text-black"
                             to="/profile">
                    Profile
                </router-link>
            </div>

            <button @click="signOut"
                    class="mt-auto flex w-full items-center justify-between rounded-md bg-red-500 px-4 py-2 text-left font-bold text-white transition-all hover:bg-white hover:text-black focus:outline-none">
                Logout
                <i class="mdi mdi-logout text-xl font-bold"></i>
            </button>
        </div>

        <!-- Main content -->
        <div :class="{ 'ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen }"
             class="flex flex-1 flex-col bg-black transition-all duration-300">
            <div class="z-50 flex items-center justify-between bg-[#111111] p-2 text-white">
                <button @click="toggleSidebar"
                        class="rounded-lg p-3 text-white hover:bg-white hover:text-black">
                    <i class="mdi mdi-menu text-base"></i>
                </button>
                <button @click="goToProfile"
                        class="rounded-full p-2 text-white">
                    <i class="mdi mdi-account-circle relative"></i>
                </button>
            </div>

            <!-- Slot for page content -->
            <div class="relative h-screen flex-1 overflow-hidden">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue';
    import {
        supabase
    } from "../supabase";
    import router from "../router/index";

    const isSidebarOpen = ref(false);

    const signOut = async () => {
        const {
            error
        } = await supabase.auth.signOut();
        router.push("/sign-in");
    };

    const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
    };

    const goToProfile = () => {
        router.push("/profile");
    }
</script>

