<template>
  <div class="vh-100 bg-yellow __container">
    <div class="__content">
      <div class="content">
        <div>
          <input-custom v-if="$route.query.step == 1" />
          <treatment v-if="$route.query.step == 2" />
        </div>
        <img :src="whichImage()" v-show="false" />
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Router from '../router'

import InputCustom from '../views/input.vue'
import Treatment from '../views/treatment.vue'

export default {
  components: {
    InputCustom,
    Treatment
  },
  beforeRouteUpdate(to, from) {
    let step = to.query.step

  },
  async beforeMount() {
    this.$router.push({
      query: {
        step: 2
      }
    })
  },
  methods: {
    whichImage: () => {
      let step = Router.currentRoute._value.query.step
      console.log(step)
      if (step == 1) {
        return 'src/assets/desktop-pagina-1.png'
      } else if (step == 2) {
        return 'src/assets/desktop-pagina-2.png'
      } else if (step == 3) {
        return 'src/assets/desktop-pagina-3.png'
      }
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

  @media (min-width: 920px) {
    display: flex;
    justify-content: center;
    align-items: center;

    .__content {
      width: 90% !important;
      border-radius: 3.5rem !important;

      .content {
        height: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          display: block !important;
        }
      }
    }
  }

  .__content {
    background-color: var(--bs-white);
    height: 90%;
    width: 100%;
    max-width: 67.5rem;

    border-radius: 3.5rem 3.5rem 0 0;

    .content {
      width: 85%;
      margin: 0 auto;
      margin-top: 4rem;

      img {
        width: auto;
        height: 17rem;
        background-repeat: no-repeat;
        background-size: contain;
      }

      h1 {
        font-size: 2.5rem;
        font-family: "Comfortaa", cursive;
        font-weight: bold;
        color: var(--bs-primary);
      }

      h2 {
        font-family: "Open Sans", sans-serif;
        font-weight: 600;
        font-size: 1.85rem;

        margin-top: 2rem;
      }
    }
  }
}
</style>
