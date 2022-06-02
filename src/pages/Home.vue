<template>
  <div class="vh-100 bg-yellow __container" >
    <div class="__content" >
      <div class="content">
        <h1>Sobre o profissional</h1>
        <h2>Dados do profissional</h2>

        <input-custom v-if="$route.query.step == 1" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import InputCustom from '../views/input.vue'
  export default {
    components: {
      InputCustom
    },
    beforeRouteUpdate(to, from) {
      let step = to.query.step
      
    },
    async beforeMount() {
     this.$router.push({
       query: {
         step: 1
       }
     })
    },
    methods: {
      testA: (r) => {
        console.log(r)
      }
    }
  }
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --bs-primary: #483698 !important;
  --bs-primary-rgb: 72, 54, 152 !important;
  --bs-yellow: #fbde40;
  --bs-yellow-light: #ffe766;
}
.__container {
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-color: var(--bs-yellow-light);
  .__content {
    background-color: var(--bs-white);
    height: 90%;
    width: 100%;

    border-radius: 3.5rem 3.5rem 0 0;
    .content {
      width: 90%;
      margin: 0 auto;
      margin-top: 4rem;

      h1 {
        font-size: 2.5rem;
        font-family: 'Comfortaa', cursive;
        font-weight: bold;
        color: var(--bs-primary);
      }
      h2 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 1.85rem;

        margin-top: 2rem;
      }
    }

  }
}
</style>