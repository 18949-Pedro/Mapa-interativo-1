const viewport = document.getElementById("viewport");
const mapContainer = document.getElementById("mapContainer");

let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;
let scale = 1;

/* ---------- ZOOM & PAN ---------- */
function updateTransform() {
    mapContainer.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;}

viewport.addEventListener("mousedown", e => {
    isPanning = true;
    viewport.style.cursor = "grabbing";
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;});

viewport.addEventListener("mousemove", e => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();});

["mouseup", "mouseleave"].forEach(evt => {
    viewport.addEventListener(evt, () => {
        isPanning = false;
        viewport.style.cursor = "grab";
    });
});

viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const oldScale = scale;
    scale += e.deltaY < 0 ? 0.1 : -0.1;
    scale = Math.max(0.3, scale);

    const rect = viewport.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - translateX;
    const offsetY = e.clientY - rect.top - translateY;

    translateX -= (offsetX / oldScale) * (scale - oldScale);
    translateY -= (offsetY / oldScale) * (scale - oldScale);

    updateTransform();
});

/* ---------- MARCADORES ---------- */
const benchMarkers = [
    { x: 2016, y: 629, name: "Bench - Dirtmouth" },
    { x: 2053, y: 835, name: "Bench - Encruzilhada Esquecida" },
    { x: 2163, y: 915, name: "Bench - Encruzilhada Esquecida" },
    { x: 2350, y: 906, name: "Bench - Encruzilhada Esquecida" },
    { x: 2685, y: 1015, name: "Bench - Encruzilhada Esquecida" },
    { x: 1407, y: 390, name: "Bench - Penhascos Uivantes" },
    { x: 1441, y: 741, name: "Bench - Caminho Verde" },
    { x: 582, y: 768, name: "Bench - Caminho Verde" },
    { x: 479, y: 950, name: "Bench - Caminho Verde" },
    { x: 910, y: 771, name: "Bench - Caminho Verde" },
    { x: 1441, y: 741, name: "Bench - Caminho Verde" },
    { x: 1091, y: 860, name: "Bench - Caminho Verde" },
    { x: 1556, y: 1007, name: "Bench - Caminho Verde" },
    { x: 2113, y: 1186, name: "Bench - Ermos Fúngicos" },
    { x: 2113, y: 1752, name: "Bench - Ermos Fúngicos" },
    { x: 1991, y: 1729, name: "Bench - Ermos Fúngicos" },
    { x: 1497, y: 1456, name: "Bench - Estação da Rainha" },
    { x: 1600, y: 1230, name: "Bench - Cânion da Névoa" },
    { x: 1144, y: 1320, name: "Bench - Jardins da Rainha" },
    { x: 858, y: 1367, name: "Bench - Jardins Fúngicosda Rainha" },
    { x: 715, y: 1477, name: "Bench - Jardins da Rainha" },
    { x: 1337, y: 1724, name: "Bench - Ninho Profundo" },
    { x: 1419, y: 2078, name: "Bench - Ninho Profundo" },
    { x: 326, y: 1862, name: "Bench - Ninho Profundo" },
    { x: 2857, y: 524, name: "Bench - Pico de Cristal" },
    { x: 2891, y: 855, name: "Bench - Pico de Cristal" },
    { x: 2452, y: 1266, name: "Bench - Cidade das Lágrimas" },
    { x: 2685, y: 1402, name: "Bench - Cidade das Lágrimas" },
    { x: 2888, y: 1549, name: "Bench - Cidade das Lágrimas" },
    { x: 2483, y: 1583, name: "Bench - Cidade das Lágrimas" },
    { x: 3277, y: 1369, name: "Bench - Cidade das Lágrimas" },
    { x: 3479, y: 1674, name: "Bench - Cidade das Lágrimas" },
    { x: 3520, y: 860, name: "Bench - Terra do Descanso" },
    { x: 3680, y: 949, name: "Bench - Terra do Descanso" },
    { x: 3660, y: 1280, name: "Bench - Borda do Reino" },
    { x: 4027, y: 1582, name: "Bench - Borda do Reino" },
    { x: 4306, y: 1843, name: "Bench - Borda do Reino" },
    { x: 3611, y: 2118, name: "Bench - Colmeia" },
    { x: 2584, y: 1854, name: "Bench - Hidrovia Real" },
    { x: 2120, y: 1972, name: "Bench - Hidrovia Real" },
    { x: 2629, y: 2255, name: "Bench - Bacia Antiga" },
    { x: 3201, y: 2233, name: "Bench - Bacia Antiga" }
];

const transportMarkers = [
    {x: 2030, y: 629, name: "Transport - Dirtmouth"},
    {x: 1220, y: 310, name: "Transport - Penhascos Uivantes (Ninho dos Besouros)"},
    {x: 2329, y: 906, name: "Transport - Encruzilhada Esquecida"},
    {x: 891, y: 775, name: "Transport - Caminho Verde"},
    {x: 1460, y: 1460, name: "Transport - Ermos  (Estação da Rainha) "},
    {x: 2471, y: 1263, name: "Transport - Cidade das Lágrimas (Armazéns da Cidade)"},
    {x: 3491, y: 1725, name: "Transport - Cidade das Lágrimas (Estação do Rei)"},
    {x: 465, y: 1807, name: "Transport - Ninho Profundo (Aldeia Distante)"},
    {x: 830, y: 1367, name: "Transport - Jardins da Rainha"},
    {x: 3548, y: 863, name: "Transport - Terra do Descanso"},
    {x: 3221, y: 2236, name: "Transport - Campos do Palácio (Estação Escondida)"}
];

const shopMarkers = [
    {x: 1987, y: 629, name: "Loja - Sly (Dirtmouth)"},
    {x: 2030, y: 629, name: "Loja - Iselda (Dirtmouth)"},
    {x: 2685, y: 1015, name: "Loja - Salubra (Encruzilhada Esquecida)"},
    {x: 2112, y: 1186, name: "Loja - Ermos Fúngicos"},
    {x: 2740, y: 1681, name: "Loja - Cidade das Lágrimas"}
];

const SpringstMarkers = [
    {x: 2141, y: 918, name: "Springs - Dirtmouth"},
    {x: 3187, y: 1671, name: "Springs - Cidade das lagrimas"},
    {x: 1417, y: 2075, name: "Springs - Ninho Profundo"}
];

const maskMarkers = [
    {x: 1987, y: 629, name: "Mascara (4) - Dirtmouth"},
    {x: 2040, y: 629, name: "Mascara (1) - Dirtmouth"},
    {x: 1900, y: 710, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2030, y: 629, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 1945, y: 876, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2118, y: 940, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2835, y: 483, name: "Mascara (1) - Pico de Cristal"},
    {x: 1667, y: 1037, name: "Mascara (1) - Caminho Verde"},
    {x: 1640, y: 1410, name: "Mascara (1) - Estação da Rainha"},
    {x: 1700, y: 1831, name: "Mascara (1) - Ermos Fúngicos"},
    {x: 2160, y: 1817, name: "Mascara (1) - Hidrovia Real"},
    {x: 3813, y: 1970, name: "Mascara (1) - Colmeia"},
    {x: 3419, y: 813, name: "Mascara (1) - Terra do Descanso"}
];

