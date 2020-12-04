<template>
  <main>
    <section class="full flex">
      <div class="column image">
        <img src="@/assets/img/login_img.jpg" alt="login_img" />
        <p>illustration by Brian Miller</p>
      </div>
      <div class="column flex text">
        <div class="content">
          <h1 class="text-center">
            Aqui <strong>comienza</strong> tu propia <strong>galería</strong>.
          </h1>
          <form @submit.prevent="register">
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              v-model="email"
            />
            <input type="password" placeholder="*******" v-model="password" />
            <input
              type="password"
              placeholder="*******"
              v-model="passwordConfirm"
            />

            <p class="text-center">O también puedes</p>
            <p class="text-center">
              <router-link to="/">Login</router-link>
            </p>
            <button type="submit">Entrar</button>
          </form>
        </div>
        <ul class="social">
          <li>
            <a href="#">
              <i class="lab la-facebook-square"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="lab la-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="lab la-patreon"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
<script>
import { ValidationProvider, extend } from "vee-validate";
extend("email", (value) => {
  if (value.length > 2) {
    return true;
  }
  return "{_field_} not work";
});
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
    };
  },
  components: { ValidationProvider },
  methods: {
    async register() {
      if (this.password != this.passwordConfirm) {
        return alert("password not work");
      }
      let URL = "http://localhost:3000/api/users/register";
      let data = {
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      };
      const response = await fetch(URL, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" headers
      })
        .then((res) => res.json())
        .then((res) => {
          if ( res.token) {
            this.$store.commit("setToken", res.token);
          }
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(`Error: ${error.message}`);
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.image
    width 60%
    flex-basis 60%
    img
        width 100%
        height 100%
        display block
        object-fit cover
      p
        position absolute
        bottom 30px
        left 30px
        color white
        font-weight 600
div.text
    align-self center
    flex-basis 40%
    justify-content center
    align-items center
    div.content
        width 320px

ul.social
    position absolute
    bottom 30px
    margin 0
    padding 0
    li
        display inline-block
        margin 0 10px
        a
            font-size 30px
            font-weight normal
span.error
  padding 0 20px
</style>
