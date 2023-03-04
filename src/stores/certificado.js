import { defineStore } from "pinia";
import axios from "axios";

export const useCertificadoStore = defineStore('certificado', {
    state: () => {
      return {
        slugCertificados: 'certificados/',
        slugApiConfig:'config/',
        numerosCertificados:[]
      }
    },
    actions:{
        getRequestConfig(){
            //get config
            axios.get(this.slugApiConfig).then(response => {
              this.numerosCertificados = response.data[0]
            })
            .catch(errror => {
              console.log(errror)
            })
          },
        putRequestConfig(data){
            axios.put(this.slugApiConfig+'1/',data).then(response => {
                console.log("configuracion actualizada ✔");
                console.log(response.data)
                this.numerosCertificados = response.data
            })
            .catch(errror => {
                console.log(errror)
            })
        },
        postRequestCertificado(data){
          axios.post(this.slugCertificados,data).then(response => {
              this.listTickets = response.data 
              console.log("certificado creado ✔");
              console.log(response.data)
          })
          .catch(errror => {
              console.log(errror)
          })
      },
    }
})