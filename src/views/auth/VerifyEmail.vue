<template>
  <div class="flex justify-center items-center h-screen bg-black">
    <div class="max-w-md w-full bg-white p-6 rounded-md shadow-md text-center">
      <h2 class="text-2xl font-bold text-center mb-4">Verify Your Email</h2>
      <p class="text-lg text-gray-700 mb-4">
        We've sent a verification email to <span class="font-semibold">{{ email }}</span>. Please check your inbox and click on the verification link to complete your registration.
      </p>
      <p class="text-sm text-gray-500 mb-4">
        If you don't see the email, please check your spam folder or <button @click="handleResendEmail" class="text-blue-500">click here</button> to resend the verification email.
      </p>
      <div class="text-center">
        <button
          @click="handleResendEmail"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { supabase } from "../supabase";
import { useRouter } from "vue-router";

const email = ref("");

// Get email from query params in the URL
const router = useRouter();
const queryParams = router.currentRoute.value.query;
email.value = queryParams.email || "your_email@example.com";

// Check if user is logged in and resend the email if they are authenticated
// const handleResendEmail = async () => {
//   const session = supabase.auth.session();

//   if (!session) {
//     alert("You must be signed in to resend the verification email.");
//     return;
//   }

//   try {
//     // Trigger email resend by updating the user (this sends a new verification email)
//     const { error } = await supabase.auth.updateUser({
//       email: email.value
//     });

//     if (error) throw error;

//     alert("A new verification email has been sent. Please check your inbox.");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     alert("An error occurred while resending the email. Please try again later.");
//   }
// };
</script>
