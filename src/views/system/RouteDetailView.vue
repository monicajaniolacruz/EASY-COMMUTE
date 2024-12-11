<template>
    <LayoutWithSidebar>
        <div class="max-w-7xl mx-auto p-4">
            <h1 class="text-3xl font-semibold text-white mb-4 uppercase">Route {{ routeId }} - {{ vehicleType }}</h1>
            <!-- Map Section Below the Routes Grid -->
            <div
                id="map"
                class="mb-8 h-[300px] w-full"
            ></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <!-- Display Routes in Grid -->
                <div
                    v-for="(route, index) in routes"
                    :key="index"
                    class="bg-[#1a1a1a] rounded-lg shadow-md p-6 flex flex-col space-y-4 cursor-pointer"
                    
                >
                    <!-- Route Name -->
                    <h4 class="text-sm font-bold text-white mb-2 uppercase border-l-4 pl-4 pr-0 py-2.5" style="border-color: #18d26e;">
                        {{ route.description }}
                    </h4>

                    <!-- Start and End Locations -->
                    <!-- <p class="text-white mb-4 text-sm truncate">Coords: {{ route.lat }}, {{ route.lon }}</p> -->
                </div>
            </div>
        </div>
    </LayoutWithSidebar>
</template>

<script>
import LayoutWithSidebar from "@/components/LayoutWithSidebar.vue";
// import { supabase } from "../supabase";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import "leaflet-routing-machine"; // Leaflet Routing Machine

export default {
    components: {
        LayoutWithSidebar,
    },
    data() {
        return {
            route: {}, // Object to hold the route details
            routes: [], // Array of routes (used in the grid display)
            map: null, // Leaflet Map instance
            vehicleType: "", // Vehicle type from URL params
            routeControl: null, // Leaflet Routing control
            routeId: "",
        };
    },
    async created() {
        const routeId = this.$route.params.routeId; // Get routeId from URL parameters
        this.vehicleType = this.$route.params.vehicleType; // Get vehicleType from the URL parameters
        this.routeId = this.$route.params.routeId; // Get vehicleType from the URL parameters

        // Fetch the route details from Supabase
        const { data, error } = await supabase
        .from("routes")
        .select("lat, lon, description")
        .eq("vehicle_type", this.vehicleType)
        .eq("route_name", routeId);

        if (error) {
            console.error("Error fetching route details:", error);
        } else {
            this.routes = data; // Store the list of routes (can be more than one)
            if (this.routes.length > 0) {
                this.route = this.routes; // Store the first route (since we're expecting one route)
                this.initMap(); // Initialize the map after fetching the route data
            } else {
                console.error("No route data found for the given vehicle type and route name");
            }
        }
    },
    methods: {
        initMap() {
            if (this.route && this.route.length > 0) {
                this.map = L.map("map", {
                    zoomControl: true,
                }).setView([8.9493, 125.5413], 11); // Default Coordinates

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "&copy; OpenStreetMap contributors",
                }).addTo(this.map);

                // Show the route using the coordinates from the route's lat and lon columns
                this.showRoute(this.route);
                
            } else {
                console.error("Route data is missing or incomplete (lat and lon are required).");
            }
        },

        selectRoute(route) {
            if (route && route.lat && route.lon) {
                // Update the current route with the selected route
                this.route = route;

                // Clear existing route control
                if (this.routeControl) {
                    this.map.removeControl(this.routeControl);
                }

                // Show the new route on the map using the lat and lon columns
                this.showRoute(route.lat, route.lon);
            } else {
                console.error("Selected route is missing valid coordinates (lat and lon).");
            }
        },

        showRoute(routeData) {
            try {
                // Ensure routeData is an array of lat/lon objects
                const waypointsArray = routeData.map(route => L.latLng(route.lat, route.lon));

                // Draw the route as a polyline with all waypoints
                // L.polyline(waypointsArray, { color: "blue", weight: 4 }).addTo(this.map);

                // Add markers at each waypoint
                waypointsArray.forEach((waypoint) => {
                    L.marker(waypoint)
                        .addTo(this.map)
                        .bindPopup(`<b>Point: (${waypoint.lat}, ${waypoint.lng})</b>`); // Show coordinates when clicked
                });

                // Create the routing control with all waypoints for routing
                this.routeControl = L.Routing.control({
                    waypoints: waypointsArray,
                    router: new L.Routing.osrmv1({
                        serviceUrl: "https://router.project-osrm.org/route/v1",
                    }),
                    showInstructions: false,
                    routeWhileDragging: true,
                    createMarker: () => null, // Disable marker creation on route clicks
                }).addTo(this.map);

                // Adjust the map bounds to fit the entire route
                const bounds = L.latLngBounds(waypointsArray);
                this.map.fitBounds(bounds);
            } catch (error) {
                console.error("Error while displaying route:", error);
            }
        }
    },
};
</script>

<style>
#map {
    width: 100%;
    height: 300px;
}

/* Hide the routing instructions panel */
.leaflet-routing-alternatives-container {
    display: none !important;
}
</style>
