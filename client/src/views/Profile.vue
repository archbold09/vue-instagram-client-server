<template>
  <main>
    <h1>My profile</h1>
    <p>{{ email }}</p>
  </main>
</template>

<script>
import API from "@/api/api.js";
export default {
  data() {
    return {
      email: null,
    };
  },
  created: function() {
    this.getUser()
  },
  methods: {
     getUser() {
      let URL = "http://localhost:3000/api/users/profile";
      const response = fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          this.email = res.email;
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        });
      return response;
    },
  },
};
</script>
