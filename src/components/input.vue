<template>
  <div>
    <label for="name-input" class="form-label mt-5">Nome completo*</label>
    <div class="input-group w-100">
      <input
        type="text"
        class="form-control"
        id="name-input"
        placeholder="Digite o nome completo"
        v-model="temporaryName"
      />
    </div>

    <label for="cpf-input" class="form-label mt-4">CPF*</label>
    <div class="input-group w-75">
      <input
        type="text"
        class="form-control"
        id="cpf-input"
        placeholder="Digite um CPF"
        v-model="temporaryIdentification"
        @input="(e) => styleIdentification(e)"
        maxlength="11"
      />
    </div>

    <label for="name-input" class="form-label mt-4">Numero de celular*</label>
    <div class="input-group w-75">
      <input
        type="text"
        class="form-control"
        id="name-input"
        placeholder="(00) 0 0000-0000"
        v-model="temporaryNumber"
        maxlength="11"
        @input="(e) => styleNumber(e)"
      />
    </div>

    <div class="d-flex justify-content-between align-items-center mt-4">
      <div class="select-group">
        <label for="state-input" class="form-label">Estado*</label>
        <select
          class="form-select"
          v-model="selectedState"
          id="city-input"
          @change="pushState"
        >
          <option selected>Selecione</option>
          <option :value="state.id" v-for="state in states" :key="state">
            {{ state.nome }}
          </option>
        </select>
      </div>

      <div class="select-group">
        <label for="city-input" class="form-label">Cidade*</label>
        <select class="form-select" id="state-input">
          <option selected>Selecione</option>
          <option :value="city.id" v-for="city in citys" :key="city">
            {{ city.nome }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="__progress mt-5">
    <div class="__progressing"></div>
    <p>1 de 2</p>
  </div>

  <btn @click="pushStep" />
</template>

<script>
import axios from "axios";

import btn from "./button.vue";
import { ref } from "vue";

let temporaryName = ref();
let temporaryIdentification = ref();
let temporaryNumber = ref();

let selectedState = ref("Selecione");

let states = ref([]);
let citys = ref([]);

axios.get("https://api-teste-front-end-fc.herokuapp.com/estados").then((data) => {
  states.value = data.data;
});

export default {
  components: {
    btn,
  },
  methods: {
    pushStep: () => {
      console.log(selectedState.value);
    },
    pushState: () => {
      axios
        .get(
          `https://api-teste-front-end-fc.herokuapp.com/estados/${selectedState.value}/cidades`
        )
        .then((data) => {
          citys.value = data.data;
        });
    },
    styleIdentification: (e) => {
      let identify = e.target.value
      let cpfRegex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/; 
      
      if(!cpfRegex.test(identify)){
        console.log(cpfRegex.test(identify))
        identify = identify.replace(/\D/g, '');
        if(identify.length == 11) {
          identify = identify.replace(/(\d{3})(\d)/, '$1.$2')
          identify = identify.replace(/(\d{3})(\d)/, '$1.$2')
          identify = identify.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
          e.target.value = identify
        }
      }
    },
    styleNumber: () => {
      
    }
  },
  data() {
    return {
      states,
      citys,
      selectedState,

      temporaryIdentification,
      temporaryName,
      temporaryNumber,
    };
  },
};
</script>

<style lang="scss">
.select-group,
.input-group {
  width: 45%;

  .form-select,
  .form-control {
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
    border-radius: 0.3rem 0 0 0.3rem;

    @if ($width==100%) {
      border-radius: 0.3rem;
    }
  }

  p {
    font-family: "Comfortaa", cursive;
    color: var(--bs-primary);
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>
