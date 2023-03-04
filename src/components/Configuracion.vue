<template>
  <div class="configuracion">
    <div class="col-6 centrar">
      <h2>NUMEROS CERTIFICADOS</h2>
    </div>
    <div class="col-6 centrar">
      <div class="input-group" style="display:flex; justify-content:center">
        <span
          style="background-color: #0d6efd; color: #fff; width: 100px"
          class="input-group-text"
          >CELESTE</span
        >
        <input
          type="text"
          aria-label="First name"
          class="formCorto formCeleste"
          maxlength="2"
          v-model="serieCeleste"
          style="text-transform: uppercase"
          v-on:keyup.tab="$refs.celeste.focus()"
        />
        <input
          type="text"
          aria-label="Last name"
          ref="celeste"
          class="formCeleste"
          v-model="numeroCeleste"
        />
      </div>
    </div>

    <div class="col-6 centrar">
      <div class="input-group" style="display:flex; justify-content:center">
        <span
          style="background-color: #d63384; color: #fff; width: 100px"
          class="input-group-text"
          >ROSA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
        >
        <input
          type="text"
          aria-label="First name"
          class="formCorto formRosa"
          maxlength="2"
          v-model="serieRosa"
          style="text-transform: uppercase"
        />
        <input
          type="text"
          aria-label="Last name"
          ref="next2"
          class="formRosa"
          v-model="numeroRosa"
        />
      </div>
    </div>

    <div class="col-6 centrar">
      <div class="input-group" style="display:flex; justify-content:center">
        <span
          style="background-color: #198754; color: #fff; width: 100px"
          class="input-group-text"
          >VERDE</span
        >
        <input
          type="text"
          aria-label="First name"
          class="formCorto formVerde"
          maxlength="2"
          v-model="serieVerde"
          style="text-transform: uppercase"
        />
        <input
          type="text"
          aria-label="Last name"
          ref="next3"
          class="formVerde"
          v-model="numeroVerde"
        />
      </div>
    </div>

    <button @click="guardarDatos()" class="centrar btn btn-dark" style="margin-top:20px">guardar</button>
  </div>
</template>

<script>
import { useCertificadoStore } from "@/stores/certificado";

export default {
  data() {
    return {
      numeroCeleste: this.certificadoStore.numerosCertificados.last_number_certificate_blue,
      numeroRosa: this.certificadoStore.numerosCertificados.last_number_certificate_pink,
      numeroVerde: this.certificadoStore.numerosCertificados.last_number_certificate_green,
      serieCeleste: this.certificadoStore.numerosCertificados.last_serie_certificate_blue,
      serieRosa: this.certificadoStore.numerosCertificados.last_serie_certificate_pink,
      serieVerde: this.certificadoStore.numerosCertificados.last_serie_certificate_green,
    };
  },
  setup() {
    const certificadoStore = useCertificadoStore();

    return {certificadoStore };
  },
  methods: {
    guardarDatos(){
        let data = {
            'last_number_certificate_blue' : this.numeroCeleste,
            'last_number_certificate_pink' : this.numeroRosa,
            'last_number_certificate_green' : this.numeroVerde,
            'last_serie_certificate_blue': this.serieCeleste,
            'last_serie_certificate_pink' : this.serieRosa,
            'last_serie_certificate_green' : this.serieVerde
        }

        this.certificadoStore.putRequestConfig(data)



    }
  },
};
</script>

<style scoped>
.formCorto {
  width: 50px !important;
}

.formCeleste {
  background-color: #c7deff;
  border: dashed 1px #0d6efd !important;
}

.formRosa {
  background-color: #ffc7e8;
  border: dashed 1px #d63384 !important;
}

.formVerde {
  background-color: #d2ffc7;
  border: dashed 1px #198754 !important;
}

.centrar{
    margin:0px auto
}
</style>