const soulMarkers = [
    {x: 2030, y: 629, name: "Alma - Dirtmouth"},
    {x: 1987, y: 629, name: "Alma - Dirtmouth"},
    {x: 2088, y: 984, name: "Alma - Encruzilhada Esquecida"},
    {x: 1010, y: 1060, name: "Alma - Dirtmouth"},
    {x: 1847, y: 1973, name: "Alma - Ninho Prufundo"},
    {x: 2794, y: 2131, name: "Alma - Bacia Antiga"},
    {x: 2683, y: 1395, name: "Alma - Cidade das Lagrimas"},
    {x: 1407, y: 390, name: "Alma - Pinhascos uivantes"},
    {x: 3419, y: 813, name: "Alma - Terra do Descanso"}
];

const paloreMarkers = [
    {x: 1900, y: 710, name: "Minerio Pálido - Dirtmouth"},
    {x: 3120, y: 95, name: "Minerio Pálido - Pico de cristal"},
    {x: 1548, y: 2131, name: "Minerio Pálidosport - Ninho Profundo"},
    {x: 2352, y: 2125, name: "Minerio Pálido - Terra do Descanso"},
    {x: 3712, y: 1269, name: "Minerio Pálido - Colizeu dos Tolos"}
];

const BossMarkers = [
    {x: 2141, y: 843, name: "Chefe - Falso cavaleiro"},
    {x: 2141, y: 810, name: "Chefe - Falso cavaleiro(Sonho)"},
    {x: 2233, y: 706, name: "Chefe - Hollow Knight"},
    {x: 2587, y: 985, name: "Chefe - Mãe Mosca"},
    {x: 1925, y: 875, name: "Chefe - Mawlek"},
    {x: 810, y: 727, name: "Chefe - Hornet"},
    {x: 4310, y: 1698, name: "Chefe - Hornet"},
    {x: 735, y: 1153, name: "Chefe - Lorde Traidor"},
    {x: 1440, y: 2128, name: "Chefe - Nosk"},
    {x: 992, y: 1859, name: "Chefe - Gailen(Espirito)"},
    {x: 1860, y: 1855, name: "Chefe - Lordes Louva-a-deus"},
    {x: 2639, y: 1219, name: "Chefe - Mestren das Almas"},
    {x: 2639, y: 1219, name: "Chefe - Mestren das Almas(Sonho)"},
    {x: 3000, y: 1390, name: "Chefe - sentinelas"},
    {x: 2938, y: 1804, name: "Chefe - Defensor do Esterco"},
    {x: 2955, y: 1847, name: "Chefe - Defensor do Branco(Sonho)"},
    {x: 2433, y: 1940, name: "Chefe - Mãe Fluk"},
    {x: 2100, y: 2249, name: "Chefe - reseptaclo quebrado"},
    {x: 2100, y: 2249, name: "Chefe - Irmão Perdido(sonho)"},
    {x: 4070, y: 1953, name: "Chefe - Gardeão da colmeia"},
    {x: 4100, y: 1778, name: "Chefe - Markoth"},
    {x: 3618, y: 1548, name: "Chefe - Colecionador"},
    {x: 4972, y: 1335, name: "Chefe - Pale lurker"},
    {x: 3191, y: 929, name: "Chefe - Xero(Espirito)"},
    {x: 2861, y: 521, name: "Chefe - Guardião de criastal"},
    {x: 2872, y: 481, name: "Chefe - Guardião de criastal(2ª fase)"},
    {x: 2064, y: 631, name: "Chefe - Zote(Sonho)"},
    {x: 1883, y: 631, name: "Chefe - Grim"},
    {x: 1883, y: 631, name: "Chefe - Grim rei dos Pesadelos (sonho)"}
];

const Warriors_Grave_Marker = [
    {x: 720, y: 1366, name: "espirito - Marmu"},
    {x: 1670, y: 1036, name: "espirito - Sem olhos"},
    {x: 3507, y: 819, name: "espirito - revek"},
    {x: 1316, y: 336, name: "espirito - Gorb"},
    {x: 2251, y: 1352, name: "espirito - Velho HU"}
];

const BlodlifeMarkers = [
  { "x": 1589, "y": 582, name: "Sangue Vital" },
  { "x": 1087, "y": 684, name: "Sangue Vital" },
  { "x": 2054, "y": 840, name: "Sangue Vital" },
  { "x": 3949, "y": 1479, name: "Sangue Vital" },
  { "x": 1814, "y": 1801, name: "Sangue Vital" },
  { "x": 1053, "y": 1700, name: "Sangue Vital" },
  { "x": 1018, "y": 1806, name: "Sangue Vital" }
];

