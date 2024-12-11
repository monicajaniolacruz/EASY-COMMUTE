<template>
  <LayoutWithSidebar>
    <!-- Background Video -->
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/public/video/background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> 
    <!-- Profile Container -->
    <div class="flex justify-center items-center h-screen z-10 relative overflow-hidden">
      <div class="relative w-full max-w-md bg-white bg-opacity-90 shadow-lg rounded-lg px-8 pt-6 pb-8">
        <!-- Profile Icon -->
        <div class="text-center">
          <i class="mdi mdi-account-circle text-[4rem] text-gray-600"></i>
        </div>

        <div v-if="user">
          <h1 class="text-2xl font-bold text-center text-gray-800">Profile</h1>
          <div class="space-y-4 text-lg text-gray-600">
            <div class="flex flex-col">
              <label for="fullname" class="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
              <input
                id="fullname"
                type="text"
                v-model="user.fullname"
                class="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your full name"
              />
            </div>
            <div class="flex flex-col">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email Address:</label>
              <input
                id="email"
                type="email"
                v-model="user.email"
                class="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email address"
              />
            </div>
            <div class="flex flex-col">
              <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
              <input
                id="phone"
                type="tel"
                v-model="user.phone_number"
                class="p-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            <div class="mt-6 text-center">
              <button
                @click="saveUserData"
                class="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-lg text-center text-gray-500">Loading user data...</div>
      </div>
    </div>
  </LayoutWithSidebar>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../../supabase';
import LayoutWithSidebar from '@/components/LayoutWithSidebar.vue';
import { toast } from "vue3-toastify";

const user = ref(null);

onMounted(async () => {
  try {
    // Get the current authenticated user
    const { data: { user: currentUser }, error } = await supabase.auth.getUser();

    if (error || !currentUser) {
      toast.error("User not authenticated", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    // Fetch additional user info from the users_info table
    const { data: userInfo, error: userInfoError } = await supabase
      .from('users_info')
      .select('fullname, email_address, phone_number')
      .eq('id', currentUser.id) // Assuming `user_id` is the foreign key in `users_info`
      .single();

    if (userInfoError) {
      toast.error("Error fetching user info", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    // Set the user data with the retrieved info
    user.value = {
      fullname: userInfo.fullname,
      email: userInfo.email_address,
      phone_number: userInfo.phone_number
    };

  } catch (err) {
    toast.error("Error during profile data fetch", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
});

const saveUserData = async () => {
  try {
    const { data: { user: currentUser }, error } = await supabase.auth.getUser();

    if (error || !currentUser) {
      toast.error("User not authenticated", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    // Update the user info in the users_info table
    const { data, error: updateError } = await supabase
      .from('users_info')
      .update({
        fullname: user.value.fullname,
        email_address: user.value.email,
        phone_number: user.value.phone_number,
      })
      .eq('id', currentUser.id);

    if (updateError) {
      toast.error("Error updating user data", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    toast.success("User information updated successfully", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  } catch (err) {
    toast.error("Error saving user data", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_LEFT,
    });
  }
};
</script>
