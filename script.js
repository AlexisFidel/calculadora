// Constantes y variables globales
const COEFICIENTE_SEGURIDAD = 1.15; // Factor de seguridad del 15%
const COEFICIENTE_CALORICO_AIRE = 0.33; // Coeficiente calórico del aire (W/m³·K)
const COEFICIENTE_LATENTE = 0.68; // W/m³·g/kg (para cálculo de carga latente)
const CALOR_PERSONA = 100; // Watts por persona
const HORAS_CALEFACCION_DIARIAS = 12; // Supuesto para cálculo de costos

// Datos por región y provincia según normativas IRAM y regulaciones locales
const REGULACIONES_PROVINCIALES = {
  'Argentina': {
    'Buenos Aires': {
      coeficienteSeguridad: 1.15,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.5,
      normativa: 'Ley 13.059 - Reglamentaciones Térmicas Provincia BA'
    },
    'Catamarca': {
      coeficienteSeguridad: 1.2,
      tempInteriorRecomendada: 18,
      renovacionesAire: 0.6,
      normativa: 'Decreto 1485/2012 - Aislamiento Térmico Catamarca'
    },
    'Chaco': {
      coeficienteSeguridad: 1.18,
      tempInteriorRecomendada: 22,
      renovacionesAire: 0.7,
      normativa: 'Ley 2.672-E - Normas Térmicas Chaco'
    },
    'Chubut': {
      coeficienteSeguridad: 1.25,
      tempInteriorRecomendada: 19,
      renovacionesAire: 0.4,
      normativa: 'Decreto 833/2004 - Aislamiento Térmico Chubut'
    },
    'Córdoba': {
      coeficienteSeguridad: 1.15,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.5,
      normativa: 'Ley 10.098 - Regulación Térmica Córdoba'
    },
    'Corrientes': {
      coeficienteSeguridad: 1.1,
      tempInteriorRecomendada: 23,
      renovacionesAire: 0.8,
      normativa: 'Ley 6.459 - Normas Térmicas Corrientes'
    },
    'Entre Ríos': {
      coeficienteSeguridad: 1.12,
      tempInteriorRecomendada: 21,
      renovacionesAire: 0.6,
      normativa: 'Decreto 4.290/2010 - Aislamiento Térmico ER'
    },
    'Formosa': {
      coeficienteSeguridad: 1.1,
      tempInteriorRecomendada: 24,
      renovacionesAire: 0.9,
      normativa: 'Ley 1.632 - Regulación Térmica Formosa'
    },
    'Jujuy': {
      coeficienteSeguridad: 1.15,
      tempInteriorRecomendada: 18,
      renovacionesAire: 0.5,
      normativa: 'Decreto 7.042/2015 - Normas Térmicas Jujuy'
    },
    'La Pampa': {
      coeficienteSeguridad: 1.22,
      tempInteriorRecomendada: 19,
      renovacionesAire: 0.4,
      normativa: 'Ley 2.814 - Aislamiento Térmico La Pampa'
    },
    'La Rioja': {
      coeficienteSeguridad: 1.18,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.6,
      normativa: 'Decreto 3.456/2011 - Regulación Térmica La Rioja'
    },
    'Mendoza': {
      coeficienteSeguridad: 1.2,
      tempInteriorRecomendada: 19,
      renovacionesAire: 0.5,
      normativa: 'Ley 8.051 - Normas Térmicas Mendoza'
    },
    'Misiones': {
      coeficienteSeguridad: 1.05,
      tempInteriorRecomendada: 23,
      renovacionesAire: 1.0,
      normativa: 'Ley XVI-85 - Aislamiento Térmico Misiones'
    },
    'Neuquén': {
      coeficienteSeguridad: 1.25,
      tempInteriorRecomendada: 18,
      renovacionesAire: 0.3,
      normativa: 'Decreto 1.234/2008 - Regulación Térmica Neuquén'
    },
    'Río Negro': {
      coeficienteSeguridad: 1.23,
      tempInteriorRecomendada: 19,
      renovacionesAire: 0.4,
      normativa: 'Ley 4.987 - Normas Térmicas Río Negro'
    },
    'Salta': {
      coeficienteSeguridad: 1.15,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.6,
      normativa: 'Decreto 2.345/2013 - Aislamiento Térmico Salta'
    },
    'San Juan': {
      coeficienteSeguridad: 1.18,
      tempInteriorRecomendada: 21,
      renovacionesAire: 0.5,
      normativa: 'Ley 1.234 - Regulación Térmica San Juan'
    },
    'San Luis': {
      coeficienteSeguridad: 1.2,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.5,
      normativa: 'Ley VI-0723-2011 - Normas Térmicas San Luis'
    },
    'Santa Cruz': {
      coeficienteSeguridad: 1.3,
      tempInteriorRecomendada: 17,
      renovacionesAire: 0.3,
      normativa: 'Decreto 876/2007 - Aislamiento Térmico Santa Cruz'
    },
    'Santa Fe': {
      coeficienteSeguridad: 1.15,
      tempInteriorRecomendada: 20,
      renovacionesAire: 0.5,
      normativa: 'Ley 13.059 - Reglamentaciones Térmicas Santa Fe'
    },
    'Santiago del Estero': {
      coeficienteSeguridad: 1.12,
      tempInteriorRecomendada: 22,
      renovacionesAire: 0.7,
      normativa: 'Decreto 1.234/2010 - Regulación Térmica SdE'
    },
    'Tierra del Fuego': {
      coeficienteSeguridad: 1.35,
      tempInteriorRecomendada: 16,
      renovacionesAire: 0.2,
      normativa: 'Ley 1.012 - Normas Térmicas TDF'
    },
    'Tucumán': {
      coeficienteSeguridad: 1.1,
      tempInteriorRecomendada: 22,
      renovacionesAire: 0.8,
      normativa: 'Decreto 2.345/2014 - Aislamiento Térmico Tucumán'
    }
  }
};