const charmMarkers = [
    //lojas
    {x: 2030, y: 629, name: "Bússola Caprichosa - Dirtmouth Loja Iselda"},
    {x: 1987, y: 629, name: "Enxame de Colecionadores - Dirtmouth Loja - Sly"},
    {x: 1987, y: 629, name: "Mestre da Corrida - Dirtmouth Loja - Sly"},
    {x: 1987, y: 629, name: "Carapaça Robusta - Dirtmouth Loja - Sly"},
    {x: 1987, y: 629, name: "Golpe Pesado - Dirtmouth Loja - Sly"},
    {x: 1987, y: 629, name: "Glória do Mestre do ferrão - Dirtmouth Loja - Sly"},
    {x: 1902, y: 629, name: "Força inquebravel - Troupe Grimm - Divina"},
    {x: 1902, y: 629, name: "Ganançia inquebravel - Troupe Grimm - Divina"},
    {x: 1902, y: 629, name: "Coração Inquebrável - Troupe Grimm - Divina"},
    {x: 1902, y: 629, name: "Criança grim - Troupe Grimm"},
    {x: 1902, y: 629, name: "Melodia Despreocupada - Troupe Grimm"},
    {x: 2685, y: 1015, name: "Coração de Sangue Vital - Salubra (Encruzilhada Esquecida)"},
    {x: 2685, y: 1015, name: "Ferrão longo - Salubra (Encruzilhada Esquecida)"},
    {x: 2685, y: 1015, name: "Corpo Firme - Salubra (Encruzilhada Esquecida)"},
    {x: 2685, y: 1015, name: "Foco rápido- Salubra (Encruzilhada Esquecida)"},
    {x: 2685, y: 1015, name: "Pedra do shaman - Salubra (Encruzilhada Esquecida)"},
    {x: 2112, y: 1186, name: "Força inquebravel - Ermos Fúngicos"},
    {x: 2112, y: 1186, name: "Ganancia inquebravel - Ermos Fúngicos"},
    {x: 2112, y: 1186, name: "Coração inquebravel - Ermos Fúngicos"},

    //passagem do rei
    {x: 2350, y: 906, name: "Fúria dos Caídos - Passagem do Rei"},

    //Penhascos Uivantes  
    {x: 1460, y: 510, name: "Bênção de Joni - Penhascos Uivantes"},
    {x: 1298, y: 664, name: "Carapaça de Baldur - Penhascos Uivantes"},

    //Caminho Verde
    {x: 313, y: 906, name: "Forma de Unn - Caminho Verde"},
    {x: 1288, y: 930, name: "Espinhos da Agonia - Caminho Verde"},

    //Ermos Fúngicos
    {x: 1542, y: 1549, name: "Cogumelo com Esporos - Ermos Fúngicos"},
    {x: 1988, y: 1842, name: "Mestre da corrida - Ermos Fúngicos"},
    {x: 1995, y: 1706, name: "Marca do orgulho - Vila Louvadeus"},

    //Ninho profundo
    {x: 973, y: 1950, name: "Canção das Tecelãs - Ninho profundo"},
    {x: 1698, y: 2174, name: "Sombra afiada - Ninho profundo"},

    //Encruzilhada Esquecida
    {x: 2041, y: 840, name: "Sombra afiada - Encruzilhada Esquecida"},
    {x: 2327, y: 818, name: "Sombra afiada - Encruzilhada Esquecida"},

    //Pico de cristal
    {x: 2479, y: 663, name: "Foco profundo - Pico de cristal"},

    //Terra do Descanso
    {x: 3408, y: 813, name: "Portador dos Sonhos - Terra do Descanso"},
    {x: 3324, y: 859, name: "Escudo dos Sonhos - Terra do Descanso"},
    {x: 3735, y: 983, name: "devorador de almas - Terra do Descanso"},

    //Cidade das lagrimas
    {x: 2822, y: 1214, name: "Dobrador de Magias - Cidade das lagrimas"},

    //Hidrovia Real
    {x: 2953, y: 1809, name: "Insígnia do Defensor - Hidrovia Real"},
    {x: 2421, y: 1934, name: "Ninho de Flukes - Hidrovia Real"},

    //Borda do reino
    {x: 4213, y: 1913, name: "corte rapido - Borda do reino"},

    //Colmeia
    {x: 4074, y: 1987, name: "Sangue da Colmeia - Colmeia"},

    //Abismo
    {x: 2551, y: 2643, name: "Coração de Sangue Vital - Abismo"},
    {x: 2641, y: 2765, name: "Coração Vazio - Abismo"},
    
    //Fragmento de alma do rei
    {x: 550, y: 1147, name: "Alma do Rei(Fragmento) - Jardins da rainha"},
    {x: 550, y: 1147, name: "Alma do Rei(Fragmento) - Bacia Antiga"},

];

const abilityMarkers = [
    {x: 810, y: 727, name: "Manto de Asa de Mariposa - Caminho verde"},
    {x: 1091, y: 860, name: "Garra do Louva-a-Deus  - Vila Louva-a-Deus"},
    {x: 2891, y: 855, name: "Coração de Cristal - Pico de cristal"},
    {x: 2629, y: 2255, name: "Asas do monarca - Bacia antiga"},
    {x: 1600, y: 1230, name: "Lagrimas de Isma - Hidrovia Real"},
    {x: 3641, y: 2747, name: "Manto Sombrio - Abismo"},
    {x: 3548, y: 863, name: "Ferrão dos Sonhos - Terra do Descanso"},
    {x: 3548, y: 863, name: "Ferrão dos Sonhos(Despertado) - Terra do Descanso (1800 Essence)"},
    {x: 3548, y: 863, name: "Portal dos sonhos - Terra do Descanso (900 Essence)"}
];

const nailArtMarkers = [
    {x: 1407, y: 390, name: "Dash Slash - Mestre do ferrão Oro"},
    {x: 478, y: 949, name: "Great Slash - Mestre do ferrão Sheo"},
    {x: 4294, y: 1844, name: "Cyclone Slash - Mestre do ferrão Mato"}
];

const keyMarkers = [
    {x: 1987, y: 633, name: "Chave Simples - Loja - Sly"},
    {x: 2471, y: 1325, name: "Chave Simples - Cidade das lagrimas"},
    {x: 2142, y: 2376, name: "Chave Simples - Bacia Antiga"},
    {x: 4149, y: 1379, name: "Chave Simples - Coliseu dos Tolos"},
    {x: 1995, y: 630, name: "Chave Elegante - Loja - Sly"},
    {x: 2811, y: 497, name: "Chave do comerciante - Pico de Cristal"},
    {x: 565, y: 1148, name: "Chave do Amor - Gardins da Rainha"},
    {x: 4259, y: 1738, name: "Marca do Rei - Kingdom's Edge (Hornet 2)"},
    {x: 884, y: 1738, name: "Passe do Bonde - Ninho Profundo"},
    {x: 2146, y: 843, name: "Brasão do reino - Chefe - Falso cavaleiro"}
];

