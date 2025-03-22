 // Función para mostrar/ocultar el menú desplegable
 function toggleDropdown() {
    const filtrar=document.getElementById("filtrar");
    const menu = document.getElementById("dropdown-menu");
    if (menu.style.display === "block") {
        filtrar.innerHTML="Filtrar";
        filtrar.style.border="none";
        menu.style.display = "none";
        filtrar.style.backgroundColor="transparent";
    } else {
        menu.style.display = "block";
        filtrar.innerHTML="cerrar";
        filtrar.style.border="1px solid gray";
        filtrar.style.backgroundColor="rgb(49, 47, 47)";
    }
    
}

/* const seleccionadas=["agricultura", "farmaceutica", "diagnostico"];  */
/* const seleccionadas=["Empresa", "Instituto", "Grupo de investigación", "Universidad", "Aceleradora", "Incubadora", "Organismos estatales"]; 
 */
const seleccionadas=["Empresa", "Instituto", "Grupo de investigación", "Aceleradora", "Incubadora", "Organismos estatales", "Universidad"]; 

const resultados = document.querySelector("#resultados");
const buscador = document.getElementById("buscador");

buscador.addEventListener("input", () => {
    if (buscador.value.trim() !== "") {
        buscador.classList.add("buscador-lleno");
    }else{
        buscador.classList.remove("buscador-lleno");
        buscador.classList.add("buscador-vacio");
    }
  });


window.onload= recarga(seleccionadas);



// Función para mostrar las opciones seleccionadas
function mostrarSeleccion() {
    
    const checkboxes = document.querySelectorAll("#dropdown-menu input[type='checkbox']:checked");
    const seleccion = Array.from(checkboxes).map(checkbox => checkbox.value); 
    if(seleccion.length > 0){
        recarga(seleccion);
    }else{
        recarga(seleccionadas);
    }
    
    
   toggleDropdown();
   /* document.getElementById("resultado").innerText = "Seleccionaste: " + seleccion.join(", "); */
    /* return seleccionadas; */
}

//--------------------------------------------------------------------------





