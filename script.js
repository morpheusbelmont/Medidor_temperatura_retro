/* ======================================

 WEATHER COMIC APP

 Lógica JavaScript + API clima


 Desarrollado por:

 Lic. Carlos Eduardo Sepúlveda Toro

 Diseñador Gráfico y Desarrollador
 en Multimedia

 Especialista en Edumática

====================================== */



/*

Función principal

Se ejecuta cuando damos clic
en el botón VER CLIMA

*/

async function buscarClima(){



    // Capturamos ciudad escrita

    let ciudad = 
    document
    .getElementById("city")
    .value;



    // Capturamos país escrito

    let pais =
    document
    .getElementById("country")
    .value;




    // Validación de campos vacíos

    if(
        ciudad === "" ||
        pais === ""
    ){


        alert(
        "💥 POW! Debes escribir ciudad y país"
        );


        return;

    }





    /*

    PRIMERA CONSULTA

    Open Meteo Geocoding

    Convierte:
    Cali Colombia

    en:

    Latitud
    Longitud

    */


    let geoURL =

    `
https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&count=1&language=es&format=json

    `;



    try{



        // Pedimos información geográfica

        let geoRespuesta =
        await fetch(geoURL);



        // Convertimos a JSON

        let geoDatos =
        await geoRespuesta.json();





        // Si no encuentra ciudad

        if(

        !geoDatos.results

        ){


            alert(

            "😱 BOOM! Ciudad no encontrada"

            );


            return;


        }




        // Guardamos ubicación

        let lugar =
        geoDatos.results[0];



        let latitud =
        lugar.latitude;



        let longitud =
        lugar.longitude;





        /*

        SEGUNDA CONSULTA

        API del clima

        */

        let climaURL =

        `
https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true

        `;





        let climaRespuesta =

        await fetch(climaURL);



        let climaDatos =

        await climaRespuesta.json();





        // Temperatura Celsius

        let tempC =

        climaDatos
        .current_weather
        .temperature;





        // Fórmula Celsius a Fahrenheit

        let tempF =

        (tempC * 9/5)+32;



        tempF =

        tempF.toFixed(1);





        // Mostrar resultados HTML


        document
        .getElementById("ubicacion")
        .innerHTML =

        `
        🌎 Ciudad:
        ${lugar.name}
        `;




        document
        .getElementById("celsius")
        .innerHTML =

        `
        🌡 Celsius:
        ${tempC} °C
        `;




        document
        .getElementById("fahrenheit")
        .innerHTML =

        `
        🔥 Fahrenheit:
        ${tempF} °F
        `;





        // Mensaje cómic según temperatura

        let mensaje="";



        if(tempC>=30){

            mensaje =
            "🔥 WOW! Hace mucho calor";

        }


        else if(tempC>=20){

            mensaje =
            "😎 Clima perfecto para una aventura";

        }


        else{

            mensaje =
            "❄ BRRR! Prepara la chaqueta";

        }





        document
        .getElementById("estado")
        .innerHTML = mensaje;






    }


    // Control de errores

    catch(error){


        alert(

        "💣 Error conectando con el clima"

        );


    }



}