const relicMarkers = [
    {x: 2028, y: 660, name: "Selo de hollownest - Encruzilhada Esquecida"},
    {x: 1885, y: 709, name: "Selo de hollownest - Encruzilhada Esquecida"},
    {x: 3400, y: 815, name: "Selo de hollownest - Terra do descanço"},
    {x: 3460, y: 985, name: "Selo de hollownest - Terra do descanço"},
    {x: 1117, y: 978, name: "Selo de hollownest - Caminho Verde"},
    {x: 485, y: 1284, name: "Selo de hollownest - Gardins da Rainha"},
    {x: 1797, y: 1042, name: "Selo de hollownest - Canion da névua"},
    {x: 2891, y: 855, name: "Selo de hollownest - Canion da névua"},
    {x: 1510, y: 1411, name: "Selo de hollownest - Estação da Rainha"},
    {x: 1578, y: 1741, name: "Selo de hollownest - Ninho Profundo"},
    {x: 309, y: 1873, name: "Selo de hollownest - Ninho Profundo"},
    {x: 1787, y: 1309, name: "Selo de hollownest - Ermos fundicos"},
    {x: 1994, y: 1729, name: "Selo de hollownest - Ermos fundicos"},
    {x: 2541, y: 1332, name: "Selo de hollownest - Pico de Cristal"},
    {x: 2963, y: 1342, name: "Selo de hollownest - Pico de Cristal"},
    {x: 2531, y: 1621, name: "Selo de hollownest - Pico de Cristal"},
    {x: 3459, y: 1644, name: "Selo de hollownest - Pico de Cristal"},

    //idolo do Rei
    {x: 1012, y: 583, name: "idolo do Rei - Penhascos Uivantes"},
    {x: 1873, y: 707, name: "idolo do Rei - Encruzilhada Esquecida"},
    {x: 2706, y: 554, name: "idolo do Rei - Pico de Cristal"},
    {x: 3546, y: 1340, name: "idolo do Rei - Borda do reino"},
    {x: 4160, y: 1374, name: "idolo do Rei - Borda do reino"},
    {x: 3707, y: 783, name: "idolo do Rei - Terra do Tescanso"},
    {x: 2988, y: 1848, name: "idolo do Rei - Hidrovia Real"},
    {x: 1257, y: 1854, name: "idolo do Rei - Ninho Profundo"},
    
    //Ovo Arcano 
    {x: 3387, y: 810, name: "Ovo Arcano - Terra do Descanço"},
    {x: 3566, y: 2753, name: "Ovo Arcano - Abismo"},
    {x: 2434, y: 2661, name: "Ovo Arcano - Abismo"},
    {x: 2639, y: 2747, name: "Ovo Arcano - Abismo"},

    // Diario do Viajante
    {x: 1156, y: 543, name: "Diario do Viajante - Penhascos Uivantes"},
    {x: 969, y: 786, name: "Diario do Viajante - Caminho Verde"},
    {x: 1495, y: 1063, name: "Diario do Viajante - Caminho Verde"},
    {x: 3006, y: 483, name: "Diario do Viajante - Pico de Cristal"},
    {x: 3737, y: 1003, name: "Diario do Viajante - Terra do descanço"},
    {x: 1870, y: 1367, name: "Diario do Viajante - Ermos Fundigos"},
    {x: 1889, y: 1584, name: "Diario do Viajante - Ermos Fundigos"},
    {x: 2316, y: 1288, name: "Diario do Viajante - Cidade das Lagrimas"},
    {x: 3218, y: 1554, name: "Diario do Viajante - Cidade das Lagrimas"},
    {x: 3429, y: 1592, name: "Diario do Viajante - Cidade das Lagrimas"},
    {x: 2971, y: 2035, name: "Diario do Viajante - Bacia Antiga"},
    {x: 4035, y: 1583, name: "Diario do Viajante - Borda do reino"},
    {x: 3675, y: 1652, name: "Diario do Viajante - Borda do reino"},
    {x: 3959, y: 1771, name: "Diario do Viajante - Borda do reino"},
];

const grubMarkers = [
    // Encruzilhada Esquecida
    {x: 1732, y: 933, name: "Larva - Encruzilhada Esquecida"},
    {x: 2123, y: 753, name: "Larva - Encruzilhada Esquecida"},
    {x: 2570, y: 704, name: "Larva- Encruzilhada Esquecida"},
    {x: 2458, y: 901, name: "Larva - Encruzilhada Esquecida"},
    {x: 2392, y: 838, name: "Larva - Encruzilhada Esquecida"},
    
    // Caminho Verde
    {x: 1026, y: 704, name: "Larva - Caminho Verde"},
    {x: 1619, y: 871, name: "Larva - Caminho Verde"},
    {x: 1563, y: 978, name: "Larva - Caminho Verde"},
    {x: 1082, y: 1068, name: "Larva - Caminho Verde"},
    
     // Penhascos Uivantes
    {x: 1315, y: 584, name: "Larva - Penhascos Uivantes"},
    
    // Ermos Fundicos
    {x: 1884, y: 1435, name: "Larva - Ermos Fundicos"},
    {x: 1482, y: 1519, name: "Larva - Ermos Fundicos"},
    
    // Canion da névua
    {x: 1560, y: 1199, name: "Larva - Canion da névua"},
    
    // gardins da Rainha
    {x: 856, y: 1020, name: "Larva - gardins da Rainha"},
    {x: 498, y: 1148, name: "Larva - gardins da Rainha"},
    {x: 832, y: 1403, name: "Larva - gardins da Rainha"},
    
    // Ninho Profundo
    {x: 313, y: 1848, name: "Larva - Ninho Profundo"},
    {x: 1612, y: 1628, name: "Larva - Ninho Profundo"},
    {x: 807, y: 1928, name: "Larva - Ninho Profundo"},
    {x: 1279, y: 1892, name: "Larva - Ninho Profundo"},
    {x: 1250, y: 2089, name: "Larva - Ninho Profundo"},
    
    // Bacia Antiga
    {x: 2203, y: 2163, name: "Larva - Bacia Antiga"},
    {x: 2525, y: 2150, name: "Larva - Bacia Antiga"},

    // Borda do Reino
    {x: 2379, y: 1943, name: "Larva - Borda do Reino"},
    {x: 7991, y: 1730, name: "Larva - Borda do Reino"},

    // Colmeia
    {x: 3901, y: 1910, name: "Larva - Colmeia"},
    {x: 3562, y: 1912, name: "Larva - Colmeia"},

    //Cidade das Lagrimas
    {x: 2513, y: 1297, name: "Larva - Cidade das Lagrimas"},
    {x: 2993, y: 1443, name: "Larva - Cidade das Lagrimas"},
    {x: 2747, y: 1479, name: "Larva - Cidade das Lagrimas"},
    {x: 3265, y: 1691, name: "Larva - Cidade das Lagrimas"},
    {x: 3570, y: 1724, name: "Larva - Cidade das Lagrimas"},
    {x: 3585, y: 1491, name: "Larva - Cidade das Lagrimas"},
    {x: 3602, y: 1491, name: "Larva - Cidade das Lagrimas"},
    {x: 3620, y: 1491, name: "Larva - Cidade das Lagrimas"},

    // Hidrovia real
    {x: 3386, y: 1786, name: "Larva - Hidrovia real"},
    {x: 3392, y: 1850, name: "Larva - Hidrovia real"},
    {x: 2551, y: 1823, name: "Larva - Hidrovia real"},

    // Terra do descanço
    {x: 3552, y: 982, name: "Larva - Terra do descanço"},

    // Pico de Cristal
    {x: 3308, y: 754, name: "Larva - Pico de Cristal"},
    {x: 3402, y: 434, name: "Larva - Pico de Cristal"},
    {x: 2290, y: 646, name: "Larva - Pico de Cristal"},
    {x: 2808, y: 697, name: "Larva - Pico de Cristal"},
    {x: 2878, y: 601, name: "Larva - Pico de Cristal"},
    {x: 3056, y: 600, name: "Larva - Pico de Cristal"},
    {x: 2929, y: 722, name: "Larva - Pico de Cristal"}
];

// Marcadores para Mapa 2 (Silksong)

