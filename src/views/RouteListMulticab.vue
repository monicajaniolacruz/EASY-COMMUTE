<template>
    <LayoutWithSidebar>
        <div class="mx-auto max-w-7xl p-4">
            <h1 class="mb-8 text-3xl font-bold uppercase text-white">Routes for Multicab</h1>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <!-- Displaying Routes -->
                <div :key="index"
                     class="group transform rounded-lg bg-[#1a1a1a] p-6 text-white shadow-md transition-transform hover:scale-105 hover:bg-[#00bfff] hover:text-black hover:shadow-xl"
                     v-for="(route, index) in routes">
                    <button @click="goToRouteDetails(route)"
                            class="flex w-full flex-col items-center rounded-lg px-6 py-4 text-center text-base font-bold transition-colors duration-300">
                        <div class="mb-2 flex h-12 w-12 flex-col items-center justify-center rounded-md bg-[#00bfff] text-white transition-all duration-300 group-hover:bg-black">
                            <i class="mdi mdi-jeepney text-black group-hover:text-white"></i>
                        </div>
                        <span>Route {{ route }}</span>
                    </button>
                </div>
            </div>
        </div>
    </LayoutWithSidebar>
</template>

<script>
    import LayoutWithSidebar from "../components/LayoutWithSidebar.vue";
    import {
        supabase
    } from "../supabase";

    export default {
        components: {
            LayoutWithSidebar,
        },
        data() {
            return {
                routes: ["1", "2", "4", "7", "8", "10", "12", "13", "14"],
            };
        },
        methods: {
            goToRouteDetails(routeId) {
                this.$router.push({
                    name: "route-detail",
                    params: {
                        routeId,
                        vehicleType: 'multicab'
                    }
                });
            },
        },
    };
</script>
