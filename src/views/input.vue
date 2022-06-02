<template>
  
  <h1>Sobre o profissional</h1>
  <h2>Dados do profissional</h2>
  <section>
    <input-component
      id="name-input"
      label="Nome completo*"
      placeholder="Digite o nome completo"
      maxlength="100"
      error="Nome errado"
      size="w-100"
      class="mt-5"
    />

    <input-component
      id="cpf-input"
      label="CPF*"
      placeholder="Digite um CPF"
      mask="###.###.###-##"
      maxlength="14"
      error="CPF Errado"
      size="w-75"
      class="mt-3"
    />

    <input-component
      id="number-input"
      label="Numero de celular*"
      placeholder="(00) 0 0000-0000"
      mask="(##) # ####-####"
      maxlength="16"
      error="Numero errado"
      size="w-75"
      class="mt-3"
    />

    <div class="d-flex justify-content-between align-items-center mt-4">
      <select-component
        id="state-input"
        label="Estado*"
        :data="states"
        @handleEvent="pushCity"
        error="Selecione o estado"
      />
      <select-component
        id="city-input"
        label="Cidade*"
        :data="citys"
        error="Selecione a cidade"
      />
    </div>
  </section>

  <div class="__progress mt-5">
    <div class="__progressing"></div>
    <p>1 de 2</p>
  </div>

  <btn @click="pushStep" />
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";

import Router from "../router";
import Store from '../store/'


import btn from "./components/button-step.vue";
import InputComponent from "./components/input.vue";
import SelectComponent from "./components/select.vue";

let selectedCity = ref("Selecione");

let states = ref([]);
let citys = ref([]);

export default {
  components: {
    btn,
    InputComponent,
    SelectComponent,
  },
  computed: mapGetters("Profissional", ["GetTemporaryValues"]),
  methods: {
    pushStep: () => {
      let Data = Store.state.Profissional.temporaryValues;
      let elements = document.querySelectorAll(".test-form");
      let labels = document.querySelectorAll(".form-label");
      let handleErrors = (elementId, rule) => {
        let Test = typeof rule === "object" 
        ? !rule.test(Data[elementId]) && Data[elementId] === ""
        : String(Data[elementId].length) < rule;
        if(Test) {
          elements.forEach((element) => {
            if(element.id === elementId) {
              element.classList.add("border-danger");
              labels.forEach((label) => {
                if(label.htmlFor === elementId) {
                  label.style.display = "block";
                }
              });
            }
          })
        }
      }
      let actions = {
        "name-input": /\d/,
        "cpf-input": 11,
        "number-input": 11,
      };
      elements.forEach((element) => {
        handleErrors(element.id, actions[element.id]);
      });
    },
    pushCity: (elementId, stateId) => {
      if (elementId === "state-input") {
        axios
          .get(`https://api-teste-front-end-fc.herokuapp.com/estados/${stateId}/cidades`)
          .then((data) => {
            console.log(data);
            citys.value = data.data;
          });
      }
    },
  },

  created() {
    axios.get("https://api-teste-front-end-fc.herokuapp.com/estados").then((data) => {
      states.value = data.data;
    });
  },
  data() {
    return {
      states,
      citys,

      selectedCity,
    };
  },
};
</script>

<style lang="scss">
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