const ss_redToolMarkers = [
    {x: 1590, y: 426, name: "Mosca Mecânica"},
    {x: 1846, y: 965, name: "Roda Mecânica"},
    {x: 405, y: 832, name: "Corta-concha"},
    {x: 1918, y: 1535, name: "Curvagarra"},
    {x: 2424, y: 1689, name: "Curvafoice"},
    {x: 1428, y: 1177, name: "Broca do Cavador"},
    {x: 1690, y: 1446, name: "Cerveja de Pulga"},
    {x: 2009, y: 1796, name: "Placa Ígnea"},
    {x: 1424, y: 1421, name: "Pinolongo"},
    {x: 1663, y: 1266, name: "Almofapino"},
    {x: 680, y: 480, name: "Frasco de Plásmio"},
    {x: 1595, y: 530, name: "Canhão de Rosários"},
    {x: 1930, y: 1790, name: "Tiro de Seda(Forge Daughter)"},
    {x: 840, y: 303, name: "Tiro de Seda(Original)"},
    {x: 1846, y: 965, name: "Tiro de Seda(Architeto)"},
    {x: 1933, y: 1790, name: "Fragmento de Ferrão"},
    {x: 1517, y: 1667, name: "Pino Reto"},
    {x: 2365, y: 1158, name: "Tachinhas"},
    {x: 2700, y: 1273, name: "Pino Tríplice"},
    {x: 3112, y: 667, name: "Anel de Arremesso"},
    {x: 2058, y: 417, name: "Orbevolts"},
    {x: 507, y: 1514, name: "Needle Phial"},
    {x: 505, y: 1514, name: "Frasco de Plásmio"},
    {x: 985, y: 1831, name: "Snare Setter"},


];

const ss_blueToolMarkers = [
    {x: 2012, y: 767, name: "Espelho de Garra e Espelhos de Garra"},
    {x: 1035, y: 1581, name: "Olho do Druida e Olhos do Druida"},
    {x: 2982, y: 609, name: "Ovo de Pulgalia"},
    {x: 1922, y: 1534, name: "Máscara Fraturada"},
    {x: 1824, y: 856, name: "Conjunto Injetor"},
    {x: 2462, y: 612, name: "Garralonga"},
    {x: 2333, y: 1782, name: "Sino de Magma"},
    {x: 450, y: 711, name: "Cristal da Memória"},
    {x: 1506, y: 1447, name: "Multivinculador"},
    {x: 850, y: 435, name: "Emblema de Pino"},
    {x: 1166, y: 1395, name: "Bolsa de Pólipo"},
    {x: 2599, y: 830, name: "Sela Rápida"},
    {x: 1702, y: 510, name: "Vínculo Reserva"},
    {x: 1850, y: 974, name: "Bainha Serrilhada"},
    {x: 880, y: 680, name: "Catassaque"},
    {x: 620, y: 1043, name: "Extensor de Carretel"},
    {x: 680, y: 804, name: "Filamento Voltaico"},
    {x: 940, y: 740, name: "Sino Protetor"},
    {x: 1933, y: 1791, name: "Teceleve"},
    {x: 1498, y: 1174, name: "Lanterna de Lumefogo"},
    {x: 2761, y: 568, name: "Guirlanda de Pureza"}
];

const ss_yellowToolMarkers = [
    {x: 1018, y: 1633, name: "Bússola"},
    {x: 869, y: 1741, name: "Broche de Magnetita"},
    {x: 1164, y: 1668, name: "Pingente de Fragmento"},
    {x: 2145, y: 582, name: "Empunhadura de Subida e Cordões de Aranha"},
    {x: 2409, y: 1290, name: "Bracelete Farpado"},    
    {x: 660, y: 1507, name: "Bolsa do Inseto Morto e Mochila de Carapaça"},
    {x: 500, y: 1113, name: "Dados de Magnetita"},
    {x: 1846, y: 965, name: "Braçaranha"},
    {x: 3043, y: 1829, name: "Tornozeleiras Sedavelozes"},
    {x: 620, y: 1039, name: "Marca do Ladrão"},
    {x: 2451, y: 1642, name: "Cinto Pesado"}
];

const ss_abilityMarkers = [
    {x: 1100, y: 780, name: "Fúria de Runas"},
    {x: 169, y: 1586, name: "Dardo Afiado"},
    {x: 914, y: 1563, name: "Lança de Seda"},
    {x: 2661, y: 1203, name: "Turbilhão de Fios"},
    {x: 1153, y: 1258, name: "Garra Aderente"},
    {x: 1878, y: 1675, name: "Passo Veloz"},
    {x: 1806, y: 1019, name: "Garra de Seda"},
    {x: 1530, y: 1377, name: "Agulino"},
    {x: 1960, y: 2268, name: "Impulso de Seda"},
    {x: 2215, y: 1053, name: "Ponto Cruz"},
    {x: 1777, y: 101, name: "Ferrões Pálidos"},

];

const ss_crestMarkers = [
    {x: 1075, y: 1896, name: "Caçador (Evolução)"},
    {x: 1688, y: 1377, name: "Ceifador"},
    {x: 1657, y: 1321, name: "Bruxa"},
    {x: 470, y: 1753, name: "Viajante"},
    {x: 608, y: 1779, name: "xaman"},
    {x: 2257, y: 1575, name: "Besta"},
    {x: 1804, y: 941, name: "Architeto"},
];

const ss_spoolFragmentMarkers = [
    {x: 943, y: 1659, name: "Fragmento de Carretel"},
    {x: 887, y: 1857, name: "Fragmento de Carretel"},
    {x: 1850, y: 1846, name: "Fragmento de Carretel"},
    {x: 2313, y: 1837, name: "Fragmento de Carretel"},
    {x: 1511, y: 1435, name: "Fragmento de Carretel"},
    {x: 1458, y: 1245, name: "Fragmento de Carretel"},
    {x: 896, y: 652, name: "Fragmento de Carretel"},
    {x: 1184, y: 927, name: "Fragmento de Carretel"},
    {x: 990, y: 1014, name: "Fragmento de Carretel"},
    {x: 625, y: 1040, name: "Fragmento de Carretel"},
    {x: 1978, y: 1073, name: "Fragmento de Carretel"},
    {x: 1680, y: 1057, name: "Fragmento de Carretel"},
    {x: 1669, y: 891, name: "Fragmento de Carretel"},
    {x: 1825, y: 853, name: "Fragmento de Carretel"},
    {x: 1526, y: 301, name: "Fragmento de Carretel"},
    {x: 1850, y: 503, name: "Fragmento de Carretel"},
    {x: 2147, y: 558, name: "Fragmento de Carretel"},
    {x: 1890, y: 727, name: "Fragmento de Carretel"}
];