// Factores de orientación adaptados a Argentina
const FACTOR_ORIENTACION = {
  'Norte': 1.1,
  'Sur': 0.9,
  'Este': 1.0,
  'Oeste': 1.3  // Más alto por la fuerte incidencia solar de tarde
};

// Factores de piso adaptados a construcciones argentinas
const FACTOR_PISO = {
  'Sobre suelo': 0.8,
  'Sobre espacio calefaccionado': 0.0,
  'Sobre sótano no calefaccionado': 0.7,  // Mayor pérdida por humedad
  'Sobre pilotes': 1.0  // Común en zonas inundables
};

// Coeficientes de transmitancia térmica (U) adaptados a materiales comunes en Argentina (W/m²·K)
const U_MUROS = {
  'Ladrillo hueco (12cm)': 1.8,
  'Ladrillo común (15cm)': 2.1,
  'Ladrillo + aislación (poliestireno)': 0.6,
  'Panel SIP': 0.4,
  'Hormigón (20cm)': 2.5,
  'Madera (entramado pesado)': 1.0,
  'Bloque de hormigón (20cm)': 2.0,
  'Adobe tradicional': 1.7,
  'Steel framing con aislación': 0.5
};

const U_VENTANAS = {
  'Vidrio simple': 5.7,
  'Doble vidrio (DVH)': 2.8,
  'Triple vidrio': 1.8,
  'Low-E DVH': 1.5,
  'Ventana PVC': 2.0,
  'Ventana aluminio sin RPT': 5.0,
  'Ventana aluminio con RPT': 3.5,
  'Persianas enrollables': 4.5
};

const U_TECHOS = {
  'Losa de hormigón (15cm)': 1.5,
  'Chapa sin aislación': 5.0,
  'Chapa con aislación': 0.8,
  'Teja cerámica': 1.2,
  'Teja + aislación': 0.6,
  'Techo verde': 0.3,
  'Membrana asfáltica': 1.8,
  'Cubierta liviana con aislación': 0.7
};

// Costos por defecto según tipo de energía en Argentina (USD)
const COSTOS_ENERGIA = {
  'electricidad': 0.12,
  'gas natural': 0.04,
  'gas envasado': 0.15,
  'gasoleo': 0.10,
  'pellets': 0.06,
  'leña': 0.03,
  'kerosene': 0.18
};

// Eficiencias estimadas por tipo de energía
const EFICIENCIAS = {
  'electricidad': 1.0,
  'gas natural': 0.92,
  'gas envasado': 0.9,
  'gasoleo': 0.85,
  'pellets': 0.82,
  'leña': 0.7,
  'kerosene': 0.8
};

// Datos climáticos mensuales por provincia (temperatura media y humedad relativa media)
const DATOS_CLIMATICOS = {
  'Buenos Aires': {
    'Enero': { temp: 24.5, hr: 65 },
    'Febrero': { temp: 23.2, hr: 68 },
    'Marzo': { temp: 20.8, hr: 71 },
    'Abril': { temp: 16.8, hr: 75 },
    'Mayo': { temp: 13.2, hr: 78 },
    'Junio': { temp: 10.2, hr: 79 },
    'Julio': { temp: 9.6, hr: 79 },
    'Agosto': { temp: 11.2, hr: 76 },
    'Septiembre': { temp: 13.6, hr: 73 },
    'Octubre': { temp: 16.8, hr: 71 },
    'Noviembre': { temp: 20.2, hr: 68 },
    'Diciembre': { temp: 23.0, hr: 65 }
  },
  'Córdoba': {
    'Enero': { temp: 24.8, hr: 62 },
    'Febrero': { temp: 23.5, hr: 65 },
    'Marzo': { temp: 21.2, hr: 68 },
    'Abril': { temp: 17.0, hr: 70 },
    'Mayo': { temp: 13.0, hr: 72 },
    'Junio': { temp: 9.8, hr: 73 },
    'Julio': { temp: 9.2, hr: 70 },
    'Agosto': { temp: 11.5, hr: 65 },
    'Septiembre': { temp: 14.5, hr: 62 },
    'Octubre': { temp: 18.5, hr: 60 },
    'Noviembre': { temp: 21.8, hr: 60 },
    'Diciembre': { temp: 24.0, hr: 60 }
  },
  'Mendoza': {
    'Enero': { temp: 25.2, hr: 48 },
    'Febrero': { temp: 23.8, hr: 52 },
    'Marzo': { temp: 20.5, hr: 58 },
    'Abril': { temp: 15.0, hr: 62 },
    'Mayo': { temp: 10.2, hr: 65 },
    'Junio': { temp: 6.8, hr: 68 },
    'Julio': { temp: 6.2, hr: 65 },
    'Agosto': { temp: 8.5, hr: 58 },
    'Septiembre': { temp: 12.8, hr: 52 },
    'Octubre': { temp: 17.5, hr: 48 },
    'Noviembre': { temp: 21.2, hr: 45 },
    'Diciembre': { temp: 24.5, hr: 45 }
  },
  'Tucumán': {
    'Enero': { temp: 26.5, hr: 75 },
    'Febrero': { temp: 25.2, hr: 78 },
    'Marzo': { temp: 23.0, hr: 80 },
    'Abril': { temp: 19.5, hr: 82 },
    'Mayo': { temp: 15.8, hr: 80 },
    'Junio': { temp: 12.5, hr: 78 },
    'Julio': { temp: 11.8, hr: 75 },
    'Agosto': { temp: 14.2, hr: 70 },
    'Septiembre': { temp: 17.5, hr: 65 },
    'Octubre': { temp: 21.8, hr: 65 },
    'Noviembre': { temp: 24.2, hr: 68 },
    'Diciembre': { temp: 25.8, hr: 72 }
  },
  'Santa Cruz': {
    'Enero': { temp: 13.5, hr: 50 },
    'Febrero': { temp: 12.8, hr: 52 },
    'Marzo': { temp: 10.2, hr: 55 },
    'Abril': { temp: 6.5, hr: 60 },
    'Mayo': { temp: 3.2, hr: 65 },
    'Junio': { temp: 1.5, hr: 70 },
    'Julio': { temp: 1.0, hr: 72 },
    'Agosto': { temp: 2.5, hr: 68 },
    'Septiembre': { temp: 5.2, hr: 62 },
    'Octubre': { temp: 8.5, hr: 58 },
    'Noviembre': { temp: 11.2, hr: 55 },
    'Diciembre': { temp: 12.8, hr: 52 }
  }
  // Se pueden agregar más provincias según sea necesario
};

