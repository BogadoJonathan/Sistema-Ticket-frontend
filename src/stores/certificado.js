import { defineStore } from "pinia";
import axios from "axios";

export const useCertificadoStore = defineStore('certificado', {
    state: () => {
      return {
        slugCertificados: 'certificados/',
        slugApiConfig:'config/',
        numerosCertificados:[],
        configuracionLista: false
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
          async putRequestConfig(data){
            let req = await axios.put(this.slugApiConfig+'1/',data)
            
            if (req.status == 200) {
              console.log("configuracion actualizada ✔");
              console.log(req.data)
              this.numerosCertificados = req.data
              this.configuracionLista = true
            }
            else{
              console.log("error al actualizar la configuracion")
            }
           
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