const ss_shardBundleMarkers = [
    {x: 606, y: 1640, name: "Fragmento de Máscara"},
    {x: 915, y: 1728, name: "Fragmento de Máscara"},
    {x: 1187, y: 1824, name: "Fragmento de Máscara"},
    {x: 1676, y: 1728, name: "Fragmento de Máscara"},
    {x: 2498, y: 1778, name: "Fragmento de Máscara"},
    {x: 2815, y: 1805, name: "Fragmento de Máscara"},
    {x: 3011, y: 1589, name: "Fragmento de Máscara"},
    {x: 556, y: 1230, name: "Fragmento de Máscara"},
    {x: 1234, y: 1345, name: "Fragmento de Máscara"},
    {x: 1499, y: 1401, name: "Fragmento de Máscara"},
    {x: 1453, y: 1401, name: "Fragmento de Máscara"},
    {x: 1453, y: 1389, name: "Fragmento de Máscara"},
    {x: 2072, y: 1172, name: "Fragmento de Máscara"},
    {x: 2892, y: 835, name: "Fragmento de Máscara"},
    {x: 1632, y: 614, name: "Fragmento de Máscara"},
    {x: 2143, y: 569, name: "Fragmento de Máscara"},
    {x: 2217, y: 701, name: "Fragmento de Máscara"},
    {x: 1066, y: 507, name: "Fragmento de Máscara"},
    {x: 725, y: 511, name: "Fragmento de Máscara"},
    {x: 294, y: 664, name: "Fragmento de Máscara"}
];

const ss_lostFleaMarkers = [
    {x: 673, y: 1583, name: "Pulga Perdida"},
    {x: 1195, y: 1532, name: "Pulga Perdida"},
    {x: 1109, y: 1392, name: "Pulga Perdida"},
    {x: 1472, y: 1259, name: "Pulga Perdida"},
    {x: 1668, y: 1581, name: "Pulga Perdida"},
    {x: 1811, y: 1653, name: "Pulga Perdida"},
    {x: 1684, y: 1758, name: "Pulga Perdida"},
    {x: 2307, y: 1704, name: "Pulga Perdida"},
    {x: 2278, y: 1826, name: "Pulga Perdida"},
    {x: 2564, y: 1638, name: "Pulga Perdida"},
    {x: 1976, y: 1227, name: "Pulga Perdida"},
    {x: 2193, y: 1287, name: "Pulga Perdida"},
    {x: 2719, y: 1329, name: "Pulga Perdida"},
    {x: 2521, y: 1163, name: "Pulga Perdida"},
    {x: 1480, y: 1090, name: "Pulga Perdida"},
    {x: 1661, y: 1075, name: "Pulga Perdida"},
    {x: 2132, y: 1029, name: "Pulga Perdida"},
    {x: 2685, y: 1046, name: "Pulga Perdida"},
    {x: 2774, y: 712, name: "Pulga Perdida"},
    {x: 2110, y: 642, name: "Pulga Perdida"},
    {x: 2324, y: 548, name: "Pulga Perdida"},
    {x: 2622, y: 477, name: "Pulga Perdida"},
    {x: 669, y: 979, name: "Pulga Perdida"},
    {x: 726, y: 926, name: "Pulga Perdida"},
    {x: 987, y: 757, name: "Pulga Perdida"},
    {x: 947, y: 653, name: "Pulga Perdida"},
    {x: 562, y: 528, name: "Pulga Perdida"},
    {x: 1953, y: 373, name: "Pulga Perdida"},
    {x: 1564, y: 590, name: "Pulga Perdida"},
    {x: 1492, y: 654, name: "Pulga Perdida"},
];

const ss_shopMarkers = [
    {x: 640, y: 1541, name: "Loja (Shakra)"},
    {x: 916, y: 1723, name: "Loja (Shakra)"},
    {x: 905, y: 1740, name: "Loja"},
    {x: 999, y: 1634, name: "Loja (Shakra)"},
    {x: 1156, y: 1437, name: "Loja (Shakra)"},
    {x: 1563, y: 1428, name: "Loja (Shakra)"},
    {x: 1505, y: 1447, name: "Loja"},
    {x: 1938, y: 1535, name: "Loja"},
    {x: 1869, y: 1597, name: "Loja (Shakra)"},
    {x: 2161, y: 1616, name: "Loja (Shakra)"},
    {x: 1800, y: 1755, name: "Loja (Shakra)"},
    {x: 1933, y: 1791, name: "Loja"},
    {x: 2450, y: 1642, name: "Loja"},
    {x: 2399, y: 1766, name: "Loja (Shakra)"},
    {x: 2203, y: 1187, name: "Loja (Shakra)"},
    {x: 2484, y: 1372, name: "Loja (Shakra)"},
    {x: 883, y: 1232, name: "Loja (Shakra)"},
    {x: 621, y: 1042, name: "Loja"},
    {x: 628, y: 946, name: "Loja (Shakra)"},
    {x: 796, y: 761, name: "Loja (Shakra)"},
    {x: 1858, y: 964, name: "Loja (Shakra)"},
    {x: 2140, y: 583, name: "Loja (Shakra)"},
];