// Sistemas recomendados por rango de potencia adaptados al mercado argentino
const SISTEMAS_RECOMENDADOS = [
  { min: 0, max: 2000, sistema: "Radiadores eléctricos o bomba de calor aire-aire" },
  { min: 2000, max: 5000, sistema: "Bomba de calor inverter o caldera mural de condensación" },
  { min: 5000, max: 10000, sistema: "Caldera de condensación con radiadores o suelo radiante" },
  { min: 10000, max: Infinity, sistema: "Sistema centralizado con zonificación y control avanzado" }
];

// Elementos del DOM
const form = document.getElementById('calcForm');
const modalBg = document.getElementById('modalBg');
const closeBtn = document.getElementById('closeBtn');
const btnCerrar = document.getElementById('btnCerrar');
const resetBtn = document.getElementById('resetBtn');
const btnGuardar = document.getElementById('btnGuardar');
const btnGenerarPDF = document.getElementById('btnGenerarPDF');
const recomendacionesDiv = document.getElementById('recomendaciones');
const recomendacionesContent = document.getElementById('recomendacionesContent');
const provinciaSelect = document.getElementById('provinciaSelect');

// Elementos de resultados
const resWatts = document.getElementById('resWatts');
const resKWatts = document.getElementById('resKWatts');
const resCargaSensible = document.getElementById('resCargaSensible');
const resCargaLatente = document.getElementById('resCargaLatente');
const perdidaMuros = document.getElementById('perdidaMuros');
const perdidaVentanas = document.getElementById('perdidaVentanas');
const perdidaTecho = document.getElementById('perdidaTecho');
const perdidaInfiltracion = document.getElementById('perdidaInfiltracion');
const perdidaPiso = document.getElementById('perdidaPiso');
const gananciaOcupantes = document.getElementById('gananciaOcupantes');
const gaugeValue = document.getElementById('gaugeValue');
const gaugeCenterValue = document.getElementById('gaugeCenterValue');
const resCostoDiario = document.getElementById('resCostoDiario');
const resCostoMensual = document.getElementById('resCostoMensual');
const resCostoAnual = document.getElementById('resCostoAnual');
const resConsumoDiario = document.getElementById('resConsumoDiario');
const resZonificacion = document.getElementById('resZonificacion');
const resSistemaRecomendado = document.getElementById('resSistemaRecomendado');
const resNormativa = document.getElementById('resNormativa');

// Variables de estado
let ultimoResultado = null;
let historialCalculos = [];

/**
 * Obtiene los parámetros de regulación para la provincia seleccionada
 * @param {string} provincia - Nombre de la provincia
 * @returns {Object} - Parámetros de regulación
 */
function obtenerParametrosProvinciales(provincia) {
  return REGULACIONES_PROVINCIALES['Argentina'][provincia] || {
    coeficienteSeguridad: COEFICIENTE_SEGURIDAD,
    tempInteriorRecomendada: 20,
    renovacionesAire: 0.5,
    normativa: 'IRAM 11605 - Aislamiento térmico de edificios'
  };
}

/**
 * Actualiza los valores del formulario según la provincia seleccionada
 */
function actualizarValoresPorProvincia() {
  const provincia = provinciaSelect.value;
  const params = obtenerParametrosProvinciales(provincia);
  const datosClima = DATOS_CLIMATICOS[provincia] || {};
  
  // Actualizar valores recomendados
  document.getElementById('tempInterior').value = params.tempInteriorRecomendada;
  document.getElementById('renovaciones').value = params.renovacionesAire;
  
  // Actualizar datos climáticos si existen para la provincia
  const mes = document.getElementById('mesSelect').value;
  if (datosClima[mes]) {
    document.getElementById('tempExterior').value = datosClima[mes].temp;
    document.getElementById('humedadExterior').value = datosClima[mes].hr;
  }
  
  // Mostrar normativa aplicable
  resNormativa.textContent = `Normativa: ${params.normativa}`;
}

/**
 * Calcula la carga térmica necesaria basada en los parámetros ingresados
 * @param {Object} parametros - Objeto con los parámetros de entrada
 * @returns {Object} - Objeto con los resultados del cálculo
 */
