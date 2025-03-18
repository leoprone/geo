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
const seleccionadas=["Empresa", "Instituto", "Grupo de investigacion", "Aceleradora", "Incubadora", "Organismos estatales", "Universidad"]; 

var clearDescription= true;

window.onload= recarga(seleccionadas, clearDescription);



// Función para mostrar las opciones seleccionadas
function mostrarSeleccion(menu) {
    clearDescription= true;
    const checkboxes = document.querySelectorAll("#dropdown-menu input[type='checkbox']:checked");
    const seleccion = Array.from(checkboxes).map(checkbox => checkbox.value); 
    if(seleccion.length > 0){
        recarga(seleccion, clearDescription);
    }else{
        recarga(seleccionadas, clearDescription);
    }
  
   toggleDropdown();
   /* document.getElementById("resultado").innerText = "Seleccionaste: " + seleccion.join(", "); */
    /* return seleccionadas; */
}

//--------------------------------------------------------------------------



//---------------------------------------------------------------------




/* 
var filtro=[];

const promptear=document.querySelector("#promptear");

promptear.addEventListener("click", (e)=>{
        var filtroRama1=prompt("buscar por rama1");
        var filtroRama2=prompt("buscar por rama2"); 
        filtro.push(filtroRama1);
        filtro.push(filtroRama2);
   
   
}); 
*/
/* var filtrados=[agricultura, farmaceutica]; */
function recarga(sel, clearDescription){

    var filtro=[];
    d3.json("nano.json").then(function(data){
    
        data.forEach(function(item) {
            /* seleccionadas.forEach(function(seleccion){
                if(seleccion==item.rama){
                    filtro.push(item);
                } 
            
            
            })*/
        
           /*  if(item.rama== sel[0] | item.rama==sel[1]| item.rama==sel[2]){
                filtro.push(item);
            } */
            if(item.Type== sel[0] | item.Type==sel[1]| item.Type==sel[2] | item.Type==sel[3] | item.Type==sel[4]| item.Type==sel[5] | item.Type==sel[6]){
                filtro.push(item);
                
            }
            
        })  
        
      
        /*  console.log("Datos de empresas cargados:", data); */ // Verificar que los datos se carguen correctamente

        /*   var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height");  */
            
        /*  var svg = d3.select("svg")
            .attr("width", 800)
            .attr("height", 600)
            .style("background-color", "#b3d9ff");  */
            
        var svg = d3.select("svg")
            .attr("width", 280)
            .attr("height", 600);

        /*  svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "100%")
            .attr("height", "100%"); */
            /* .attr("fill", "#b3d9ff"); */ // Celeste para el fondo



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
                .attr("stop-color", "rgb(78, 102, 168)") // azul
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
//-------------------------------------------------------------------------



//-------------------------------------------------------------------------------





        // Cargar y dibujar el mapa de fondo
        d3.json("world-geojson2.json").then(function(world) {
            
            //console.log("Datos del mapa cargados:", world); // Verificar que los datos del mapa se carguen correctamente

            // Verificar la estructura de los datos GeoJSON
        // console.log("Características del GeoJSON:", world.features);
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
                        return "rgb(11, 49, 20)"; // color Argentina
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
                    if(filtro.Type=="Grupo de investigacion"){
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
                                    `
                                 }

                            if(d.Type=="Instituto"){
                            return `
                                <h3>${d.Label}</h3><br>
                                <h4>Instituto</h4>
                                <h4>${d.Description}</h4>
                                `
                                }

                            if(d.Type=="Empresa"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Empresa</h4>
                                    <h4>${d.Description}</h4>
                                    `
                                    }
                                    
                            if(d.Type=="Grupo de investigacion"){
                            return `
                                <h3>${d.Label}</h3><br>
                                <h4>Grupo de investigación</h4>
                                <h4>${d.Description}</h4>
                                `
                                }
                                
                            if(d.Type=="Aceleradora"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Aceleradora</h4>
                                    <h4>${d.Description}</h4>
                                    `
                                    }
                                    
                            if(d.Type=="Incubadora"){
                            return `
                                <h3>${d.Label}</h3><br>
                                <h4>Incubadora</h4>
                                <h4>${d.Description}</h4>
                                `
                                }
                                
                            if(d.Type=="Organismos estatales"){
                                return `
                                    <h3>${d.Label}</h3><br>
                                    <h4>Organismo estatal</h4>
                                    <h4>${d.Description}</h4>
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
            .scaleExtent([1, 50])
            .on("zoom", function(event) {
            /*  console.log("Evento de zoom:", event); // Mensaje de depuración completo */
                g.attr("transform", event.transform);
            });

        // Añadir capacidad de zoom y desplazamiento al SVG
        svg.call(zoom);

        d3.select("#zoom_in").on("click", function() {
        /*  console.log("Zoom In"); */ // Mensaje de depuración
            svg.transition().call(zoom.scaleBy, 1.3);
        });

        d3.select("#zoom_out").on("click", function() {
            /* console.log("Zoom Out"); */ // Mensaje de depuración
            svg.transition().call(zoom.scaleBy, 0.8);
        });

        d3.select("#reset").on("click", function() {
            /* console.log("Reset");  */// Mensaje de depuración
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



/* 
d3.json("archivo.json").then(function(data) {
var filtro=[];
data.forEach(function(item) {
    if(item.rama=="agricultura"){
        filtro.push(item);
     }
});
}).catch(function(error) {
console.error("Error al cargar el JSON:", error);
}); */