const ss_benchMarkers = [
    {x: 506, y: 1516, name: "Banco"},
    {x: 639, y: 1776, name: "Banco"},
    {x: 726, y: 1772, name: "Banco"},
    {x: 885, y: 1738, name: "Banco"},
    {x: 952, y: 1613, name: "Banco"},
    {x: 995, y: 1582, name: "Banco"},
    {x: 952, y: 1881, name: "Banco"},
    {x: 1171, y: 1612, name: "Banco"},
    {x: 1260, y: 1687, name: "Banco"},
    {x: 1140, y: 1738, name: "Banco"},
    {x: 1508, y: 1671, name: "Banco"},
    {x: 2030, y: 1560, name: "Banco"},
    {x: 1759, y: 1676, name: "Banco"},
    {x: 2005, y: 1756, name: "Banco"},
    {x: 1888, y: 1791, name: "Banco"},
    {x: 1739, y: 1911, name: "Banco"},
    {x: 1829, y: 1906, name: "Banco"},
    {x: 2052, y: 1957, name: "Banco"},
    {x: 1724, y: 2049, name: "Banco"},
    {x: 2032, y: 2120, name: "Banco"},
    {x: 1714, y: 2272, name: "Banco"},
    {x: 2082, y: 1678, name: "Banco"},
    {x: 2670, y: 1497, name: "Banco"},
    {x: 2999, y: 1604, name: "Banco"},
    {x: 2455, y: 1641, name: "Banco"},
    {x: 2426, y: 1735, name: "Banco"},
    {x: 2575, y: 1797, name: "Banco"},
    {x: 2957, y: 1823, name: "Banco"},
    {x: 3072, y: 1346, name: "Banco"},
    {x: 2478, y: 1369, name: "Banco"},
    {x: 2441, y: 1344, name: "Banco"},
    {x: 2058, y: 1351, name: "Banco"},
    {x: 1731, y: 1447, name: "Banco"},
    {x: 2208, y: 1188, name: "Banco"},
    {x: 1861, y: 1212, name: "Banco"},
    {x: 1525, y: 1445, name: "Banco"},
    {x: 1535, y: 1375, name: "Banco"},
    {x: 1300, y: 1336, name: "Banco"},
    {x: 942, y: 1329, name: "Banco"},
    {x: 844, y: 1435, name: "Banco"},
    {x: 709, y: 1289, name: "Banco"},
    {x: 429, y: 1165, name: "Banco"},
    {x: 737, y: 1095, name: "Banco"},
    {x: 983, y: 1020, name: "Banco"},
    {x: 1037, y: 923, name: "Banco"},
    {x: 404, y: 791, name: "Banco"},
    {x: 344, y: 677, name: "Banco"},
    {x: 802, y: 760, name: "Banco"},
    {x: 820, y: 520, name: "Banco"},
    {x: 846, y: 304, name: "Banco"},
    {x: 932, y: 518, name: "Banco"},
    {x: 972, y: 559, name: "Banco"},
    {x: 1077, y: 629, name: "Banco"},
    {x: 992, y: 761, name: "Banco"},
    {x: 1311, y: 1120, name: "Banco"},
    {x: 1548, y: 969, name: "Banco"},
    {x: 1818, y: 975, name: "Banco"},
    {x: 1422, y: 886, name: "Banco"},
    {x: 1445, y: 718, name: "Banco"},
    {x: 1693, y: 794, name: "Banco"},
    {x: 1649, y: 697, name: "Banco"},
    {x: 1371, y: 571, name: "Banco"},
    {x: 1689, y: 539, name: "Banco"},
    {x: 1747, y: 591, name: "Banco"},
    {x: 1933, y: 529, name: "Banco"},
    {x: 2096, y: 580, name: "Banco"},
    {x: 2131, y: 582, name: "Banco"},
    {x: 2221, y: 662, name: "Banco"},
    {x: 2301, y: 806, name: "Banco"},
    {x: 2218, y: 1049, name: "Banco"},
    {x: 2288, y: 1051, name: "Banco"},
    {x: 2619, y: 670, name: "Banco"},
    {x: 2820, y: 794, name: "Banco"},
    {x: 2462, y: 616, name: "Banco"},
    {x: 2633, y: 512, name: "Banco"},
    {x: 2948, y: 609, name: "Banco"},
    {x: 1883, y: 261, name: "Banco"},
];