function calcularCargaTermica(parametros) {
  // Extracción de parámetros
  const {
    superficie, altura, areaVentanas,
    tipoMuro, tipoVentana, tipoTecho,
    tempInterior, tempExterior, renovaciones,
    orientacion, pisoInferior, ocupantes,
    humedadInterior, humedadExterior, provincia
  } = parametros;

  // Obtener coeficiente de seguridad según provincia
  const paramsProvincia = obtenerParametrosProvinciales(provincia);
  const coefSeguridad = paramsProvincia.coeficienteSeguridad || COEFICIENTE_SEGURIDAD;
  
  // Cálculo de volumen y áreas
  const volumen = superficie * altura;
  const areaMuros = (2 * (Math.sqrt(superficie) * altura) * 2) - areaVentanas;
  
  // Diferencia de temperatura
  const dT = tempInterior - tempExterior;
  
  // Cálculo de pérdidas sensibles
  const pMuros = areaMuros * U_MUROS[tipoMuro] * dT * FACTOR_ORIENTACION[orientacion];
  const pVentanas = areaVentanas * U_VENTANAS[tipoVentana] * dT;
  const pTecho = superficie * U_TECHOS[tipoTecho] * dT;
  const pInfiltracion = volumen * renovaciones * COEFICIENTE_CALORICO_AIRE * dT;
  const pPiso = superficie * FACTOR_PISO[pisoInferior] * dT;
  
  // Cálculo de carga latente (si se especificó humedad)
  let pLatente = 0;
  if (humedadInterior && humedadExterior) {
    const humAbsExterior = calcularHumedadAbsoluta(tempExterior, humedadExterior);
    const humAbsInterior = calcularHumedadAbsoluta(tempInterior, humedadInterior);
    const dH = humAbsInterior - humAbsExterior;
    pLatente = COEFICIENTE_LATENTE * renovaciones * volumen * dH;
  }
  
  // Ganancia por ocupantes
  const gananciaOcupantes = ocupantes * CALOR_PERSONA;
  
  // Cálculo total con factor de seguridad provincial
  const perdidaTotalSensible = pMuros + pVentanas + pTecho + pInfiltracion + pPiso;
  const cargaNeta = Math.max(0, perdidaTotalSensible - gananciaOcupantes);
  const cargaTotal = Math.round((cargaNeta + pLatente) * coefSeguridad);
  
  // Retornar resultados detallados
  return {
    cargaTotal,
    cargaSensible: Math.round(cargaNeta * coefSeguridad),
    cargaLatente: Math.round(pLatente * coefSeguridad),
    perdidas: {
      muros: Math.round(pMuros),
      ventanas: Math.round(pVentanas),
      techo: Math.round(pTecho),
      infiltracion: Math.round(pInfiltracion),
      piso: Math.round(pPiso),
      latente: Math.round(pLatente)
    },
    porcentajes: {
      muros: Math.round((pMuros / perdidaTotalSensible) * 100) || 0,
      ventanas: Math.round((pVentanas / perdidaTotalSensible) * 100) || 0,
      techo: Math.round((pTecho / perdidaTotalSensible) * 100) || 0,
      infiltracion: Math.round((pInfiltracion / perdidaTotalSensible) * 100) || 0,
      piso: Math.round((pPiso / perdidaTotalSensible) * 100) || 0,
      latente: pLatente ? Math.round((pLatente / (perdidaTotalSensible + pLatente)) * 100) : 0
    },
    gananciaOcupantes: Math.round(gananciaOcupantes),
    normativa: paramsProvincia.normativa
  };
}

/**
 * Calcula humedad absoluta aproximada (g/kg)
 * @param {number} temperatura - Temperatura en °C
 * @param {number} humedadRelativa - Humedad relativa en %
 * @returns {number} - Humedad absoluta en g/kg
 */
function calcularHumedadAbsoluta(temperatura, humedadRelativa) {
  // Fórmula simplificada para humedad absoluta (Magnus)
  const es = 6.112 * Math.exp((17.67 * temperatura) / (temperatura + 243.5));
  const e = es * (humedadRelativa / 100);
  return 0.622 * e / (101.325 - e) * 1000; // g/kg
}

/**
 * Sugiere estrategia de zonificación basada en el espacio
 * @param {Object} resultado - Resultados del cálculo
 * @param {Object} parametros - Parámetros de entrada
 * @returns {string} - Recomendación de zonificación
 */
function sugerirZonificacion(resultado, parametros) {
  const { superficie, altura } = parametros;
  const volumen = superficie * altura;
  const { cargaTotal } = resultado;
  
  if (cargaTotal < 3000 || superficie < 30) {
    return "1 unidad de " + Math.round(cargaTotal/1000*10)/10 + " kW";
  } else if (cargaTotal < 8000 && superficie < 80) {
    const unidades = Math.ceil(cargaTotal / 3000);
    const potenciaUnidad = Math.round((cargaTotal / unidades)/1000*10)/10;
    return `${unidades} unidades de ${potenciaUnidad} kW`;
  } else {
    const zonas = Math.ceil(superficie / 50);
    const potenciaZona = Math.round((cargaTotal / zonas)/1000*10)/10;
    return `${zonas} zonas con equipos de ~${potenciaZona} kW`;
  }
}

/**
 * Recomienda sistema de calefacción según carga térmica
 * @param {number} cargaTotal - Carga térmica total en W
 * @returns {string} - Sistema recomendado
 */
function recomendarSistema(cargaTotal) {
  const sistema = SISTEMAS_RECOMENDADOS.find(s => cargaTotal >= s.min && cargaTotal < s.max);
  return sistema ? sistema.sistema : "Sistema personalizado requerido";
}

/**
 * Calcula costos estimados de operación
 * @param {Object} resultado - Resultados del cálculo
 * @param {Object} parametros - Parámetros de entrada
 * @returns {Object} - Costos de operación
 */
