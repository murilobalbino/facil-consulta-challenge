<template>
  <div>

    <label for="name-input" class="form-label mt-5" >Nome completo*</label>
    <div class="input-group w-100">
      <input type="text" class="form-control" id="name-input" placeholder="Digite o nome completo" >
    </div>

    <label for="cpf-input" class="form-label mt-4" >CPF*</label>
    <div class="input-group w-75">
      <input type="text" class="form-control" id="cpf-input" placeholder="Digite um CPF">
    </div>

    <label for="name-input" class="form-label mt-4" >Numero de celular*</label>
    <div class="input-group w-75">
      <input type="text" class="form-control" id="name-input" placeholder="(00) 0 0000-0000">
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4" >
      <div class="select-group" >
        <label for="city-input" class="form-label" >Cidade*</label>
        <select class="form-select" id="state-input" >
          <option selected>Selecione</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <div class="select-group" >
        <label for="state-input" class="form-label" >Estado*</label>
        <select class="form-select" id="city-input" >
          <option selected>Selecione</option>
          <option :value="state" v-for="state in states.data" :key="state">
            {{state.nome}}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="__progress mt-5" >
    <div class="__progressing"></div>
    <p>1 de 2</p>
  </div>

  <btn />
</template>

<script>
import axios from 'axios'

import btn from './button.vue'
import {ref} from "vue";

let states = ref([])
axios.get("https://api-teste-front-end-fc.herokuapp.com/estados").then((data) => {
  states.value = data
})
export default {
  components: {
    btn
  },
  data() {
    return {
      states
    }
  }
}
</script>

<style lang="scss">
  .select-group, .input-group {
    width: 45%;
    .form-select, .form-control {
      border-color: var(--bs-primary);
      &:focus {
        box-shadow: none;
      }
    }
  }
  .__progress {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    .__progressing {
      $width: 50%;
      max-width: 75%;
      width: $width;
      height: 100%;
      background: var(--bs-primary);
      border-radius: .3rem 0 0 .3rem;
      @if($width == 100%) {
        border-radius: .3rem;
      }
    }
    p {
      font-family: 'Comfortaa', cursive;
      color: var(--bs-primary);
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
</style>