function recarga(sel){
  
    var filtro=[];
    d3.json("nano2.json").then(function(data){
    
        data.forEach(function(item) {
          
            if(item.Type== sel[0] | item.Type==sel[1]| item.Type==sel[2] | item.Type==sel[3] | item.Type==sel[4]| item.Type==sel[5] | item.Type==sel[6]){
                filtro.push(item);
                
            }
        }) 

      

        // Función para eliminar tildes (normalizar texto)
        function quitarTildes(texto) {
            return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Normaliza y elimina diacríticos
        }


        // captura del contenedor #tooltip para mostrar DATOS DEL ELEMENTO SELECCIONADO
        const tooltip=document.querySelector("#tooltip");


        // Evento para realizar el filtrado
        buscador.addEventListener("input", () => {
            const textoBusqueda = quitarTildes(buscador.value.toLowerCase()); // Convertir a minúsculas y eliminar tildes

            // Filtrar los elementos del arreglo "filtro"
            const elementosFiltrados = filtro.filter(item => 
                quitarTildes(item.Label.toLowerCase()).includes(textoBusqueda) // Aplica quitarTildes a los elementos
            );

            // Limpiar el contenedor y mostrar los resultados filtrados
            resultados.innerHTML = "";
            

            elementosFiltrados.forEach(item => {
                const h3 = document.createElement("h3"); //crea un h3 para cada resultado
                h3.textContent = item.Label; 
                resultados.appendChild(h3);

                  // Agrega un evento click al h3
                h3.addEventListener("click", () => {
                    tooltip.innerHTML= `
                                 <h3>${item.Label}</h3><br>
                                 <h4>Empresa</h4>
                                 <h4>${item.Description}</h4>
                                <p class="web-link">
                                    <a class="a" href="${item.web}" target="_blank">website</a>
                                </p> 
                                    `;
                    tooltip.style.backgroundColor= "rgb(80, 80, 80"; 
                                   
                    
                });
            });
        });











        const cantidadResultados=document.querySelector("#cantidad-resultados");

       
        
        let htmlCantidad=`${filtro.length} resultados`;
        
        cantidadResultados.innerHTML= htmlCantidad;
        
       
       
        resultados.innerHTML = ""; /* Limpio el contenedor y agrego los resultados nuevos */
        
        filtro.forEach(item => {
            const h3 = document.createElement("h3");
            h3.textContent = item.Label; 
            
            resultados.appendChild(h3);

              // Agrega un evento click al h3
            h3.addEventListener("click", () => {
                tooltip.innerHTML= `
                             <h3>${item.Label}</h3><br>
                             <h4>Empresa</h4>
                             <h4>${item.Description}</h4>
                            <p class="web-link">
                                <a class="a" href="${item.web}" target="_blank">website</a>
                            </p> 
                                `;
                                                
                tooltip.style.backgroundColor= "rgb(80, 80, 80"; 
                
            });
        });


        

            
        var svg = d3.select("svg")
            .attr("width", 280)
            .attr("height", 600);
/* 
          svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "100%")
            .attr("height", "100%")
             .attr("fill", "#b3d9ff");  */ // Celeste para el fondo



        // cambiando colores del fondo del mapa (en este caso el océano)
            var defs = svg.append("defs");
            var linearGradient = defs.append("linearGradient")
                .attr("id", "ocean-gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");
            
            linearGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "rgb(141, 194, 214)") // Celeste
                .attr("stop-opacity", 1);
            
            linearGradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "rgb(65, 87, 149)") // azul
                .attr("stop-opacity", 1);
            
            svg.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", "url(#ocean-gradient)"); // Aplica el gradiente al fondo






        var projection = d3.geoMercator()
            .scale(700)
            
            .center([-35.5, -37]); // Ajusta el centro a [0, 0] para asegurarse de que los datos se mapeen correctamente

        var path = d3.geoPath().projection(projection);

        var g = svg.append("g");




//-------------------------------------------------------------------------------





        // Cargar y dibujar el mapa de fondo
        d3.json("world-geojson2.json").then(function(world) {
            
           
        // Filtrar solo Argentina
    /*  var argentina = data.features.filter(function(feature) {
            return feature.properties.ADMIN === "Argentina";
        }); */


          

            g.selectAll("path")
                .data(world.features)
                /* .data(argentina) */
                .enter().append("path")
                .attr("d", path)
                .attr("class", "land")
                .attr("fill",  function(d) {
                    // Cambia según la región o una propiedad específica
                    if (d.properties.NAME==="Argentina"){
                        return "rgb(57, 56, 56)"; // color Argentina
                    } else {
                        return "rgb(147, 146, 142)"; // color resto de países
                    }
                } )
                /* .attr("stroke", "#ffffaa") */
                /* .on("mouseover", function(event, d) {
                    if (d.properties.NAME === "Argentina"){
                        d3.select(this).attr("fill", "rgb(57, 90, 58)"); // Cambiar a un color al pasar el mouse
                    }
                    
                })
                .on("mouseout", function(event, d) {
                    if (d.properties.NAME === "Argentina"){
                        d3.select(this).attr("fill", "rgb(30, 61, 32)"); // Volver al color original
                    }
                    
                }) */
                .attr("stroke", "rgb(116, 126, 116)");
        
            g.selectAll("circle")
                .data(filtro)
                .enter().append("circle")
                /* .attr("cx", function(d) { return projection([d.longitud, d.latitud])[0]; })
                .attr("cy", function(d) { return projection([d.longitud, d.latitud])[1]; }) */
                .attr("cx", function(d) {
                    // Extrae y separa las coordenadas del campo "location"
                    const coords = d.location.split(","); // Divide por la coma
                    const longitud = parseFloat(coords[1]); // Toma el segundo valor como longitud
                    const latitud = parseFloat(coords[0]);  // Toma el primer valor como latitud
                    return projection([longitud, latitud])[0]; // Proyección para X
                  })
                  .attr("cy", function(d) {
                    const coords = d.location.split(","); // Divide por la coma
                    const longitud = parseFloat(coords[1]);
                    const latitud = parseFloat(coords[0]);
                    return projection([longitud, latitud])[1]; // Proyección para Y
                  })
                /* .attr("r", 2) */
                .attr("class", function(filtro){
                    
                    if(filtro.Type=="Empresa"){
                        return "empresa";
                    }
                    if(filtro.Type=="Instituto"){
                        return "instituto";
                    }
                    if(filtro.Type=="Universidad"){
                        
                        return "universidad";
                    }
                    if(filtro.Type=="Grupo de investigación"){
                        return "grupo-investigacion";
                    }
                    if(filtro.Type=="Aceleradora"){
                        return "aceleradora";
                    }
                    if(filtro.Type=="Incubadora"){
                        
                        return "incubadora";
                    }
                    if(filtro.Type=="Organismos estatales"){
                        return "organismos-estatales";
                    }
                })
                .on("click", function(event, d) {
                    
                    // Mostrar el tooltip al pasar el mouse
                    d3.select("#tooltip")
                        .style("visibility", function(clearDescription){
                            if(clearDescription){
                                return "none";
                            }else{
                                return "visible";
                            }
                            })
                        .style("background-color", "rgb(80, 80, 80")
                        
                       /*  .style("top", (event.pageY + 10) + "px")
                        .style("left", (event.pageX + 10) + "px") */
                        .html(function(){
                            if(d.Type=="Empresa"){
                                return `
                                 <h3>${d.Label}</h3><br>
                                 <h4>Empresa</h4>
                                 <h4>${d.Description}</h4>
                                <p class="web-link">
                                    <a class="a" href="${d.web}" target="_blank">website</a>
                                </p> 
                                    `
                                 }

                            if(d.Type=="Instituto"){
                            return `
                                <h3>${d.Label}</h3><br>
                                <h4>Instituto</h4>
                                <h4>${d.Description}</h4>
                                <p class="web-link">
                                    <a class="a" href="${d.web}" target="_blank">website</a>
                                </p> 
                                `
                                }

                            if(d.Type=="Universidad"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Empresa</h4>
                                    <h4>${d.Description}</h4>
                                    <p class="web-link">
                                       <a class="a" href="${d.web}" target="_blank">website</a>
                                    </p>   
                                    `
                                    }
                                    
                            if(d.Type=="Grupo de investigación"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Grupo de investigación</h4>
                                    <h4>${d.Description}</h4>
                                    <p class="web-link">
                                       <a class="a" href="${d.web}" target="_blank">website</a>
                                    </p> 
                                    `
                                    }
                                
                            if(d.Type=="Aceleradora"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Aceleradora</h4>
                                    <h4>${d.Description}</h4>
                                    <p class="web-link">
                                       <a class="a" href="${d.web}" target="_blank">website</a>
                                    </p> 
                                    `
                                    }
                                    
                            if(d.Type=="Incubadora"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Incubadora</h4>
                                    <h4>${d.Description}</h4>
                                    <p class="web-link">
                                       <a class="a" href="${d.web}" target="_blank">website</a>
                                    </p> 
                                    `
                                    }
                                
                            if(d.Type=="Organismos estatales"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Organismo estatal</h4>
                                    <h4>${d.Description}</h4>
                                    <p class="web-link">
                                       <a class="a" href="${d.web}" target="_blank">website</a>
                                    </p> 
                                    `
                                    }
                                        
                                         
                        })
                    
                })
               /*  .on("mouseout", function (event, d) {
                    d3.select("#tooltip")
                    .style("visibility", "hidden")
                }) */
               ;
            
        }).catch(function(error) {
            console.error("Error cargando el archivo world-geojson.json:", error); // Mensaje de error en caso de que no se cargue el GeoJSON
        });








//-------------------------------------------------------------------------------



        // Definir la variable de zoom y desplazamiento
        var zoom = d3.zoom()
            .scaleExtent([1, 150])
            .on("zoom", function(event) {
            /*  console.log("Evento de zoom:", event); // Mensaje de depuración completo */
                g.attr("transform", event.transform);
            });

        // Añadir capacidad de zoom y desplazamiento al SVG
        svg.call(zoom);

        d3.select("#zoom_in").on("click", function() {
       
            svg.transition().call(zoom.scaleBy, 1.3);
        });

        d3.select("#zoom_out").on("click", function() {
           
            svg.transition().call(zoom.scaleBy, 0.8);
        });

        d3.select("#reset").on("click", function() {
          
            svg.transition().call(zoom.transform, d3.zoomIdentity);
        });
    }).catch(function(error) {
        console.error("Error cargando el archivo empresas_biotecnologicas.json:", error);
    });
}


// Añadir el manejador de eventos `wheel` con la opción pasiva para evitar el error de rendimiento
document.addEventListener("wheel", function(e) {
// Tu código aquí, si es necesario
}, { passive: true });