function calcularCostosOperacion(resultado, parametros) {
  const { tipoEnergia, costoEnergia, horasUso } = parametros;
  const { cargaTotal } = resultado;
  
  // Convertir costo a número (por si viene con símbolos)
  const costo = parseFloat(costoEnergia) || COSTOS_ENERGIA[tipoEnergia] || 0.15;
  const eficiencia = EFICIENCIAS[tipoEnergia] || 0.9;
  
  // Consumo diario (kWh)
  const consumoDiario = (cargaTotal / 1000) * (horasUso || HORAS_CALEFACCION_DIARIAS) / eficiencia;
  
  // Costos
  const costoDiario = consumoDiario * costo;
  const costoMensual = costoDiario * 30;
  const costoAnual = costoMensual * 6; // Solo meses fríos
  
  return {
    costoDiario: Math.round(costoDiario * 100) / 100,
    costoMensual: Math.round(costoMensual * 100) / 100,
    costoAnual: Math.round(costoAnual * 100) / 100,
    consumoDiario: Math.round(consumoDiario * 100) / 100,
    tipoMoneda: tipoEnergia === 'electricidad' ? 'USD/kWh' : 'USD/m³'
  };
}

/**
 * Genera recomendaciones basadas en los resultados y parámetros
 * @param {Object} resultado - Objeto con los resultados del cálculo
 * @param {Object} parametros - Objeto con los parámetros de entrada
 * @returns {Array} - Array de recomendaciones
 */
function generarRecomendaciones(resultado, parametros) {
  const recomendaciones = [];
  const { porcentajes, cargaTotal, cargaLatente } = resultado;
  const { superficie, altura, tipoMuro, tipoVentana, tipoTecho, provincia } = parametros;
  
  // Recomendaciones basadas en las pérdidas más significativas
  if (porcentajes.ventanas > 30) {
    recomendaciones.push(`<strong>Ventanas (${porcentajes.ventanas}% de pérdidas):</strong> 
      - Reemplazar por ventanas ${tipoVentana.includes('DVH') ? 'triple vidrio' : 'DVH Low-E'}
      - Instalar persianas térmicas o cortinas pesadas
      - Aplicar películas reflectivas en temporada de frío`);
  }
  
  if (porcentajes.muros > 40) {
    recomendaciones.push(`<strong>Muros (${porcentajes.muros}% de pérdidas):</strong>
      - Aislamiento interior: láminas termorreflectantes o placas de yeso con aislante
      - Aislamiento exterior: SATE (Sistema de Aislamiento Térmico Exterior)
      - Inyección de aislamiento en cámaras de aire (si aplica)`);
  }
  
  if (porcentajes.techo > 25) {
    recomendaciones.push(`<strong>Techo (${porcentajes.techo}% de pérdidas):</strong>
      - Aislamiento adicional: ${tipoTecho.includes('aislado') ? 'mejorar espesor' : 'instalar aislante'}
      - Barreras radiantes bajo la cubierta
      - Techos verdes o jardines en azoteas (para techos planos)`);
  }
  
  if (porcentajes.infiltracion > 20) {
    recomendaciones.push(`<strong>Infiltraciones (${porcentajes.infiltracion}% de pérdidas):</strong>
      - Instalar burletes en puertas y ventanas
      - Sellado de juntas y grietas
      - Sistema de ventilación controlada con recuperación de calor`);
  }
  
  // Recomendaciones basadas en carga latente
  if (cargaLatente > cargaTotal * 0.2) {
    recomendaciones.push(`<strong>Carga latente (${Math.round(cargaLatente/1000*10)/10} kW):</strong> 
      - Sistema de recuperación de calor ventilación (HRV)
      - Control de humedad con deshumidificadores
      - Ventilación controlada con intercambiador de calor`);
  }
  
  // Recomendaciones específicas por provincia
  if (provincia === 'Tierra del Fuego' || provincia === 'Santa Cruz') {
    recomendaciones.push(`<strong>Recomendaciones para clima frío extremo:</strong>
      - Aislamiento reforzado en toda la envolvente
      - Doble ventanamiento en zonas más expuestas
      - Sistemas de calefacción redundantes
      - Prevención de puentes térmicos`);
  } else if (provincia === 'Misiones' || provincia === 'Corrientes') {
    recomendaciones.push(`<strong>Recomendaciones para clima cálido-húmedo:</strong>
      - Ventilación cruzada para enfriamiento pasivo
      - Protección solar en ventanas
      - Materiales con alta inercia térmica
      - Sistemas de deshumidificación`);
  }
  
  // Recomendaciones generales
  if (superficie > 50 && altura > 2.7) {
    recomendaciones.push(`<strong>Espacio grande (${superficie}m², ${altura}m altura):</strong>
      - Ventiladores de techo para redistribución de aire
      - Sistemas zonificados para mayor eficiencia
      - Calefacción por radiación para zonas de mayor altura`);
  }
  
  // Recomendaciones según carga total
  if (cargaTotal < 2000) {
    recomendaciones.push(`<strong>Carga térmica baja (${Math.round(cargaTotal/1000*10)/10} kW):</strong>
      - Sistemas compactos de alta eficiencia
      - Termostatos programables para optimización`);
  } else if (cargaTotal > 10000) {
    recomendaciones.push(`<strong>Carga térmica elevada (${Math.round(cargaTotal/1000*10)/10} kW):</strong>
      - Sistema centralizado con control avanzado
      - Zonificación inteligente
      - Estudio de alternativas energéticas (geotermia, biomasa)`);
  }
  
  return recomendaciones;
}

/**
 * Muestra los resultados en el modal
 * @param {Object} resultado - Objeto con los resultados del cálculo
 * @param {string} zonificacion - Recomendación de zonificación
 * @param {Object} costos - Costos de operación
 */