const ss_bossMarkers = [
   const ss_bossMarkers = [
    {x: 318, y: 1781, name: "Sombra da Invocação"},
    {x: 348, y: 1647, name: "Zango Plasmificado"},
    {x: 671, y: 1883, name: "Musgo-mãe"},
    {x: 720, y: 1837, name: "Musgo-mãe"},
    {x: 1420, y: 1674, name: "Tiranocrânio"},
    {x: 879, y: 1741, name: "Tiranocrânio (parte 2)"},
    {x: 1072, y: 1614, name: "Besta dos Sinos"},
    {x: 1909, y: 1755, name: "Tessela"},
    {x: 1910, y: 1897, name: "Arqui-irmãos Signis e Gron"},
    {x: 2255, y: 1591, name: "Besta-alada Selvagem"},
    {x: 2464, y: 1812, name: "Quarto Vozerio"},
    {x: 2464, y: 1800, name: "Besta-alada Selvagem"},
    {x: 2750, y: 1530, name: "Skarrcantora Carmelita"},
    {x: 2856, y: 1683, name: "Gurr, o Proscrito"},
    {x: 3058, y: 1201, name: "Dançarinos do Trevo"},
    {x: 2977, y: 1208, name: "Cervo-pálido"},
    {x: 2620, y: 672, name: "Groal, o Magnífico"},
    {x: 2216, y: 1053, name: "Fanstama"},
    {x: 2013, y: 764, name: "Trobbio"},
    {x: 2003, y: 890, name: "Devoradora de Sinos"},
    {x: 1539, y: 920, name: "Sepulcro de Seda"},
    {x: 1718, y: 1439, name: "Asa do Pântano"},
    {x: 1529, y: 1375, name: "Viúva"},
    {x: 1500, y: 1179, name: "Pai da Chama"},
    {x: 1235, y: 1273, name: "Irmã Lasca"},
    {x: 1008, y: 1136, name: "Seth"},
    {x: 944, y: 1137, name: "Nyleth"},
    {x: 1024, y: 1019, name: "Última Juíza"},
    {x: 517, y: 1111, name: "Garmond Perdido"},
    {x: 636, y: 1179, name: "Grande Mosquicórnio"},
    {x: 382, y: 967, name: "Vigilante da Borda"},
    {x: 676, y: 794, name: "Voltvyrm"},
    {x: 484, y: 833, name: "Mosquicórnio Furioso"},
    {x: 404, y: 774, name: "Rei Coral Khann"},
    {x: 851, y: 433, name: "Alfinistra"},
    {x: 1102, y: 708, name: "Primeira Pecadora"},
    {x: 938, y: 551, name: "Progenitora"},
    {x: 1698, y: 509, name: "Segundo Sentinela"},
    {x: 1770, y: 567, name: "Dançarinos Mecânicos"},
    {x: 1770, y: 279, name: "Tessela Perdida"},
    {x: 1770, y: 96, name: "Grande Mãe Seda"},
];

const ss_bellWayMarkers = [
    {x: 868, y: 1756, name: "Via Campanaria"},
    {x: 1064, y: 1609, name: "Via Campanaria"},
    {x: 1736, y: 1777, name: "Via Campanaria"},
    {x: 1450, y: 1734, name: "Via Campanaria"},
    {x: 1544, y: 1449, name: "Via Campanaria"},
    {x: 1999, y: 1410, name: "Via Campanaria"},
    {x: 987, y: 1330, name: "Via Campanaria"},
    {x: 709, y: 1095, name: "Via Campanaria"},
    {x: 936, y: 760, name: "Via Campanaria"},
    {x: 1973, y: 803, name: "Via Campanaria"},
    {x: 2399, y: 1053, name: "Via Campanaria"},
    {x: 2610, y: 516, name: "Via Campanaria"},
];

const ss_memoryLocketMarkers = [
    {x: 474, y: 1670, name: "Medalhão Memorial"},
    {x: 931, y: 1718, name: "Medalhão Memorial"},
    {x: 1260, y: 1541, name: "Medalhão Memorial"},
    {x: 719, y: 1246, name: "Medalhão Memorial"},
    {x: 451, y: 1004, name: "Medalhão Memorial"},
    {x: 1061, y: 709, name: "Medalhão Memorial"},
    {x: 1823, y: 1986, name: "Medalhão Memorial"},
    {x: 2217, y: 1619, name: "Medalhão Memorial"},
    {x: 2467, y: 1628, name: "Medalhão Memorial"},
    {x: 2839, y: 1531, name: "Medalhão Memorial"},
    {x: 1505, y: 1446, name: "Medalhão Memorial"},
    {x: 1532, y: 1399, name: "Medalhão Memorial"},
    {x: 2003, y: 1407, name: "Medalhão Memorial"},
    {x: 1923, y: 1420, name: "Medalhão Memorial"},
    {x: 1522, y: 972, name: "Medalhão Memorial"},
    {x: 2015, y: 793, name: "Medalhão Memorial"},
    {x: 2243, y: 949, name: "Medalhão Memorial"},
    {x: 2795, y: 800, name: "Medalhão Memorial"},
    {x: 2302, y: 662, name: "Medalhão Memorial"},
    {x: 1930, y: 477, name: "Medalhão Memorial"},
];

function criarMarcadores(lista, layerId, classe) {
    const layer = document.getElementById(layerId);
    
    // Verificar se a lista existe e tem elementos
    if (!lista || lista.length === 0) {
        console.log(`⚠️ Lista vazia ou não definida para ${layerId}`);
        return;
    }
    
    // Verificar se a camada existe
    if (!layer) {
        console.warn(`❌ Layer ${layerId} não encontrada no HTML`);
        return;
    }
    
    console.log(`✅ Criando ${lista.length} marcadores para ${layerId}`);

    lista.forEach(item => {
        const marker = document.createElement("div");
        marker.className = `marker ${classe}`;
        marker.style.left = item.x + "px";
        marker.style.top = item.y + "px";
        marker.title = item.name;

        marker.addEventListener("click", e => {
            e.stopPropagation();
            alert(item.name);});

        layer.appendChild(marker);});
}

criarMarcadores(benchMarkers, "bench_Layer", "bench");
criarMarcadores(transportMarkers, "transport_Layer", "transport");
criarMarcadores(SpringstMarkers, "Springs_Layer", "Springs");
criarMarcadores(shopMarkers, "shop_Layer", "shop");
criarMarcadores(soulMarkers, "soul_Layer", "soul");
criarMarcadores(maskMarkers, "mask_Layer", "Mask");
criarMarcadores(BossMarkers, "Boss_Layer", "Boss");
criarMarcadores(paloreMarkers, "palore_Layer", "palore");
criarMarcadores(BlodlifeMarkers, "vital_Layer", "Blodlife");
criarMarcadores(Warriors_Grave_Marker, "Warriors_Grave_Layer", "Warriors_Grave");
criarMarcadores(charmMarkers, "charm_Layer", "charm");
criarMarcadores(abilityMarkers, "ability_Layer", "ability");
criarMarcadores(nailArtMarkers, "nail_art_Layer", "nail_art");
criarMarcadores(keyMarkers, "key_Layer", "key");
criarMarcadores(relicMarkers, "relic_Layer", "relic");
criarMarcadores(grubMarkers, "grub_Layer", "grub");

// Marcadores Mapa 2 (Silksong)
criarMarcadores(ss_redToolMarkers, "ss_red_tool_Layer", "ss_tool");
criarMarcadores(ss_blueToolMarkers, "ss_blue_tool_Layer", "ss_tool");
criarMarcadores(ss_yellowToolMarkers, "ss_yellow_tool_Layer", "ss_tool");
criarMarcadores(ss_abilityMarkers, "ss_ability_Layer", "ss_ability");
criarMarcadores(ss_crestMarkers, "ss_crest_Layer", "ss_crest");
criarMarcadores(ss_bellWayMarkers, "ss_bell_way_Layer", "ss_bell");
criarMarcadores(ss_memoryLocketMarkers, "ss_memory_locket_Layer", "ss_memory");
criarMarcadores(ss_lostFleaMarkers, "ss_lost_flea_Layer", "ss_flea");
criarMarcadores(ss_shopMarkers, "ss_shop_Layer", "ss_shop");
criarMarcadores(ss_bossMarkers, "ss_boss_Layer", "ss_boss");
criarMarcadores(ss_benchMarkers, "ss_bench_Layer", "bench");
criarMarcadores(ss_shardBundleMarkers, "ss_shard_bundle_Layer", "ss_shard");
criarMarcadores(ss_spoolFragmentMarkers, "ss_spool_fragment_Layer", "ss_spool");

/* ---------- TOGGLE ---------- */
function toggleLayer(id, element) {
    const layer = document.getElementById(id);
    
    // Verificar se a camada existe
    if (!layer) {
        console.error(`Layer não encontrada: ${id}`);
        return;
    }
    
    const isVisible = layer.style.display !== "none";
    
    // Toggle layer visibility
    layer.style.display = isVisible ? "none" : "block";
    
    // Toggle active class on button
    if (element) {
        if (isVisible) {
            element.classList.remove("active");
        } else {
            element.classList.add("active");
        }
    }
    

    console.log(`Layer ${id}: ${isVisible ? 'escondida' : 'visível'}`);
}

/* ---------- TOGGLE MENU ---------- */
let menuVisible = false; // Menu começa escondido

function toggleMenu() {
    const sidePanel = document.getElementById("sidePanel");
    
    menuVisible = !menuVisible;
    
    if (menuVisible) {
        sidePanel.classList.remove("hidden");
    } else {
        sidePanel.classList.add("hidden");
    }
}

/* ---------- MENU TOGGLE LISTENER ---------- */
document.getElementById("menuToggleBtn").addEventListener("click", toggleMenu);

//Troca entre mapas 
const btnChangeMap = document.getElementById("btnChangeMap");
const baseMap = document.getElementById("baseMap");
const map1Panel = document.getElementById("map1-panel");
const map2Panel = document.getElementById("map2-panel");
const mapTitle = document.getElementById("mapTitle");

let mapaAtual = 1;

btnChangeMap.addEventListener("click", () => {
    if (mapaAtual === 1) {
        // Mudar para Silksong
        baseMap.src = "img/Silksong_Map.png";
        mapaAtual = 2;
        mapTitle.textContent = "Silksong";
        
        // Trocar painéis
        map1Panel.style.display = "none";
        map2Panel.style.display = "block";
        
        // Esconder camadas do mapa 1
        document.querySelectorAll('.map1-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 1
        map1Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
        
    } else {
        // Voltar para Hollow Knight
        baseMap.src = "img/mapa.png";
        mapaAtual = 1;
        mapTitle.textContent = "Hollow Knight";
        
        // Trocar painéis
        map2Panel.style.display = "none";
        map1Panel.style.display = "block";
        
        // Esconder camadas do mapa 2
        document.querySelectorAll('.map2-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 2
        map2Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Esconder camadas do mapa 1
        document.querySelectorAll('.map1-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 1
        map1Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});