function mostrarResultados(resultado, zonificacion, costos) {
  // Guardar resultado para uso posterior
  ultimoResultado = resultado;
  
  // Mostrar valores principales
  resWatts.textContent = `Carga térmica: ${resultado.cargaTotal} W`;
  resKWatts.textContent = `Equivalente a: ${(resultado.cargaTotal / 1000).toFixed(2)} kW`;
  resCargaSensible.textContent = `${resultado.cargaSensible} W sensible`;
  resCargaLatente.textContent = `${resultado.cargaLatente} W latente`;
  
  // Mostrar desglose de pérdidas
  perdidaMuros.textContent = `${resultado.perdidas.muros} W (${resultado.porcentajes.muros}%)`;
  perdidaVentanas.textContent = `${resultado.perdidas.ventanas} W (${resultado.porcentajes.ventanas}%)`;
  perdidaTecho.textContent = `${resultado.perdidas.techo} W (${resultado.porcentajes.techo}%)`;
  perdidaInfiltracion.textContent = `${resultado.perdidas.infiltracion} W (${resultado.porcentajes.infiltracion}%)`;
  perdidaPiso.textContent = `${resultado.perdidas.piso} W (${resultado.porcentajes.piso}%)`;
  gananciaOcupantes.textContent = `${resultado.gananciaOcupantes} W`;
  
  // Mostrar costos
  resCostoDiario.textContent = `${costos.costoDiario} ${costos.tipoMoneda}`;
  resCostoMensual.textContent = `${costos.costoMensual} ${costos.tipoMoneda}`;
  resCostoAnual.textContent = `${costos.costoAnual} ${costos.tipoMoneda}`;
  resConsumoDiario.textContent = `${costos.consumoDiario} kWh`;
  
  // Mostrar recomendaciones técnicas
  resZonificacion.textContent = zonificacion;
  resSistemaRecomendado.textContent = recomendarSistema(resultado.cargaTotal);
  resNormativa.textContent = `Normativa: ${resultado.normativa}`;
  
  // Actualizar gauge (medidor)
  const potenciaMaxReferencia = 15000; // 15kW como referencia máxima
  const porcentajeGauge = Math.min((resultado.cargaTotal / potenciaMaxReferencia) * 180, 180); // Máximo 180 grados (media vuelta)
  gaugeValue.style.transform = `rotate(${porcentajeGauge}deg)`;
  
  // Cambiar color del gauge según la potencia
  if (resultado.cargaTotal < 3000) {
    gaugeValue.style.background = 'var(--color-success)';
  } else if (resultado.cargaTotal < 6000) {
    gaugeValue.style.background = 'var(--color-warning)';
  } else {
    gaugeValue.style.background = 'var(--color-danger)';
  }
  
  // Actualizar valor central del gauge con animación
  animateNumber(0, resultado.cargaTotal, 1500, value => {
    gaugeCenterValue.textContent = Math.round(value);
  });
  
  // Mostrar modal con animación
  modalBg.classList.add('active');
}

/**
 * Animación de números de inicio a fin
 * @param {Number} start - Número inicial
 * @param {Number} end - Número final
 * @param {Number} duration - Duración en milisegundos
 * @param {Function} callback - Función a ejecutar en cada paso
 */
function animateNumber(start, end, duration, callback) {
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime < duration) {
      const progress = elapsedTime / duration;
      const easeProgress = easeOutQuad(progress);
      const currentValue = start + (end - start) * easeProgress;
      
      callback(currentValue);
      requestAnimationFrame(updateNumber);
    } else {
      callback(end);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

/**
 * Función de ease out cuadrática para animaciones más naturales
 * @param {Number} t - Valor de progreso (0-1)
 * @returns {Number} - Valor con ease aplicado
 */
function easeOutQuad(t) {
  return t * (2 - t);
}

/**
 * Muestra las recomendaciones basadas en los resultados
 * @param {Array} recomendaciones - Array de recomendaciones
 */
function mostrarRecomendaciones(recomendaciones) {
  // Limpiar contenido anterior
  recomendacionesContent.innerHTML = '';
  
  // Si no hay recomendaciones, ocultar sección
  if (recomendaciones.length === 0) {
    recomendacionesDiv.classList.add('hidden');
    return;
  }
  
  // Crear lista de recomendaciones
  const lista = document.createElement('ul');
  lista.className = 'recomendaciones-lista';
  
  recomendaciones.forEach(recomendacion => {
    const item = document.createElement('li');
    item.innerHTML = recomendacion;
    lista.appendChild(item);
  });
  
  recomendacionesContent.appendChild(lista);
  
  // Mostrar sección con animación
  recomendacionesDiv.classList.remove('hidden');
  setTimeout(() => {
    recomendacionesDiv.classList.add('active');
  }, 100);
}

/**
 * Guarda el cálculo actual en el historial
 */
function guardarCalculo() {
  if (!ultimoResultado) return;
  
  // Obtener datos del formulario
  const data = recogerDatosFormulario();
  
  // Crear objeto con fecha y resultados
  const calculo = {
    fecha: new Date().toLocaleString(),
    parametros: data,
    resultado: ultimoResultado
  };
  
  // Agregar al historial
  historialCalculos.push(calculo);
  
  // Guardar en localStorage
  localStorage.setItem('historialCalculos', JSON.stringify(historialCalculos));
  
  // Notificar al usuario con un toast
  mostrarToast('Resultado guardado correctamente', 'success');
}

/**
 * Muestra un mensaje toast
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de mensaje (success, error, warning)
 */
function mostrarToast(mensaje, tipo = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo} animate__animated animate__fadeInUp`;
  toast.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'times-circle' : 'exclamation-circle'}"></i> ${mensaje}`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('animate__fadeOutDown');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

/**
 * Recolecta todos los datos del formulario
 * @returns {Object} - Datos del formulario
 */
function recogerDatosFormulario() {
  const provincia = provinciaSelect.value;
  const mes = document.getElementById('mesSelect').value;
  const datosClimaticos = DATOS_CLIMATICOS[provincia] ? DATOS_CLIMATICOS[provincia][mes] || {} : {};
  
  return {
    superficie: parseFloat(form.superficie.value),
    altura: parseFloat(form.altura.value),
    areaVentanas: parseFloat(form.areaVentanas.value),
    tipoMuro: form.tipoMuro.value,
    tipoVentana: form.tipoVentana.value,
    tipoTecho: form.tipoTecho.value,
    tempInterior: parseFloat(form.tempInterior.value),
    tempExterior: parseFloat(form.tempExterior.value) || datosClimaticos.temp,
    renovaciones: parseFloat(form.renovaciones.value),
    orientacion: form.orientacion.value,
    pisoInferior: form.pisoInferior.value,
    ocupantes: parseInt(form.ocupantes.value),
    humedadInterior: form.humedadInterior.value ? parseFloat(form.humedadInterior.value) : null,
    humedadExterior: form.humedadExterior.value ? parseFloat(form.humedadExterior.value) : datosClimaticos.hr,
    mes: mes,
    provincia: provincia,
    tipoEnergia: form.tipoEnergia.value,
    costoEnergia: form.costoEnergia.value,
    horasUso: parseFloat(form.horasUso?.value) || HORAS_CALEFACCION_DIARIAS
  };
}

/**
 * Valida los datos ingresados en el formulario
 * @param {Object} data - Datos a validar
 * @returns {Boolean} - True si los datos son válidos
 */
function validarDatos(data) {
  // Verificar que los valores numéricos sean positivos
  const camposNumericos = ['superficie', 'altura', 'areaVentanas', 'tempInterior', 'renovaciones', 'ocupantes'];
  for (const campo of camposNumericos) {
    if (isNaN(data[campo])) {
      mostrarToast(`El campo ${campo} debe ser un número válido.`, 'error');
      document.getElementById(campo).focus();
      return false;
    }
    if (data[campo] <= 0) {
      mostrarToast(`El campo ${campo} debe ser un número positivo.`, 'error');
      document.getElementById(campo).focus();
      return false;
    }
  }
  
  // Verificar que el área de ventanas no sea mayor que el área total de muros
  const areaTotal = 2 * (Math.sqrt(data.superficie) * data.altura) * 2;
  if (data.areaVentanas > areaTotal) {
    mostrarToast('El área de ventanas no puede ser mayor que el área total de muros.', 'error');
    document.getElementById('areaVentanas').focus();
    return false;
  }
  
  // Verificar temperaturas
  if (data.tempInterior <= data.tempExterior) {
    mostrarToast('La temperatura interior debe ser mayor que la exterior para el cálculo de calefacción.', 'error');
    document.getElementById('tempInterior').focus();
    return false;
  }
  
  return true;
}

/**
 * Genera un informe PDF con los resultados
 */
function generarPDF() {
  if (!ultimoResultado) {
    mostrarToast('Primero realice un cálculo para generar el informe.', 'warning');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const parametros = recogerDatosFormulario();
  const costos = calcularCostosOperacion(ultimoResultado, parametros);
  const recomendaciones = generarRecomendaciones(ultimoResultado, parametros);
  
  // Configuración inicial
  doc.setFont('helvetica');
  doc.setFontSize(16);
  doc.setTextColor(40);
  
  // Logo y título
  doc.addImage('https://via.placeholder.com/50x50', 'JPEG', 10, 10, 20, 20);
  doc.text('Informe de Cálculo de Carga Térmica', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 105, 26, { align: 'center' });
  doc.text(`Provincia: ${parametros.provincia}`, 105, 32, { align: 'center' });
  
  // Datos del proyecto
  doc.setFontSize(14);
  doc.text('1. Datos del Espacio', 15, 45);
  doc.setFontSize(10);
  doc.text(`- Superficie: ${parametros.superficie} m²`, 20, 53);
  doc.text(`- Volumen: ${(parametros.superficie * parametros.altura).toFixed(1)} m³`, 20, 61);
  doc.text(`- Temperaturas: Interior ${parametros.tempInterior}°C / Exterior ${parametros.tempExterior}°C`, 20, 69);
  doc.text(`- Materiales: Muros ${parametros.tipoMuro}, Ventanas ${parametros.tipoVentana}, Techo ${parametros.tipoTecho}`, 20, 77);
  doc.text(`- Normativa aplicable: ${ultimoResultado.normativa}`, 20, 85);
  
  // Resultados
  doc.setFontSize(14);
  doc.text('2. Resultados del Cálculo', 15, 98);
  doc.setFontSize(10);
  doc.text(`- Carga térmica total: ${ultimoResultado.cargaTotal} W (${(ultimoResultado.cargaTotal/1000).toFixed(2)} kW)`, 20, 106);
  doc.text(`- Carga sensible: ${ultimoResultado.cargaSensible} W`, 20, 114);
  doc.text(`- Carga latente: ${ultimoResultado.cargaLatente} W`, 20, 122);
  
  // Gráfico de pérdidas
  doc.setFontSize(14);
  doc.text('3. Distribución de Pérdidas', 15, 135);
  
  // Crear gráfico simple
  const perdidas = [
    { label: 'Muros', value: ultimoResultado.porcentajes.muros, color: '#3b82f6' },
    { label: 'Ventanas', value: ultimoResultado.porcentajes.ventanas, color: '#ef4444' },
    { label: 'Techo', value: ultimoResultado.porcentajes.techo, color: '#10b981' },
    { label: 'Infiltración', value: ultimoResultado.porcentajes.infiltracion, color: '#f59e0b' },
    { label: 'Piso', value: ultimoResultado.porcentajes.piso, color: '#8b5cf6' }
  ];
  
  // Dibujar gráfico de pastel simple
  let startAngle = 0;
  let centerX = 50;
  let centerY = 153;
  let radius = 30;
  
  perdidas.forEach(item => {
    if (item.value > 0) {
      const angle = (item.value / 100) * 360;
      doc.setFillColor(item.color);
      doc.ellipse(centerX, centerY, radius, radius, 0, startAngle, startAngle + angle, 'F');
      startAngle += angle;
    }
  });
  
  // Leyenda
  let yPos = 153;
  perdidas.forEach(item => {
    if (item.value > 0) {
      doc.setFillColor(item.color);
      doc.rect(90, yPos - 3, 5, 5, 'F');
      doc.text(`${item.label}: ${item.value}%`, 100, yPos);
      yPos += 7;
    }
  });
  
  // Costos
  doc.setFontSize(14);
  doc.text('4. Análisis de Costos', 15, 193);
  doc.setFontSize(10);
  doc.text(`- Costo diario: ${costos.costoDiario} ${costos.tipoMoneda}`, 20, 201);
  doc.text(`- Costo mensual: ${costos.costoMensual} ${costos.tipoMoneda}`, 20, 209);
  doc.text(`- Costo anual (6 meses): ${costos.costoAnual} ${costos.tipoMoneda}`, 20, 217);
  
  // Recomendaciones
  doc.setFontSize(14);
  doc.text('5. Recomendaciones Técnicas', 15, 230);
  doc.setFontSize(9);
  let recY = 238;
  recomendaciones.forEach(rec => {
    const text = rec.replace(/<strong>|<\/strong>/g, '');
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 20, recY);
    recY += lines.length * 5 + 2;
  });
  
  // Guardar el PDF
  doc.save(`Informe_Carga_Termica_${parametros.provincia.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0,10)}.pdf`);
  mostrarToast('Informe PDF generado correctamente', 'success');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Cargar historial guardado
  const historialGuardado = localStorage.getItem('historialCalculos');
  if (historialGuardado) {
    historialCalculos = JSON.parse(historialGuardado);
  }
  
  // Cargar provincias en el select
  const provincias = Object.keys(REGULACIONES_PROVINCIALES['Argentina']);
  provincias.forEach(provincia => {
    const option = document.createElement('option');
    option.value = provincia;
    option.textContent = provincia;
    provinciaSelect.appendChild(option);
  });
  
  // Actualizar valores al cambiar provincia
  provinciaSelect.addEventListener('change', actualizarValoresPorProvincia);
  
  // Establecer valores climáticos por defecto según el mes seleccionado
  document.getElementById('mesSelect').addEventListener('change', function() {
    const provincia = provinciaSelect.value;
    const mes = this.value;
    const datosClima = DATOS_CLIMATICOS[provincia] || {};
    
    if (datosClima[mes]) {
      if (!document.getElementById('tempExterior').value) {
        document.getElementById('tempExterior').value = datosClima[mes].temp;
      }
      if (!document.getElementById('humedadExterior').value) {
        document.getElementById('humedadExterior').value = datosClima[mes].hr;
      }
    }
  });
  
  // Establecer costo por defecto según tipo de energía
  document.getElementById('tipoEnergia').addEventListener('change', function() {
    const costo = COSTOS_ENERGIA[this.value] || 0.15;
    if (!document.getElementById('costoEnergia').value || document.getElementById('costoEnergia').value === '0.15') {
      document.getElementById('costoEnergia').value = costo;
    }
  });
  
  // Event listener para el formulario
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Recoger datos del formulario
    const data = recogerDatosFormulario();
    
    // Validar datos
    if (!validarDatos(data)) {
      return;
    }
    
    // Mostrar loader
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculando...';
    submitBtn.disabled = true;
    
    // Simular cálculo asíncrono para mejor experiencia de usuario
    setTimeout(() => {
      // Calcular y mostrar resultados
      const resultado = calcularCargaTermica(data);
      const zonificacion = sugerirZonificacion(resultado, data);
      const costos = calcularCostosOperacion(resultado, data);
      
      mostrarResultados(resultado, zonificacion, costos);
      
      // Generar y mostrar recomendaciones
      const recomendaciones = generarRecomendaciones(resultado, data);
      mostrarRecomendaciones(recomendaciones);
      
      // Restaurar botón
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
  
  // Cerrar modal con botón de cierre
  closeBtn.addEventListener('click', () => {
    modalBg.classList.remove('active');
  });
  
  // Cerrar modal con botón principal
  btnCerrar.addEventListener('click', () => {
    modalBg.classList.remove('active');
  });
  
  // Cerrar modal al hacer clic fuera
  modalBg.addEventListener('click', e => {
    if (e.target === modalBg) {
      modalBg.classList.remove('active');
    }
  });
  
  // Guardar resultado
  btnGuardar.addEventListener('click', guardarCalculo);
  
  // Resetear formulario
  resetBtn.addEventListener('click', () => {
    form.reset();
    recomendacionesDiv.classList.remove('active');
    setTimeout(() => {
      recomendacionesDiv.classList.add('hidden');
    }, 300);
    mostrarToast('Formulario reiniciado', 'success');
  });
  
  // Generar PDF
  btnGenerarPDF.addEventListener('click', generarPDF);
  
  // Inicializar valores por defecto
  const mesActual = new Date().toLocaleString('es-ES', { month: 'long' });
  document.getElementById('mesSelect').value = mesActual.charAt(0).toUpperCase() + mesActual.slice(1);
  provinciaSelect.value = 'Buenos Aires';
  actualizarValoresPorProvincia();
  document.getElementById('tipoEnergia').dispatchEvent(new Event('change'));
});